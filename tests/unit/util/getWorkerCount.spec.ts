import getWorkerCount from '@/util/getWorkerCount'
import { expect } from 'chai'

describe('util/getWorkerCount', () => {
  it('season2', () => {
    expect(getWorkerCount(2, 2)).to.eq(4)
    expect(getWorkerCount(2, 3)).to.eq(4)
    expect(getWorkerCount(2, 4)).to.eq(3)
    expect(getWorkerCount(2, 5)).to.eq(3)
  })

  it('season4', () => {
    expect(getWorkerCount(4, 2)).to.eq(5)
    expect(getWorkerCount(4, 3)).to.eq(5)
    expect(getWorkerCount(4, 4)).to.eq(4)
    expect(getWorkerCount(4, 5)).to.eq(4)
  })
})
