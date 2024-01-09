import CardDeck from './CardDeck'
import Module from './enum/Module'
import Location from './enum/Location'
import isLocationAvailable from '@/util/isLocationAvailable'

/**
 * Resolves the given location in order of the card deck cards.
 * Starting with the current card, but drawing additional cards if necessary.
 */
export default class BotLocationResolver {

  private readonly MAX_RECURSION_DEPTH = Object.values(Location).length

  private _cardDeck : CardDeck
  private _modules : Module[]
  private _visitedLocations = new Set<Location>()
  private _recursionDepth = 0

  public constructor(cardDeck : CardDeck, modules : Module[]) {
    this._cardDeck = cardDeck
    this._modules = modules
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
      return validLocations[index]
    }
    else {
      // mark all current card locations as visited
      validLocations.forEach(item => this._visitedLocations.add(item))
      // draw next card(s) to find location
      index -= validLocations.length
      this._cardDeck.draw()
      return this.getLocation(index)
    }
  }

  private getCurrentValidLocations(): Location[] {
    return (this._cardDeck.currentCard?.locations ?? [])
        .filter(item => isLocationAvailable(item, this._modules))
        .filter(item => !this._visitedLocations.has(item))
  }

}
