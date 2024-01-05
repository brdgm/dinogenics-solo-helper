import CardDeck from '@/services/CardDeck'
import Corporation from '@/services/enum/Corporation'
import Module from '@/services/enum/Module'
import { Round, State } from '@/store/state'
import { RouteLocation } from 'vue-router'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly workerCount : number
  readonly worker : number
  readonly playerOrder : Corporation[]
  readonly currentCorporation : Corporation
  readonly isPlayerTurn : boolean
  readonly modules : Module[]
  readonly hasControlledChaos : boolean
  readonly cardDeck? : CardDeck

  public constructor(route : RouteLocation, state : State) {    
    this.round = parseInt(route.params['round'] as string)
    if (route.name == 'RoundTurn') {
      this.turn = parseInt(route.params['turn'] as string)
    }
    else {
      this.turn = 0
    }
    this.workerCount = determineWorkerCount(this.round, state)
    const roundData = state.rounds.find(item => item.round == this.round)

    // determine player order
    this.playerOrder = determinePlayerOrder(this.round, roundData, state)

    // check if current player is a human player
    const { playerCorporations, playerCount, botCount } = state.setup.playerSetup
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
    if (!this.isPlayerTurn) {
      this.cardDeck = getBotRoundCardDeck(this.round, this.turn, this.currentCorporation, state)
    }
  }

  public get turnCount() : number {
    return this.playerOrder.length * this.workerCount
  }

  public get isBotTurn() : boolean {
    return !this.isPlayerTurn
  }

}

function determineWorkerCount(round : number, state : State) {
  // determine starting worker count based on player count
  let workerCount = 4
  const { playerCount, botCount } = state.setup.playerSetup
  if (playerCount + botCount > 3) {
    workerCount = 3
  }
  // one more worker per round after round 3
  if (round > 3) {
    workerCount++
  }
  return workerCount
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

function getBotRoundCardDeck(round : number, turn : number, corporation : Corporation, state : State) : CardDeck {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    // find stored turn this round
    const botRound = roundData.botRounds.find(item => item.corporation == corporation && item.turn == turn)
    if (botRound) {
      return CardDeck.fromPersistence(botRound.cardDeck)
    }
    // find previous turn in this round
    const previousTurnBotRound = roundData.botRounds
      .toSorted((item1, item2) => item1.turn - item2.turn)
      .findLast(item => item.corporation == corporation && item.turn < turn)
    if (previousTurnBotRound) {
      return CardDeck.fromPersistence(previousTurnBotRound.cardDeck)
    }
  }
  // find last turn from previous round
  if (round > 1) {
    return getBotRoundCardDeck(round - 1, 99, corporation, state)
  }
  // create new card deck
  return CardDeck.new()
}
