import BonusCardBenefit from './enum/BonusCardBenefit'
import DifficultyLevel from './enum/DifficultyLevel'
import Dinosaur from './enum/Dinosaur'
import Location from './enum/Location'
import RuleChange from './enum/RuleChange'

export default interface Card {
  id: number
  locations: Location[]
  slot: number
  dinosaurs: Dinosaur[]
  ruleChange: RuleChange
  bonus: Bonus[]
}

/**
 * Bonus for card depending on difficulty level. The assigned difficulty level applies also to higher
 * difficulty level, unless another mappings defines something different.
 */
export interface Bonus {
  difficultyLevel: DifficultyLevel
  bonusCardBenefit: BonusCardBenefit
}
