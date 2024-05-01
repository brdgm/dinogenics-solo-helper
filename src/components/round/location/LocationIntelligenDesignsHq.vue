<template>
  <div class="mb-3">
    <template v-if="actionDetermined">
      <button class="btn btn-secondary btn-sm mb-3 me-1" data-bs-toggle="modal" href="#facilitiesHabitatsModal">{{t('rules.facilitiesHabitats.title')}}</button>
      <ul>
        <li v-if="openOceanRoll" v-html="t('location.intelligen-designs-hq.openOceanRoll')"></li>
        <li v-if="hireSpecialistNumber" v-html="t('location.intelligen-designs-hq.hireSpecialist', {number:hireSpecialistNumber})"></li>
        <li v-html="t('location.intelligen-designs-hq.buildAquaticHabitat')"></li>
        <li v-html="t('location.intelligen-designs-hq.buildLargeFacility', {number:buildLargeFacilityNumber})"></li>
        <li v-if="bonusCardBenefit"><LackOfBuildingSpace :bonusCardBenefit="bonusCardBenefit" :navigation-state="navigationState"/></li>
      </ul>
      <img src="@/assets/rules/intelligen-designs-hq-selection.jpg" alt="" class="rules-image"/>
    </template>
    <template v-else>
      <button class="btn btn-primary btn-sm" @click="determineAction()">{{t('location.intelligen-designs-hq.determineAction')}}</button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'
import BonusCardBenefit from '@/services/enum/BonusCardBenefit'
import getBonusCardBenefit from '@/util/getBonusCardBenefit'
import LackOfBuildingSpace from '../LackOfBuildingSpace.vue'

export default defineComponent({
  name: 'LocationIntelligenDesignsHq',
  components: {
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
      actionDetermined: false,
      openOceanRoll: false,
      hireSpecialistNumber: undefined as number|undefined,
      buildLargeFacilityNumber: undefined as number|undefined
    }
  },
  computed: {
    bonusCardBenefit() : BonusCardBenefit|undefined {
      const currentCard = this.bot.cardDeck.currentCard
      if (currentCard) {
        return getBonusCardBenefit(currentCard, this.navigationState.difficultyLevel)
      }
      return undefined
    }
  },
  methods: {
    determineAction() {
      // check open ocean roll or specialist hiring
      const firstCard = this.bot.cardDeck.draw()
      if (firstCard.slot == 1) {
        this.openOceanRoll = true
      }
      else if (firstCard.slot >= 2 && firstCard.slot <= 4) {
        this.hireSpecialistNumber = firstCard.slot
      }
      // check build large facility
      const secondCard = this.bot.cardDeck.draw()
      this.buildLargeFacilityNumber = secondCard.slot
      this.actionDetermined = true
    }
  }
})
</script>

<style lang="scss" scoped>
.rules-image {
  width: 100%;
  max-width: 350px;
}
</style>
