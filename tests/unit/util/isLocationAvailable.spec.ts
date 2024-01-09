import Location from '@/services/enum/Location'
import Module from '@/services/enum/Module'
import isLocationAvailable from '@/util/isLocationAvailable'
import { expect } from 'chai'

describe('util/isLocationAvailable', () => {
  it('BONEYARD', () => {
    expect(isLocationAvailable(Location.BONEYARD, [])).to.true
    expect(isLocationAvailable(Location.BONEYARD, [Module.CONTROLLED_CHAOS])).to.true
  })

  it('SITE_D', () => {
    expect(isLocationAvailable(Location.SITE_D, [])).to.false
    expect(isLocationAvailable(Location.SITE_D, [Module.CONTROLLED_CHAOS])).to.true
  })
})
