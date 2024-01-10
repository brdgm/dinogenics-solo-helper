import Bot from '@/services/Bot'
import Corporation from '@/services/enum/Corporation'
import Location from '@/services/enum/Location'
import { expect } from 'chai'

describe('services/Bot', () => {
  it('new', () => {
    const bot = new Bot({
      corporation: Corporation.NTEK,
      cardDeck: {pile:[2,3], discard:[1]}
    })

    expect(bot.corporation).to.eq(Corporation.NTEK)
    expect(bot.cardDeck.currentCard?.id).to.eq
    expect(bot.cardDeck.pile.length).to.eq(2)
    expect(bot.cardDeck.discard.length).to.eq(1)
    expect(bot.getLocation(1, [])).to.eq(Location.SITE_A)
    // this draws a new card and returns 1st location from it
    expect(bot.getOutsourceLocation(0, [])).to.eq(Location.FARM)

    expect(bot.toPersistence()).to.eql({
      corporation: Corporation.NTEK,
      cardDeck: {pile:[3], discard:[1,2]}
    })
  })
})
