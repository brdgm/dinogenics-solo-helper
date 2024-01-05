import { BotRound, Round } from '@/store/state'
import Corporation from '@/services/enum/Corporation'

export default function (params?: MockRoundParams) : Round {
  return {
    round: params?.round ?? 1,
    playerOrder: params?.playerOrder ?? [],
    botRounds: params?.botRounds ?? []
  }
}

export interface MockRoundParams {
  round? : number
  playerOrder? : Corporation[]
  botRounds? : BotRound[]
}
