<template>
  <span v-html="t('lackOfBuildingSpace.info')"></span><br/>
  <button v-if="!bonusDetermined" class="btn btn-secondary btn-sm mt-1" @click="determineBonus()">{{t('lackOfBuildingSpace.determineBonus')}}</button>
  <span v-else class="fw-bold" v-html="t(`bonusCardBenefit.${bonusCardBenefit}`, {difficultyLevel})"></span>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import BonusCardBenefit from '@/services/enum/BonusCardBenefit'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Bot from '@/services/Bot'
import getBonusCardBenefit from '@/util/getBonusCardBenefit'

export default defineComponent({
  name: 'LackOfBuildingSpace',
  setup() {
    const { t } = useI18n()
    return { t }
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
      bonusDetermined: false
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    },
    bonusCardBenefit() : BonusCardBenefit|undefined {
      const currentCard = this.bot.cardDeck.currentCard
      if (currentCard) {
        return getBonusCardBenefit(currentCard, this.navigationState.difficultyLevel)
      }
      return undefined
    }
  },
  methods: {
    determineBonus() : void {
      this.bot.cardDeck.draw()
      this.bonusDetermined = true
    }
  }
})
</script>
