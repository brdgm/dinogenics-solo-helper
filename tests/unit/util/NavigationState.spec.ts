import NavigationState from '@/util/NavigationState'
import { expect } from 'chai'
import Module from '@/services/enum/Module'
import Corporation from '@/services/enum/Corporation'
import { State } from '@/store/state'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockBotTurn from '../helper/mockBotTurn'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('util/NavigationState', () => {
  it('turnCount-workerCount-round1-3player', () => {
    const navigationState = new NavigationState(
      mockRouteLocation({params:{'round':'1'}}),
      mockState({playerCount:1,botCount:2,modules:[Module.CONTROLLED_CHAOS]})
    )
    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(0)
    expect(navigationState.workerCount).to.eq(4)
    expect(navigationState.turnCount).to.eq(12)
    expect(navigationState.modules).to.eql([Module.CONTROLLED_CHAOS])
    expect(navigationState.hasControlledChaos).to.true
    expect(navigationState.difficultyLevel).to.eq(DifficultyLevel.L3_NORMAL)
  })

  it('turnCount-workerCount-round4-3player', () => {
    const navigationState = new NavigationState(
      mockRouteLocation({params:{'round':'4'}}),
      mockState({playerCount:1,botCount:2})
    )
    expect(navigationState.round).to.eq(4)
    expect(navigationState.turn).to.eq(0)
    expect(navigationState.workerCount).to.eq(5)
    expect(navigationState.turnCount).to.eq(15)
    expect(navigationState.modules).to.eql([])
    expect(navigationState.hasControlledChaos).to.false
  })

  it('turnCount-workerCount-round2-5player', () => {
    const navigationState = new NavigationState(
      mockRouteLocation({params:{'round':'2'}}),
      mockState({playerCount:2,botCount:3})
    )
    expect(navigationState.round).to.eq(2)
    expect(navigationState.turn).to.eq(0)
    expect(navigationState.workerCount).to.eq(3)
    expect(navigationState.turnCount).to.eq(15)
  })

  it('turnCount-workerCount-round7-5player', () => {
    const navigationState = new NavigationState(
      mockRouteLocation({params:{'round':'7'}}),
      mockState({playerCount:2,botCount:3})
    )
    expect(navigationState.round).to.eq(7)
    expect(navigationState.turn).to.eq(0)
    expect(navigationState.workerCount).to.eq(4)
    expect(navigationState.turnCount).to.eq(20)
  })

  it('round-turn-worker-corporation-playerturn-botturn-3player', () => {
    const state = mockState({
      playerCount: 1,
      botCount: 2,
      playerCorporations: [Corporation.BIOTHESAURI,Corporation.DINO_LIBRE,Corporation.NTEK]
    })
    assertRoundTurn(state, 1, 1, {worker: 1, corp: Corporation.BIOTHESAURI, player: true})
    assertRoundTurn(state, 1, 2, {worker: 1, corp: Corporation.DINO_LIBRE, player: false})
    assertRoundTurn(state, 1, 3, {worker: 1, corp: Corporation.NTEK, player: false})
    assertRoundTurn(state, 1, 4, {worker: 2, corp: Corporation.BIOTHESAURI, player: true})
    assertRoundTurn(state, 1, 5, {worker: 2, corp: Corporation.DINO_LIBRE, player: false})
    assertRoundTurn(state, 1, 6, {worker: 2, corp: Corporation.NTEK, player: false})
    assertRoundTurn(state, 1, 7, {worker: 3, corp: Corporation.BIOTHESAURI, player: true})
    assertRoundTurn(state, 1, 8, {worker: 3, corp: Corporation.DINO_LIBRE, player: false})
    assertRoundTurn(state, 1, 9, {worker: 3, corp: Corporation.NTEK, player: false})
    assertRoundTurn(state, 1, 10, {worker: 4, corp: Corporation.BIOTHESAURI, player: true})
    assertRoundTurn(state, 1, 11, {worker: 4, corp: Corporation.DINO_LIBRE, player: false})
    assertRoundTurn(state, 1, 12, {worker: 4, corp: Corporation.NTEK, player: false})
  })

  it('round-turn-worker-corporation-playerturn-botturn-4player', () => {
    const state = mockState({
      playerCount: 2,
      botCount: 2,
      playerCorporations: [Corporation.BIOTHESAURI,Corporation.DINO_LIBRE,Corporation.NTEK,Corporation.BLUESEA_GENETICS_PLC]
    })
    assertRoundTurn(state, 1, 1, {worker: 1, corp: Corporation.BIOTHESAURI, player: true})
    assertRoundTurn(state, 1, 2, {worker: 1, corp: Corporation.DINO_LIBRE, player: true})
    assertRoundTurn(state, 1, 3, {worker: 1, corp: Corporation.NTEK, player: false})
    assertRoundTurn(state, 1, 4, {worker: 1, corp: Corporation.BLUESEA_GENETICS_PLC, player: false})
    assertRoundTurn(state, 1, 5, {worker: 2, corp: Corporation.BIOTHESAURI, player: true})
    assertRoundTurn(state, 1, 6, {worker: 2, corp: Corporation.DINO_LIBRE, player: true})
    assertRoundTurn(state, 1, 7, {worker: 2, corp: Corporation.NTEK, player: false})
    assertRoundTurn(state, 1, 8, {worker: 2, corp: Corporation.BLUESEA_GENETICS_PLC, player: false})
  })

  it('bot-round1-turn2-nopersistence', () => {
    const navigationState = new NavigationState(
      mockRouteLocation({name:'RoundTurn',params:{'round':'1','turn':'2'}}),
      mockState({
        playerCount: 1,
        botCount: 2,
        playerCorporations :[Corporation.BIOTHESAURI,Corporation.DINO_LIBRE,Corporation.NTEK],
        initialBotTurns: [
          mockBotTurn({corporation:Corporation.DINO_LIBRE,cardDeckPile:[1,2]}),
          mockBotTurn({corporation:Corporation.NTEK,cardDeckPile:[11,12]})
        ]
      })
    )
    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(2)
    expect(navigationState.currentCorporation).to.eq(Corporation.DINO_LIBRE)
    expect(navigationState.bots.length).to.eq(2)
    expect(navigationState.currentBot).to.not.undefined
    expect(navigationState.currentBot?.cardDeck.toPersistence()).to.eql({pile:[1,2],discard:[]})
  })

  it('bot-round1-turn3', () => {
    const navigationState = new NavigationState(
      mockRouteLocation({name:'RoundTurn',params:{'round':'1','turn':'3'}}),
      mockState({
        playerCount: 1,
        botCount: 2,
        playerCorporations: [Corporation.BIOTHESAURI,Corporation.DINO_LIBRE,Corporation.NTEK],
        rounds: [
          mockRound({
            round: 1,
            playerOrder: [Corporation.BIOTHESAURI,Corporation.DINO_LIBRE,Corporation.NTEK],
            turns: [
              mockTurn({round:1,turn:1,botTurns:[
                mockBotTurn({corporation:Corporation.DINO_LIBRE,cardDeckPile:[1,2,3]}),
                mockBotTurn({corporation:Corporation.NTEK,cardDeckPile:[11,12,13]})
              ]}),
              mockTurn({round:1,turn:2,botTurns:[
                mockBotTurn({corporation:Corporation.DINO_LIBRE,cardDeckPile:[2,3],cardDecDiscard:[1]}),
                mockBotTurn({corporation:Corporation.NTEK,cardDeckPile:[12,13],cardDecDiscard:[11]})
              ]}),
              mockTurn({round:1,turn:3,botTurns:[
                mockBotTurn({corporation:Corporation.DINO_LIBRE,cardDeckPile:[3],cardDecDiscard:[1,2]}),
                mockBotTurn({corporation:Corporation.NTEK,cardDeckPile:[13],cardDecDiscard:[11,12]})
              ]})
            ]
          })
        ]
      })
    )
    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(3)
    expect(navigationState.currentCorporation).to.eq(Corporation.NTEK)
    expect(navigationState.currentBot).to.not.undefined
    expect(navigationState.currentBot?.cardDeck.toPersistence()).to.eql({pile:[12,13],discard:[11]})
  })

  it('bot-round2-turn2-previousround-lastturn', () => {
    const navigationState = new NavigationState(
      mockRouteLocation({name:'RoundTurn',params:{'round':'2','turn':'2'}}),
      mockState({
        playerCount: 1,
        botCount: 2,
        playerCorporations: [Corporation.BIOTHESAURI,Corporation.DINO_LIBRE,Corporation.NTEK],
        rounds: [
          mockRound({
            round: 1,
            playerOrder: [Corporation.BIOTHESAURI,Corporation.DINO_LIBRE,Corporation.NTEK],
            turns: [
              mockTurn({round:1,turn:1,botTurns:[
                mockBotTurn({corporation:Corporation.DINO_LIBRE,cardDeckPile:[1,2,3]}),
                mockBotTurn({corporation:Corporation.NTEK,cardDeckPile:[11,12,13]})
              ]}),
              mockTurn({round:1,turn:2,botTurns:[
                mockBotTurn({corporation:Corporation.DINO_LIBRE,cardDeckPile:[2,3],cardDecDiscard:[1]}),
                mockBotTurn({corporation:Corporation.NTEK,cardDeckPile:[12,13],cardDecDiscard:[11]})
              ]}),
              mockTurn({round:1,turn:3,botTurns:[
                mockBotTurn({corporation:Corporation.DINO_LIBRE,cardDeckPile:[3],cardDecDiscard:[1,2]}),
                mockBotTurn({corporation:Corporation.NTEK,cardDeckPile:[13],cardDecDiscard:[11,12]})
              ]})
            ]
          })
        ]
      })
    )
    expect(navigationState.round).to.eq(2)
    expect(navigationState.turn).to.eq(2)
    expect(navigationState.currentCorporation).to.eq(Corporation.DINO_LIBRE)
    expect(navigationState.currentBot).to.not.undefined
    expect(navigationState.currentBot?.cardDeck.toPersistence()).to.eql({pile:[3],discard:[1,2]})
  })

})

function assertRoundTurn(state : State, round : number, turn : number,
    expected: {worker : number, corp : Corporation, player : boolean}) {
  const navigationState = new NavigationState(mockRouteLocation({name:'RoundTurn',params:{'round':round.toString(),'turn':turn.toString()}}),state)
  const turnInfo = `(round ${round}, turn ${turn})`
  expect(navigationState.round).to.eq(round, `round ${turnInfo}`)
  expect(navigationState.turn).to.eq(turn, `turn ${turnInfo}`)
  expect(navigationState.worker).to.eq(expected.worker, `worker ${turnInfo}`)
  expect(navigationState.currentCorporation).to.eq(expected.corp, `currentCorporation ${turnInfo}`)
  expect(navigationState.isPlayerTurn).to.eq(expected.player, `isPlayerTurn ${turnInfo}`)
  expect(navigationState.isBotTurn).to.eq(!expected.player, `isBotTurn ${turnInfo}`)
}
