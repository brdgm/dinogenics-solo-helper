import Corporation from '@/services/enum/Corporation'
import { BotTurn } from '@/store/state'

export default function (params?: MockBotTurnParams) : BotTurn {
  return {
    corporation: params?.corporation ?? Corporation.NTEK,
    cardDeck: {
      pile: params?.cardDeckPile ?? [],
      discard: params?.cardDecDiscard ?? []
    }
  }
}

export interface MockBotTurnParams {
  corporation? : Corporation
  cardDeckPile?: number[]
  cardDecDiscard?: number[]
}
