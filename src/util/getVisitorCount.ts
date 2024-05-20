/**
 * Get number of visitors available for each player in the given season.
 * @param season Season
 * @param playerIndex Player index
 * @param playerCount Number of players
 * @returns Number of visitors
 */
export default function(season : number, playerIndex : number, playerCount : number) : number {
  if (season < 2 || season > 7) {
    throw new Error(`Invalid season: ${season}`)
  }
  if (playerIndex < 0 || playerIndex > playerCount - 1) {
    throw new Error(`Invalid player index: ${playerIndex}`)
  }
  if (playerCount > 3) {
    return getVisitorCount45Players(season, playerIndex)
  }
  else {
    return getVisitorCount23Players(season, playerIndex)
  }
}

const AVAILABLE_VISITORS = [5,4,4,3,3,3,2,2,1,1]

function getVisitorCount23Players(season : number, playerIndex : number) : number {
  const seasonOffset = 8 - season
  return AVAILABLE_VISITORS[seasonOffset + playerIndex]
}

function getVisitorCount45Players(season : number, playerIndex : number) : number {
  const seasonOffset = 7 - season
  return AVAILABLE_VISITORS[seasonOffset + playerIndex]
}
