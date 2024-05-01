<template>
  <span v-html="t('lackOfBuildingSpace.info')"></span><span>&nbsp;</span>
  <span v-html="t(`bonusCardBenefit.${bonusCardBenefit}`, {difficultyLevel})"></span>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import BonusCardBenefit from '@/services/enum/BonusCardBenefit'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { PropType } from 'vue'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'LackOfBuildingSpace',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    bonusCardBenefit: {
      type: String as PropType<BonusCardBenefit>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    }
  }
})
</script>
