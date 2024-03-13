import Corporation from '@/services/enum/Corporation'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Module from '@/services/enum/Module'
import { BotTurn, Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      playerSetup: {
        playerCount: params?.playerCount ?? 1,
        botCount: params?.botCount ?? 1,
        playerCorporations: params?.playerCorporations ?? [Corporation.NTEK,Corporation.BLUESEA_GENETICS_PLC,Corporation.TRAPEZOHEDRON_INCORPORATED,Corporation.DINO_LIBRE,Corporation.BIOTHESAURI]
      },
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.L3_NORMAL,
      modules: params?.modules ?? [],
      initialBotTurns: params?.initialBotTurns ?? []
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  playerCount?: number
  botCount?: number
  playerCorporations?: Corporation[]
  difficultyLevel?: DifficultyLevel
  modules?: Module[]
  rounds?: Round[]
  initialBotTurns? : BotTurn[]
}
