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

export interface Bonus {
  difficultyLevel: DifficultyLevel
  bonusCardBenefit: BonusCardBenefit
}
