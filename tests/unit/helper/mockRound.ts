import { Round, Turn } from '@/store/state'
import Corporation from '@/services/enum/Corporation'

export default function (params?: MockRoundParams) : Round {
  return {
    round: params?.round ?? 1,
    playerOrder: params?.playerOrder ?? [],
    turns: params?.turns ?? []
  }
}

export interface MockRoundParams {
  round? : number
  playerOrder? : Corporation[]
  turns? : Turn[]
}
