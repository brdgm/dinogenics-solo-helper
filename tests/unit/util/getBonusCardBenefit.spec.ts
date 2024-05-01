import Cards from '@/services/Cards'
import BonusCardBenefit from '@/services/enum/BonusCardBenefit'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import getBonusCardBenefit from '@/util/getBonusCardBenefit'
import { expect } from 'chai'

describe('util/getBonusCardBenefit.spec', () => {
  it('card-1', () => {
    const card = Cards.get(1)
    expect(getBonusCardBenefit(card, DifficultyLevel.L1_VERY_EASY)).to.undefined
    expect(getBonusCardBenefit(card, DifficultyLevel.L2_EASY)).to.undefined
    expect(getBonusCardBenefit(card, DifficultyLevel.L3_NORMAL)).to.eq(BonusCardBenefit.GAIN_GOAT)
    expect(getBonusCardBenefit(card, DifficultyLevel.L4_HARD)).to.eq(BonusCardBenefit.GAIN_GOAT)
    expect(getBonusCardBenefit(card, DifficultyLevel.L5_VERY_HARD)).to.eq(BonusCardBenefit.DISCARD_SCANDAL)
  })

  it('card-2', () => {
    const card = Cards.get(2)
    expect(getBonusCardBenefit(card, DifficultyLevel.L1_VERY_EASY)).to.undefined
    expect(getBonusCardBenefit(card, DifficultyLevel.L2_EASY)).to.eq(BonusCardBenefit.GAIN_GOAT)
    expect(getBonusCardBenefit(card, DifficultyLevel.L3_NORMAL)).to.eq(BonusCardBenefit.GAIN_CREDITS)
    expect(getBonusCardBenefit(card, DifficultyLevel.L4_HARD)).to.eq(BonusCardBenefit.GAIN_CREDITS)
    expect(getBonusCardBenefit(card, DifficultyLevel.L5_VERY_HARD)).to.eq(BonusCardBenefit.GAIN_CREDITS)
  })
})
