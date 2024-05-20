/**
 * Get number of bonus visitors available in the given season.
 * @param season Season
 * @returns Number of bonus visitors
 */
export default function(season : number) : number {
  if (season < 2 || season > 7) {
    throw new Error(`Invalid season: ${season}`)
  }
  const seasonOffset = 7 - season
  return AVAILABLE_BONUS_VISITORS[seasonOffset]
}

const AVAILABLE_BONUS_VISITORS = [5,4,4,3,3,2]
