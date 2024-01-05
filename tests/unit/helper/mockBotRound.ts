import { BotRound } from '@/store/state'
import Corporation from '@/services/enum/Corporation'

export default function (params?: MockBotRoundParams) : BotRound {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    corporation: params?.corporation ?? Corporation.NTEK,
    cardDeck: {
      pile: params?.cardDeckPile ?? [],
      discard: params?.cardDecDiscard ?? []
    }
  }
}

export interface MockBotRoundParams {
  round? : number
  turn? : number
  corporation? : Corporation
  cardDeckPile?: number[]
  cardDecDiscard?: number[]
}
