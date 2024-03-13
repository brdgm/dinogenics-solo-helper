import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Location from './enum/Location'
import RuleChange from './enum/RuleChange'
import Dinosaur from './enum/Dinosaur'
import DifficultyLevel from './enum/DifficultyLevel'
import BonusCardBenefit from './enum/BonusCardBenefit'

const cards : Card[] = [
  {
    id: 1,
    locations: [Location.FARM,Location.SITE_A,Location.AGENCY,Location.UPLINK],
    slot: 1,
    dinosaurs: [Dinosaur.GALLIMIMUS,Dinosaur.QUETZALCOATLUS,Dinosaur.MOSASAUR],
    ruleChange: RuleChange.NONE,
    bonus: [
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL }
    ]
  },
  {
    id: 2,
    locations: [Location.FARM,Location.SITE_D,Location.UPLINK,Location.FERRY],
    slot: 2,
    dinosaurs: [Dinosaur.TRICERATOPS,Dinosaur.GALLIMIMUS,Dinosaur.TYRANNOSAURUS],
    ruleChange: RuleChange.ONLY_LAND_DINOSAURS,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS }
    ]
  },
  {
    id: 3,
    locations: [Location.FARM,Location.REFINEMENT,Location.FERRY,Location.AGENCY],
    slot: 3,
    dinosaurs: [Dinosaur.THERIZINOSAURUS,Dinosaur.TRICERATOPS,Dinosaur.PTERODACTYL],
    ruleChange: RuleChange.NO_LARGE_FACILITIES,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN }
    ]
  },
  {
    id: 4,
    locations: [Location.SITE_A,Location.INTELLIGEN_DESIGNS_HQ,Location.TIME_SHARE,Location.OUTSOURCE],
    slot: 4,
    dinosaurs: [Dinosaur.ANKYLOSAURUS,Dinosaur.THERIZINOSAURUS,Dinosaur.MEGALODON],
    ruleChange: RuleChange.NO_ACTION_REPEAT,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_DNA_CARD },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT }
    ]
  },
  {
    id: 5,
    locations: [Location.DINOGENICS_IOM,Location.SITE_A,Location.AGENCY,Location.FERRY],
    slot: 5,
    dinosaurs: [Dinosaur.ICHTHYOSAUR,Dinosaur.ANKYLOSAURUS,Dinosaur.COMPSOGNATHUS],
    ruleChange: RuleChange.NO_UPLINK_ACTION,
    bonus: [
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_DNA_CARD },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL }
    ]
  },
  {
    id: 6,
    locations: [Location.BONEYARD,Location.CITY_CENTER,Location.UPLINK,Location.AGENCY],
    slot: 5,
    dinosaurs: [Dinosaur.PLESIOSAURUS,Dinosaur.ICHTHYOSAUR,Dinosaur.CARNOTAURUS],
    ruleChange: RuleChange.NO_FERRY_ACTION,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL }
    ]
  },
  {
    id: 7,
    locations: [Location.CITY_CENTER,Location.REFINEMENT,Location.FERRY,Location.UPLINK],
    slot: 6,
    dinosaurs: [Dinosaur.STEGOSAURUS,Dinosaur.PLESIOSAURUS,Dinosaur.DUNKLEOSTEUS],
    ruleChange: RuleChange.SPECIALISTS_INACTIVE,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN }
    ]
  },
  {
    id: 8,
    locations: [Location.FARM,Location.INTELLIGEN_DESIGNS_HQ,Location.AGENCY,Location.TIME_SHARE],
    slot: 2,
    dinosaurs: [Dinosaur.RAPTOR,Dinosaur.STEGOSAURUS,Dinosaur.PARASAUROLOPHUS],
    ruleChange: RuleChange.NO_BONEYARD_ACTION,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT }
    ]
  },
  {
    id: 9,
    locations: [Location.SPECIAL_ACTION,Location.CITY_CENTER,Location.TIME_SHARE,Location.UPLINK],
    slot: 2,
    dinosaurs: [Dinosaur.BRONTOSAURUS,Dinosaur.RAPTOR,Dinosaur.DIMETRODON],
    ruleChange: RuleChange.NO_MARKET_DNA_BUY,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT }
    ]
  },
  {
    id: 10,
    locations: [Location.CITY_CENTER,Location.AGENCY,Location.OUTSOURCE,Location.BONEYARD],
    slot: 4,
    dinosaurs: [Dinosaur.SPINOSAURUS,Dinosaur.BRONTOSAURUS,Dinosaur.PACHYCEPHALOSAURUS],
    ruleChange: RuleChange.NO_FARM_ACTION,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.DISCARD_SCANDAL }
    ]
  },
  {
    id: 11,
    locations: [Location.SPECIAL_ACTION,Location.SITE_D,Location.FARM,Location.REFINEMENT],
    slot: 1,
    dinosaurs: [Dinosaur.MOSASAUR,Dinosaur.SPINOSAURUS,Dinosaur.DILOPHOSAURUS],
    ruleChange: RuleChange.NO_WATER_DINOSAURS,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_EDNA_CARD },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN }
    ]
  },
  {
    id: 12,
    locations: [Location.DINOGENICS_IOM,Location.SITE_B,Location.UPLINK,Location.OUTSOURCE],
    slot: 5,
    dinosaurs: [Dinosaur.TYRANNOSAURUS,Dinosaur.MOSASAUR,Dinosaur.SPINOSAURUS],
    ruleChange: RuleChange.NO_REFINED_POLYMORPHIC_DNA,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_DNA_CARD },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_VP },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_VP },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_VP }
    ]
  },
  {
    id: 13,
    locations: [Location.DINOGENICS_IOM,Location.BONEYARD,Location.FERRY,Location.UPLINK],
    slot: 5,
    dinosaurs: [Dinosaur.PTERODACTYL,Dinosaur.TYRANNOSAURUS,Dinosaur.BRONTOSAURUS],
    ruleChange: RuleChange.NO_BASIC_HOTELS,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_VP },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS }
    ]
  },
  {
    id: 14,
    locations: [Location.SITE_D,Location.FARM,Location.TIME_SHARE,Location.AGENCY],
    slot: 6,
    dinosaurs: [Dinosaur.MEGALODON,Dinosaur.PTERODACTYL,Dinosaur.RAPTOR],
    ruleChange: RuleChange.NO_DINOSAURS_IN_OTHER_PLAYER_PARKS,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_EDNA_CARD },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_EDNA_CARD },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT }
    ]
  },
  {
    id: 15,
    locations: [Location.DINOGENICS_IOM,Location.CITY_CENTER,Location.FERRY,Location.BONEYARD],
    slot: 2,
    dinosaurs: [Dinosaur.COMPSOGNATHUS,Dinosaur.MEGALODON,Dinosaur.STEGOSAURUS],
    ruleChange: RuleChange.LAND_DINOSAURS_HABITAT_ONE_SIZE_LARGER,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS }
    ]
  },
  {
    id: 16,
    locations: [Location.DINOGENICS_IOM,Location.TIME_SHARE,Location.OUTSOURCE,Location.REFINEMENT],
    slot: 3,
    dinosaurs: [Dinosaur.CARNOTAURUS,Dinosaur.COMPSOGNATHUS,Dinosaur.PLESIOSAURUS],
    ruleChange: RuleChange.NO_VISITORS_VP,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_VP },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_VP },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS }
    ]
  },
  {
    id: 17,
    locations: [Location.DINOGENICS_IOM,Location.SITE_B,Location.CITY_CENTER,Location.OUTSOURCE],
    slot: 3,
    dinosaurs: [Dinosaur.DUNKLEOSTEUS,Dinosaur.CARNOTAURUS,Dinosaur.ICHTHYOSAUR],
    ruleChange: RuleChange.TURN_ORDER_LAST,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_DNA_CARD },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_DNA_CARD },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_FENCE }
    ]
  },
  {
    id: 18,
    locations: [Location.SITE_D,Location.INTELLIGEN_DESIGNS_HQ,Location.UPLINK,Location.TIME_SHARE],
    slot: 4,
    dinosaurs: [Dinosaur.DUNKLEOSTEUS,Dinosaur.PERUCETUS,Dinosaur.ANKYLOSAURUS],
    ruleChange: RuleChange.DINOSAURS_PAIRED_BEFORE_NEW_SPECIES,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_EDNA_CARD },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_EDNA_CARD },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_MUTANT }
    ]
  },
  {
    id: 19,
    locations: [Location.SITE_B,Location.FARM,Location.FERRY,Location.TIME_SHARE],
    slot: 5,
    dinosaurs: [Dinosaur.SPINOSAURUS,Dinosaur.BAJADASAURUS,Dinosaur.THERIZINOSAURUS],
    ruleChange: RuleChange.NO_SMALL_FACILITIES,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_DNA_CARD },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_DNA_CARD },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_GOAT }
    ]
  },
  {
    id: 20,
    locations: [Location.INTELLIGEN_DESIGNS_HQ,Location.OUTSOURCE,Location.TIME_SHARE,Location.FERRY],
    slot: 6,
    dinosaurs: [Dinosaur.MUTANT,Dinosaur.DREADNOUGHTUS,Dinosaur.TRICERATOPS],
    ruleChange: RuleChange.NO_VISITORS_MONEY,
    bonus: [
      {difficultyLevel: DifficultyLevel.L2_EASY, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_CREDITS },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_VP },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_VP }
    ]
  },
  {
    id: 21,
    locations: [Location.REFINEMENT,Location.BONEYARD,Location.SITE_A,Location.SITE_D],
    slot: 6,
    dinosaurs: [Dinosaur.GALLIMIMUS,Dinosaur.MUTANT,Dinosaur.DILOPHOSAURUS],
    ruleChange: RuleChange.DINOSAUR_DNA_ONE_MORE,
    bonus: [
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_EDNA_CARD },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_REFINED_DNA_TOKEN }
    ]
  },
  {
    id: 22,
    locations: [Location.SPECIAL_ACTION,Location.UPLINK,Location.SITE_D,Location.CITY_CENTER],
    slot: 6,
    dinosaurs: [Dinosaur.DREADNOUGHTUS,Dinosaur.PACHYCEPHALOSAURUS,Dinosaur.MUTANT],
    ruleChange: RuleChange.NONE,
    bonus: [
      {difficultyLevel: DifficultyLevel.L3_NORMAL, bonusCardBenefit: BonusCardBenefit.GAIN_EDNA_CARD },
      {difficultyLevel: DifficultyLevel.L4_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_VP },
      {difficultyLevel: DifficultyLevel.L5_VERY_HARD, bonusCardBenefit: BonusCardBenefit.GAIN_VP }
    ]
  }
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  }

}
