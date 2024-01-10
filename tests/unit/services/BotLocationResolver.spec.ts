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
  })

  it('secondLocation_skip1', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[3,4,5], discard:[2]}),
      []
    )
    // expect to skip SITE_D because controlled chaos is not enabled
    expect(resolver.getLocation(1)).to.eq(Location.UPLINK)
  })

  it('secondLocation_controlledChaos', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[3,4,5], discard:[2]}),
      [Module.CONTROLLED_CHAOS]
    )
    expect(resolver.getLocation(1)).to.eq(Location.SITE_D)
  })

  it('secondCard_firstLocation', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[2,3,4,5], discard:[1]}),
      [Module.CONTROLLED_CHAOS]
    )
    expect(resolver.getLocation(4)).to.eq(Location.SITE_D)
  })

  it('fourthCard_secondLocation', () => {
    const resolver = new BotLocationResolver(
      CardDeck.fromPersistence({pile:[2,3,4,5], discard:[1]}),
      [Module.CONTROLLED_CHAOS]
    )
    expect(resolver.getLocation(7)).to.eq(Location.INTELLIGEN_DESIGNS_HQ)
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
    // OUTSOURCE is skipped when outsource mode is active
    expect(resolver.getLocation(3)).to.eq(Location.DINOGENICS_IOM)
  })
})
