import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Module from '@/services/enum/Module'
import Corporation from '@/services/enum/Corporation'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          playerCorporations: [Corporation.NTEK,Corporation.BLUESEA_GENETICS_PLC,Corporation.TRAPEZOHEDRON_INCORPORATED,Corporation.DINO_LIBRE,Corporation.BIOTHESAURI]
        },
        difficultyLevel: DifficultyLevel.L3_NORMAL,
        modules: [Module.CONTROLLED_CHAOS]
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.setup.initialBotTurns = undefined
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeTurn(turn : Turn) {
      const round = this.rounds.find(item => item.round == turn.round)
      if (round) {
        round.turns = round.turns.filter(item => item.turn < turn.turn)
        round.turns.push(turn)
      }
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  playerSetup: PlayerSetup
  difficultyLevel: DifficultyLevel
  modules: Module[]
  initialBotTurns?: BotTurn[]
  debugMode?: boolean
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerCorporations: Corporation[]
}

export interface Round {
  round: number
  playerOrder: Corporation[]
  turns: Turn[]
}
export interface Turn {
  round: number
  turn: number
  botTurns: BotTurn[]
}
export interface BotTurn {
  corporation: Corporation
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
