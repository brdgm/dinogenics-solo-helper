import { BotTurn, Turn } from '@/store/state'

export default function (params?: MockTurnParams) : Turn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    botTurns: params?.botTurns ?? []
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  botTurns? : BotTurn[]
}
