import { BotTurn } from '@/store/state'
import CardDeck from './CardDeck'
import Corporation from './enum/Corporation'
import Module from './enum/Module'
import Location from './enum/Location'
import BotLocationResolver from './BotLocationResolver'
import BonusCardBenefit from './enum/BonusCardBenefit'
import DifficultyLevel from './enum/DifficultyLevel'
import getBonusCardBenefit from '@/util/getBonusCardBenefit'

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

  public getLocation(index : number, modules : Module[],
      difficultyLevel : DifficultyLevel) : BotLocation|undefined {
    return this.getBotLocation(index, modules, difficultyLevel, false)
  }

  public getOutsourceLocation(index : number, modules : Module[],
      difficultyLevel : DifficultyLevel) : BotLocation|undefined {
    // draw new card for looking for outsource locations
    this._cardDeck.draw()
    return this.getBotLocation(index, modules, difficultyLevel, true)
  }

  private getBotLocation(index : number, modules : Module[],
      difficultyLevel : DifficultyLevel, outsource : boolean) : BotLocation|undefined {
    const resolver = new BotLocationResolver(this._cardDeck, modules, outsource)
    const location = resolver.getLocation(index)
    // determine bonus card benefit from skipping cards when looking for location
    if (location) {
      let bonusCardBenefit : BonusCardBenefit|undefined
      if (resolver.gainBonus && resolver.currentBonusCard) {
        bonusCardBenefit = getBonusCardBenefit(resolver.currentBonusCard, difficultyLevel)
        if (bonusCardBenefit == BonusCardBenefit.NONE) {
          bonusCardBenefit = undefined
        }
      }
      return { location, bonusCardBenefit }
    }
    return undefined  
  }

  public toPersistence() : BotTurn {
    return {
      corporation: this._corporation,
      cardDeck: this._cardDeck.toPersistence()
    }
  }

}

export interface BotLocation {
  location: Location
  bonusCardBenefit?: BonusCardBenefit
}
