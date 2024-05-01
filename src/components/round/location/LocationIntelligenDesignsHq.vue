<template>
  <div class="mb-3">
    <ol>
      <li>
        <span v-html="t('location.intelligen-designs-hq.action1.aquaticHabitat')"></span><br/>
        <span v-html="t('location.intelligen-designs-hq.action1.otherwise')"></span><br/>
        <div class="mt-2" v-if="!action1Determined">
          <button class="btn btn-primary btn-sm" @click="determineAction1()">{{t('location.intelligen-designs-hq.action1.determineAction')}}</button>
        </div>
        <ul v-else>
          <li v-if="action1OpenOceanRoll" v-html="t('location.intelligen-designs-hq.action1.openOceanRoll')"></li>
          <template v-if="action1HireSpecialistNumber">
            <li v-html="t('location.intelligen-designs-hq.action1.hireSpecialist', {number:action1HireSpecialistNumber})"></li>
            <li>
              <span v-html="t('location.intelligen-designs-hq.action1.specialistNotAvailable')"></span><br/>
              <DetermineBonusCardBenefit :bot="bot" :navigationState="navigationState"/>
            </li>
          </template>
          <li v-else>
            <span v-html="t('location.intelligen-designs-hq.action1.gainBonus')"></span><span>&nbsp;</span>
            <span class="fw-bold" v-html="t(`bonusCardBenefit.${action1BonusCardBenefit}`, {difficultyLevel})"></span>
          </li>
        </ul>
      </li>
      <li v-if="action2Determined">
        <span v-html="t('location.intelligen-designs-hq.action2.addLargeFacility')"></span>
        <ul>
          <li class="fw-bold" v-html="t('location.intelligen-designs-hq.action2.selectFacility', {number:action2BuildLargeFacilityNumber})"></li>
          <li v-html="t('location.intelligen-designs-hq.action2.facilityHint')"></li>
        </ul>
      </li>
      <li><LackOfBuildingSpace :bot="bot" :navigationState="navigationState"/></li>      
    </ol>
    <img v-if="action1Determined || action2Determined" src="@/assets/rules/intelligen-designs-hq-selection.jpg" alt="" class="rules-image"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'
import LackOfBuildingSpace from '../LackOfBuildingSpace.vue'
import BonusCardBenefit from '@/services/enum/BonusCardBenefit'
import getBonusCardBenefit from '@/util/getBonusCardBenefit'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DetermineBonusCardBenefit from '../DetermineBonusCardBenefit.vue'

export default defineComponent({
  name: 'LocationIntelligenDesignsHq',
  components: {
    DetermineBonusCardBenefit,
    LackOfBuildingSpace
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    location: {
      type: String as PropType<Location>,
      required: true
    },
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
      action1BonusCardBenefit: undefined as BonusCardBenefit|undefined,
      action2Determined: false,
      action2BuildLargeFacilityNumber: undefined as number|undefined
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
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
        this.action1BonusCardBenefit = getBonusCardBenefit(bonusCard, this.navigationState.difficultyLevel)
      }
      this.action1Determined = true
    },
    determineAction2() {
      // check build large facility
      const buildingCard = this.bot.cardDeck.draw()
      this.action2BuildLargeFacilityNumber = buildingCard.slot
      this.action2Determined = true
    },
  },
  mounted() {
    this.determineAction2()
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-bottom: 1rem;
}
.rules-image {
  width: 100%;
  max-width: 350px;
}
</style>
