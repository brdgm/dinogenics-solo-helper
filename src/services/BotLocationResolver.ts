import CardDeck from './CardDeck'
import Module from './enum/Module'
import Location from './enum/Location'
import isLocationAvailable from '@/util/isLocationAvailable'
import Card from './Card'

/**
 * Resolves the given location in order of the card deck cards.
 * Starting with the current card, but drawing additional cards if necessary.
 */
export default class BotLocationResolver {

  private readonly MAX_RECURSION_DEPTH = Object.values(Location).length

  private _cardDeck : CardDeck
  private _modules : Module[]
  private _outsource : boolean
  private _visitedLocations = new Set<Location>()
  private _recursionDepth = 0
  private _currentCardIndex : number = 0
  private _bonusCards : Card[] = []

  public constructor(cardDeck : CardDeck, modules : Module[], outsource? : boolean) {
    this._cardDeck = cardDeck
    this._modules = modules
    this._outsource = outsource ?? false
  }

  public getLocation(index : number) : Location|undefined {
    this._recursionDepth++
    if (this._recursionDepth > this.MAX_RECURSION_DEPTH) {
      return undefined
    }
    const validLocations = this.getCurrentValidLocations()
    if (index < validLocations.length) {
      // mark previous locations as visited
      validLocations.slice(0, index).forEach(item => this._visitedLocations.add(item))
      // get location from current card
      this._currentCardIndex = index
      return validLocations[index]
    }
    else {
      // mark all current card locations as visited
      validLocations.forEach(item => this._visitedLocations.add(item))
      // draw a card to collect bonus from because all 4 locations of previous card could not be used
      if (!this._outsource) {
        const bonusCard = this._cardDeck.draw()
        this._bonusCards.unshift(bonusCard)
      }
      // draw next card(s) to find location
      const nextIndex = index - validLocations.length
      this._cardDeck.draw()
      return this.getLocation(nextIndex)
    }
  }

  /**
   * Get current / last drawn card to gain bonus from (when all 4 locations of previous card could not be used).
   */
  public get currentBonusCard() : Card|undefined {
    return this._bonusCards[0]
  }

  /**
   * Returns true if a new card was drawn and a bonus card just before and the bonus should be gained.
   */
  public get gainBonus() : boolean {
    return this.currentBonusCard != undefined && this._currentCardIndex == 0
  }

  private getCurrentValidLocations(): Location[] {
    return (this._cardDeck.currentCard?.locations ?? [])
        .filter(item => isLocationAvailable(item, this._modules))
        .filter(item => !this._visitedLocations.has(item))
        .filter(item => item != Location.OUTSOURCE || !this._outsource)
  }

}
