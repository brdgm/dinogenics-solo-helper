/**
 * Get number of workers available for each player in the given season.
 * @param round Round/Season
 * @param playerCount Total number of players
 * @returns Number of workers
 */
export default function (round : number, playerCount : number) : number {
  // determine starting worker count based on player count
  let workerCount = 4
  if (playerCount > 3) {
    workerCount = 3
  }
  // one more worker per round after round 3
  if (round > 3) {
    workerCount++
  }
  return workerCount
}
