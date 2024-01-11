import { BotTurn } from '@/store/state'
import CardDeck from './CardDeck'
import Corporation from './enum/Corporation'
import Module from './enum/Module'
import Location from './enum/Location'
import BotLocationResolver from './BotLocationResolver'

export default class Bot {

  private _corporation : Corporation
  private _cardDeck : CardDeck

  public constructor(botTurn : BotTurn) {
    this._corporation = botTurn.corporation
    this._cardDeck = CardDeck.fromPersistence(botTurn.cardDeck)
  }

  public get corporation() : Corporation {
    return this._corporation
  }

  public get cardDeck() : CardDeck {
    return this._cardDeck
  }

  public getLocation(index : number, modules : Module[]) : Location|undefined {
    const resolver = new BotLocationResolver(this._cardDeck, modules)
    return resolver.getLocation(index)
  }

  public getOutsourceLocation(index : number, modules : Module[]) : Location|undefined {
    // draw new card for looking for outsource locations
    this._cardDeck.draw()
    const resolver = new BotLocationResolver(this._cardDeck, modules, true)
    return resolver.getLocation(index)
  }

  public toPersistence() : BotTurn {
    return {
      corporation: this._corporation,
      cardDeck: this._cardDeck.toPersistence()
    }
  }

}
