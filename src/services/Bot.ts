import { BotTurn } from '@/store/state'
import CardDeck from './CardDeck'
import Corporation from './enum/Corporation'

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

  public toPersistence() : BotTurn {
    return {
      corporation: this._corporation,
      cardDeck: this._cardDeck.toPersistence()
    }
  }

}
