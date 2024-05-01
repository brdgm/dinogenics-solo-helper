import BotLocationResolver from '@/services/BotLocationResolver'
import CardDeck from '@/services/CardDeck'
import Location from '@/services/enum/Location'
import Module from '@/services/enum/Module'
import { expect } from 'chai'

describe('services/BotLocationResolver', () => {
  it('firstLocation', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[2,3,4,5], discard:[1]}),
      []
    )
    expect(resolver.getLocation(0)).to.eq(Location.FARM)
    expect(resolver.currentBonusCard).to.undefined
  })

  it('secondLocation_skip1', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[3,4,5], discard:[2]}),
      []
    )
    // expect to skip SITE_D because controlled chaos is not enabled
    expect(resolver.getLocation(1)).to.eq(Location.UPLINK)
    expect(resolver.currentBonusCard).to.undefined
  })

  it('secondLocation_controlledChaos', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[3,4,5], discard:[2]}),
      [Module.CONTROLLED_CHAOS]
    )
    expect(resolver.getLocation(1)).to.eq(Location.SITE_D)
    expect(resolver.currentBonusCard).to.undefined
  })

  it('secondCard_firstLocation', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[10,2,3,4,5], discard:[1]}),
      [Module.CONTROLLED_CHAOS]
    )
    // cards >= 10 are skipped to gain bonus, so this ist 1st valid location of card 2
    expect(resolver.getLocation(4)).to.eq(Location.SITE_D)
    expect(resolver.currentBonusCard?.id).to.eq(10)
    expect(resolver.gainBonus).to.true
  })

  it('fourthCard_secondLocation', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[10,2,11,3,12,4,13,5], discard:[1]}),
      [Module.CONTROLLED_CHAOS]
    )
    // cards >= 10 are skipped to gain bonus, so this ist 2nd valid location of card 4
    expect(resolver.getLocation(8)).to.eq(Location.TIME_SHARE)
    expect(resolver.currentBonusCard?.id).to.eq(12)
    expect(resolver.gainBonus).to.false
  })

  it('noLocationFound', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[2,3,4,5], discard:[1]}),
      [Module.CONTROLLED_CHAOS]
    )
    expect(resolver.getLocation(99)).to.undefined
  })

  it('outsourceFiltering', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[5,6], discard:[4]}),
      [Module.CONTROLLED_CHAOS],
      true
    )
    // cards >= 10 are skipped to gain bonus, so this ist 1st valid location of card 3
    // OUTSOURCE is skipped when outsource mode is active
    expect(resolver.getLocation(3)).to.eq(Location.DINOGENICS_IOM)
    expect(resolver.currentBonusCard).to.undefined
    expect(resolver.gainBonus).to.false
  })
})
