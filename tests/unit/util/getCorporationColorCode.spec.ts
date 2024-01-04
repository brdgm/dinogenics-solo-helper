import Corporation from '@/services/enum/Corporation'
import getCorporationColorCode from '@/util/getCorporationColorCode'
import { expect } from 'chai'

describe('util/getCorporationColorCode', () => {
  it('colorCode', () => {
    expect(getCorporationColorCode(Corporation.BIOTHESAURI)).to.eq('#12100b')
    expect(getCorporationColorCode(Corporation.BLUESEA_GENETICS_PLC)).to.eq('#28bbe2')
    expect(getCorporationColorCode(Corporation.DINO_LIBRE)).to.eq('#ed6c1a')
    expect(getCorporationColorCode(Corporation.NTEK)).to.eq('#e1dddc')
    expect(getCorporationColorCode(Corporation.TRAPEZOHEDRON_INCORPORATED)).to.eq('#ffeb00')
  })
})
