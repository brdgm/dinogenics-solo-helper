import Card from '@/services/Card'
import BonusCardBenefit from '@/services/enum/BonusCardBenefit'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

/**
 * Get bonus benefit of card depending on difficulty level.
 * @param card Card
 * @param difficultyLevel Difficulty level
 * @returns Bonus card benefit
 */
export default function(card: Card, difficultyLevel: DifficultyLevel) : BonusCardBenefit|undefined {
  for (let levelNumber = difficultyLevel as number; levelNumber >= 1; levelNumber--) {
    const benefit = card.bonus.find(bonus => bonus.difficultyLevel == levelNumber)?.bonusCardBenefit
    if (benefit) {
      return benefit
    }
  }
  return undefined
}
