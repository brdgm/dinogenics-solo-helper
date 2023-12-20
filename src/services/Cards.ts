import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'

const cards : Card[] = [
  {
    id: 1,
    action: Action.ACTION_1
  }
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  }

}
