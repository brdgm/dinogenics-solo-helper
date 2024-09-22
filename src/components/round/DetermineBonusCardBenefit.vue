<template>
  <button v-if="!bonusDetermined || multiple" class="btn btn-secondary btn-sm me-2" @click="determineBonus()">{{t('determineBonusCardBenefit.determineBonus')}}</button>
  <span v-if="bonusDetermined" class="fw-bold" v-html="t(`bonusCardBenefit.${bonusCardBenefit}`, {difficultyLevel})"></span>
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
  name: 'DetermineBonusCardBenefit',
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
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bonusDetermined: false,
      bonusCardBenefit: undefined as BonusCardBenefit|undefined
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    }
  },
  methods: {
    determineBonus() : void {
      const nextCard = this.bot.cardDeck.draw()
      this.bonusCardBenefit = getBonusCardBenefit(nextCard, this.difficultyLevel)
      this.bonusDetermined = true
    }
  }
})
</script>
