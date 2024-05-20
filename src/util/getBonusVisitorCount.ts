/**
 * Get number of bonus visitors available in the given season.
 * @param round Round/Season
 * @returns Number of bonus visitors
 */
export default function(round : number) : number {
  if (round < 2 || round > 7) {
    throw new Error(`Invalid season: ${round}`)
  }
  const roundOffset = 7 - round
  return AVAILABLE_BONUS_VISITORS[roundOffset]
}

const AVAILABLE_BONUS_VISITORS = [5,4,4,3,3,2]
