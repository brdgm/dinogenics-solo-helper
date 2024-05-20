import getBonusVisitorCount from '@/util/getBonusVisitorCount'
import { expect } from 'chai'

describe('util/getBonusVisitorCount', () => {
  it('bonusVisitors', () => {
    expect(getBonusVisitorCount(2)).to.eq(2)
    expect(getBonusVisitorCount(3)).to.eq(3)
    expect(getBonusVisitorCount(4)).to.eq(3)
    expect(getBonusVisitorCount(5)).to.eq(4)
    expect(getBonusVisitorCount(6)).to.eq(4)
    expect(getBonusVisitorCount(7)).to.eq(5)
  })
})
