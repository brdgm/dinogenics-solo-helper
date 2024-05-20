/**
 * Get number of visitors available for each player in the given season.
 * @param round Round/Season
 * @param playerIndex Player index
 * @param playerCount Number of players
 * @returns Number of visitors
 */
export default function(round : number, playerIndex : number, playerCount : number) : number {
  if (round < 2 || round > 7) {
    throw new Error(`Invalid season: ${round}`)
  }
  if (playerIndex < 0 || playerIndex > playerCount - 1) {
    throw new Error(`Invalid player index: ${playerIndex}`)
  }
  if (playerCount > 3) {
    return getVisitorCount45Players(round, playerIndex)
  }
  else {
    return getVisitorCount23Players(round, playerIndex)
  }
}

const AVAILABLE_VISITORS = [5,4,4,3,3,3,2,2,1,1]

function getVisitorCount23Players(round : number, playerIndex : number) : number {
  const seasonOffset = 8 - round
  return AVAILABLE_VISITORS[seasonOffset + playerIndex]
}

function getVisitorCount45Players(round : number, playerIndex : number) : number {
  const seasonOffset = 7 - round
  return AVAILABLE_VISITORS[seasonOffset + playerIndex]
}
