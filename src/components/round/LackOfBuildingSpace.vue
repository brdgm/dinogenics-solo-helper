<template>
  <span v-html="t('lackOfBuildingSpace.info')"></span><br/>
  <DetermineBonusCardBenefit :bot="bot" :navigationState="navigationState"/>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Bot from '@/services/Bot'
import DetermineBonusCardBenefit from './DetermineBonusCardBenefit.vue'

export default defineComponent({
  name: 'LackOfBuildingSpace',
  components: {
    DetermineBonusCardBenefit
  },
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
  }
})
</script>
