import Dinosaur from '@/services/enum/Dinosaur'
import Module from '@/services/enum/Module'
import isDinosaurAvailable from '@/util/isDinosaurAvailable'
import { expect } from 'chai'

describe('util/isDinosaurAvailable', () => {
  it('BRONTOSAURUS', () => {
    expect(isDinosaurAvailable(Dinosaur.BRONTOSAURUS, [])).to.true
    expect(isDinosaurAvailable(Dinosaur.BRONTOSAURUS, [Module.CONTROLLED_CHAOS])).to.true
    expect(isDinosaurAvailable(Dinosaur.BRONTOSAURUS, [Module.CONTROLLED_CHAOS_DINOSAUR_ELITES])).to.true
    expect(isDinosaurAvailable(Dinosaur.BRONTOSAURUS, [Module.NEW_ARRIVALS_MINI_EXPANSION])).to.true
  })

  it('GALLIMIMUS', () => {
    expect(isDinosaurAvailable(Dinosaur.GALLIMIMUS, [])).to.false
    expect(isDinosaurAvailable(Dinosaur.GALLIMIMUS, [Module.CONTROLLED_CHAOS])).to.true
    expect(isDinosaurAvailable(Dinosaur.GALLIMIMUS, [Module.CONTROLLED_CHAOS_DINOSAUR_ELITES])).to.false
    expect(isDinosaurAvailable(Dinosaur.GALLIMIMUS, [Module.NEW_ARRIVALS_MINI_EXPANSION])).to.false
  })

  it('DREADNOUGHTUS', () => {
    expect(isDinosaurAvailable(Dinosaur.DREADNOUGHTUS, [])).to.false
    expect(isDinosaurAvailable(Dinosaur.DREADNOUGHTUS, [Module.CONTROLLED_CHAOS])).to.false
    expect(isDinosaurAvailable(Dinosaur.DREADNOUGHTUS, [Module.CONTROLLED_CHAOS_DINOSAUR_ELITES])).to.true
    expect(isDinosaurAvailable(Dinosaur.DREADNOUGHTUS, [Module.NEW_ARRIVALS_MINI_EXPANSION])).to.false
  })

  it('QUETZALCOATLUS', () => {
    expect(isDinosaurAvailable(Dinosaur.QUETZALCOATLUS, [])).to.false
    expect(isDinosaurAvailable(Dinosaur.QUETZALCOATLUS, [Module.CONTROLLED_CHAOS])).to.false
    expect(isDinosaurAvailable(Dinosaur.QUETZALCOATLUS, [Module.CONTROLLED_CHAOS_DINOSAUR_ELITES])).to.false
    expect(isDinosaurAvailable(Dinosaur.QUETZALCOATLUS, [Module.NEW_ARRIVALS_MINI_EXPANSION])).to.true
  })
})
