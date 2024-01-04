import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
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
          playerCorporations: [Corporation.BIOTHESAURI,Corporation.BLUESEA_GENETICS_PLC,Corporation.DINO_LIBRE,Corporation.NTEK,Corporation.TRAPEZOHEDRON_INCORPORATED]
        },
        difficultyLevel: DifficultyLevel.NORMAL,
        expansions: []
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round != round.round)
      this.rounds.push(round)
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
  expansions: Expansion[]
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerCorporations: Corporation[]
}

export interface Round {
  round: number
}
