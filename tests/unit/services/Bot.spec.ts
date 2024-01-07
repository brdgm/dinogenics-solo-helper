import Bot from '@/services/Bot'
import Corporation from '@/services/enum/Corporation'
import { BotTurn } from '@/store/state'
import { expect } from 'chai'

describe('services/Bot', () => {
  it('new', () => {
    const botPersistence : BotTurn = {
      corporation: Corporation.NTEK,
      cardDeck: {pile:[1,2,3], discard:[]}
    }
    const bot = new Bot(botPersistence)

    expect(bot.corporation).to.eq(Corporation.NTEK)
    expect(bot.cardDeck.pile.length).to.eq(3)
    expect(bot.cardDeck.discard.length).to.eq(0)
    expect(bot.toPersistence()).to.eql(botPersistence)
  })
})
