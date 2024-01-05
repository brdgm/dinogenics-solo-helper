import Corporation from '@/services/enum/Corporation'
import { BotRound, Round, State } from '@/store/state'
import { RouteLocation } from 'vue-router'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly playerOrder : Corporation[]
  readonly currentCorporation : Corporation
  readonly isPlayerTurn : boolean
  readonly botRound? : BotRound

  public constructor(route : RouteLocation, state : State) {    
    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)
    const roundData = state.rounds.find(item => item.round == this.round)

    // determine player order
    this.playerOrder = determinePlayerOrder(this.round, roundData, state)

    // check if current player is a human player
    this.currentCorporation = this.playerOrder[this.turn]
    const { playerCorporations, playerCount } = state.setup.playerSetup
    this.isPlayerTurn = playerCorporations.indexOf(this.currentCorporation) < playerCount

    // get bot round data
    this.botRound = roundData?.botRound.find(item => item.corporation == this.currentCorporation)
  }

  public get turnCount() : number {
    return this.playerOrder.length
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
