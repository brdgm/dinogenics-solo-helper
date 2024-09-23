<template>
  <div class="mb-3">
    <ol>
      <template v-if="action1OpenOceanRoll">
        <li v-html="t('location.intelligen-designs-hq.action1.openOceanRoll.title')"></li>
        <ul>
          <li v-html="t('location.intelligen-designs-hq.action1.openOceanRoll.aquaticHabitat')"></li>
          <li v-html="t('location.intelligen-designs-hq.action1.openOceanRoll.rollDice')"></li>
          <li v-html="t('location.intelligen-designs-hq.action1.openOceanRoll.creditsVP')"></li>
        </ul>
      </template>
      <li v-if="action1HireSpecialistNumber" v-html="t('location.intelligen-designs-hq.action1.hireSpecialist', {number:action1HireSpecialistNumber})"></li>
      <li v-if="action1RemoveTrainingToken && hasNewArrivalsExpansion" v-html="t('location.intelligen-designs-hq.action1.removeTrainingToken', {number:action1RemoveTrainingToken})"></li>
      <li v-if="action1BonusCardBenefit">
        <span v-html="t('location.intelligen-designs-hq.gainBonus')"></span><span>&nbsp;</span>
        <span class="fw-bold" v-html="t(`bonusCardBenefit.${action1BonusCardBenefit}`, {difficultyLevel})"></span>
        <span>.</span>
      </li>
      <li v-if="!action1OpenOceanRoll">
        <span v-html="t('location.intelligen-designs-hq.action2.aquaticHabitat')"></span><br/>
        <span v-html="t('location.intelligen-designs-hq.action2.otherwise')" class="fst-italic"></span><br/>
        <div class="mt-2" v-if="!action2Determined">
          <button class="btn btn-primary btn-sm" @click="determineAction2()">{{t('location.intelligen-designs-hq.action2.determineAction')}}</button>
        </div>
        <template v-if="action2BuildLargeFacilityNumber">
          <span v-html="t('location.intelligen-designs-hq.action2.addLargeFacility')"></span><span>&nbsp;</span>
          <span class="fw-bold" v-html="t('location.intelligen-designs-hq.action2.selectFacility', {number:action2BuildLargeFacilityNumber})"></span>
        </template>
        <template v-if="action2BonusCardBenefit">
          <span v-html="t('location.intelligen-designs-hq.gainBonus')"></span><span>&nbsp;</span>
        <span class="fw-bold" v-html="t(`bonusCardBenefit.${action2BonusCardBenefit}`, {difficultyLevel})"></span>
        <span>.</span>
        </template>
      </li>
      <li><LackOfBuildingSpace :bot="bot" :navigationState="navigationState"/></li>      
    </ol>
    <img v-if="action1OpenOceanRoll || action1HireSpecialistNumber || action2BuildLargeFacilityNumber" src="@/assets/rules/intelligen-designs-hq-selection.webp" alt="" class="rules-image mt-2"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import LackOfBuildingSpace from '../LackOfBuildingSpace.vue'
import BonusCardBenefit from '@/services/enum/BonusCardBenefit'
import getBonusCardBenefit from '@/util/getBonusCardBenefit'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Module from '@/services/enum/Module'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'LocationIntelligenDesignsHq',
  components: {
    LackOfBuildingSpace
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    bot: {
      type: Bot,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      action1Determined: false,
      action1OpenOceanRoll: false,
      action1HireSpecialistNumber: undefined as number|undefined,
      action1RemoveTrainingToken: undefined as number|undefined,
      action1BonusCardBenefit: undefined as BonusCardBenefit|undefined,
      action2Determined: false,
      action2BuildLargeFacilityNumber: undefined as number|undefined,
      action2BonusCardBenefit: undefined as BonusCardBenefit|undefined
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    },
    hasNewArrivalsExpansion() : boolean {
      return this.state.setup.modules.includes(Module.NEW_ARRIVALS)
    }
  },
  methods: {
    determineAction1() {
      // check open ocean roll or specialist hiring or card bonus as fallback
      const actionCard = this.bot.cardDeck.draw()
      if (actionCard.slot == 1) {
        this.action1OpenOceanRoll = true
      }
      else if (actionCard.slot >= 2 && actionCard.slot <= 4) {
        this.action1HireSpecialistNumber = actionCard.slot
      }
      else {
        const bonusCard = this.bot.cardDeck.draw()
        this.action1RemoveTrainingToken = bonusCard.slot
        this.action1BonusCardBenefit = getBonusCardBenefit(bonusCard, this.navigationState.difficultyLevel)
      }
      this.action1Determined = true
    },
    determineAction2() {
      // check build large facility
      const buildingCard = this.bot.cardDeck.draw()
      if (buildingCard.slot == 1) {
        this.action2BonusCardBenefit = getBonusCardBenefit(buildingCard, this.navigationState.difficultyLevel)
      }
      else {
        this.action2BuildLargeFacilityNumber = buildingCard.slot
      }
      this.action2Determined = true
    },
  },
  mounted() {
    this.determineAction1()
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 1rem;
}
.rules-image {
  width: 100%;
  max-width: 350px;
}
</style>
