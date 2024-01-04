import Dinosaur from '@/services/enum/Dinosaur'
import Module from '@/services/enum/Module'
import isDinosaurAvailable from '@/util/isDinosaurAvailable'
import { expect } from 'chai'

describe('util/isDinosaurAvailable.spec', () => {
  it('BRONTOSAURUS', () => {
    expect(isDinosaurAvailable(Dinosaur.BRONTOSAURUS, [])).to.true
    expect(isDinosaurAvailable(Dinosaur.BRONTOSAURUS, [Module.CONTROLLED_CHAOS])).to.true
    expect(isDinosaurAvailable(Dinosaur.BRONTOSAURUS, [Module.CONTROLLED_CHAOS_DINOSAUR_ELITES])).to.true
  })

  it('GALLIMIMUS', () => {
    expect(isDinosaurAvailable(Dinosaur.GALLIMIMUS, [])).to.false
    expect(isDinosaurAvailable(Dinosaur.GALLIMIMUS, [Module.CONTROLLED_CHAOS])).to.true
    expect(isDinosaurAvailable(Dinosaur.GALLIMIMUS, [Module.CONTROLLED_CHAOS_DINOSAUR_ELITES])).to.false
  })

  it('DREADNOUGHTUS', () => {
    expect(isDinosaurAvailable(Dinosaur.DREADNOUGHTUS, [])).to.false
    expect(isDinosaurAvailable(Dinosaur.DREADNOUGHTUS, [Module.CONTROLLED_CHAOS])).to.false
    expect(isDinosaurAvailable(Dinosaur.DREADNOUGHTUS, [Module.CONTROLLED_CHAOS_DINOSAUR_ELITES])).to.true
  })
})
