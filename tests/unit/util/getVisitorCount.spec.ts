import getVisitorCount from '@/util/getVisitorCount'
import { expect } from 'chai'

describe('util/getVisitorCount', () => {
  it('season2-2player', () => {
    expect(getVisitorCount(2, 0, 2)).to.eq(2)
    expect(getVisitorCount(2, 1, 2)).to.eq(2)
  })

  it('season3-3player', () => {
    expect(getVisitorCount(3, 0, 3)).to.eq(3)
    expect(getVisitorCount(3, 1, 3)).to.eq(2)
    expect(getVisitorCount(3, 2, 3)).to.eq(2)
  })

  it('season4-4player', () => {
    expect(getVisitorCount(4, 0, 4)).to.eq(3)
    expect(getVisitorCount(4, 1, 4)).to.eq(3)
    expect(getVisitorCount(4, 2, 4)).to.eq(3)
    expect(getVisitorCount(4, 3, 4)).to.eq(2)
  })

  it('season5-5player', () => {
    expect(getVisitorCount(5, 0, 5)).to.eq(4)
    expect(getVisitorCount(5, 1, 5)).to.eq(3)
    expect(getVisitorCount(5, 2, 5)).to.eq(3)
    expect(getVisitorCount(5, 3, 5)).to.eq(3)
    expect(getVisitorCount(5, 4, 5)).to.eq(2)
  })

  it('season6-2player', () => {
    expect(getVisitorCount(6, 0, 2)).to.eq(4)
    expect(getVisitorCount(6, 1, 2)).to.eq(3)
  })

  it('season7-4player', () => {
    expect(getVisitorCount(7, 0, 4)).to.eq(5)
    expect(getVisitorCount(7, 1, 4)).to.eq(4)
    expect(getVisitorCount(7, 2, 4)).to.eq(4)
    expect(getVisitorCount(7, 3, 4)).to.eq(3)
  })
})
