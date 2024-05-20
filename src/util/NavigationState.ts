import Bot from '@/services/Bot'
import Corporation from '@/services/enum/Corporation'
import Module from '@/services/enum/Module'
import { BotTurn, Round, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import getWorkerCount from './getWorkerCount'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly location : number
  readonly outsource : number
  readonly workerCount : number
  readonly worker : number
  readonly difficultyLevel : DifficultyLevel
  readonly playerOrder : Corporation[]
  readonly currentCorporation : Corporation
  readonly isPlayerTurn : boolean
  readonly modules : Module[]
  readonly hasControlledChaos : boolean
  readonly bots : Bot[]
  readonly currentBot? : Bot

  public constructor(route : RouteLocation, state : State) {
    const { playerCorporations, playerCount, botCount } = state.setup.playerSetup

    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.location = getIntRouteParam(route, 'location')
    this.outsource = getIntRouteParam(route, 'outsource')
    this.workerCount = getWorkerCount(this.round, playerCount + botCount)
    this.difficultyLevel = state.setup.difficultyLevel
    const roundData = state.rounds.find(item => item.round == this.round)

    // determine player order
    this.playerOrder = determinePlayerOrder(this.round, roundData, state)

    // check if current player is a human player
    const playerTotalCount = playerCount + botCount
    const playerIndex = (this.turn - 1) % playerTotalCount
    this.currentCorporation = this.playerOrder[playerIndex]
    this.isPlayerTurn = playerCorporations.indexOf(this.currentCorporation) < playerCount

    // check current worker number
    this.worker = ((this.turn - playerIndex - 1) / playerTotalCount) + 1

    // module setup
    this.modules = state.setup.modules
    this.hasControlledChaos = this.modules.includes(Module.CONTROLLED_CHAOS)

    // card deck for bot round
    this.bots = getBotTurnsFromPreviousTurn(this.round, this.turn, state)
      .map(botTurn => new Bot(botTurn))
    this.currentBot = this.bots.find(item => item.corporation == this.currentCorporation)
  }

  public get turnCount() : number {
    return this.playerOrder.length * this.workerCount
  }

  public get isBotTurn() : boolean {
    return !this.isPlayerTurn
  }

}

function determinePlayerOrder(round : number, roundData : Round|undefined, state : State) : Corporation[] {
  // check from current round
  if (roundData) {
    return roundData.playerOrder
  }
  // check from previous round
  if (round > 1) {
    const previousRoundData = state.rounds.find(item => item.round == round - 1)
    if (previousRoundData) {
      return previousRoundData.playerOrder
    }
  }
  // get from player setup
  const { playerCorporations, playerCount, botCount } = state.setup.playerSetup
  return playerCorporations.slice(0, playerCount + botCount)
}

function getBotTurnsFromPreviousTurn(round : number, turn : number, state : State) : BotTurn[] {
  const currentRound = state.rounds.find(item => item.round == round)
  if (currentRound) {
    // find previous turn in this round
    const previousTurn = currentRound.turns
      .toSorted((item1, item2) => item1.turn - item2.turn)
      .findLast(item => item.turn < turn || turn == 0)
    if (previousTurn) {
      return previousTurn.botTurns
    }
  }
  // find last turn in previous round
  if (round > 1) {
    return getBotTurnsFromPreviousTurn(round - 1, 0, state)
  }
  // no previous turn found - use initial bot decks
  return state.setup.initialBotTurns ?? []
}
