<template>
  <LocationRulesCollapse :dnaCollection="true">
    <ul>
      <li v-html="t('location.site-common.locationUse')"></li>
      <li v-html="t('location.site-common.cardAssignment')"></li>
      <li v-html="t('location.site-common.newStack')"></li>
      <li v-if="hasNewArrivalsExpansion" v-html="t('location.site-b.noMarketTokens')"></li>
    </ul>
  </LocationRulesCollapse>
  <ul>
    <li>
      <span v-html="t('location.site-b.gainBonus')"></span><br/>
      <DetermineBonusCardBenefit :bot="bot" :navigationState="navigationState"/>
    </li>
    <li v-html="t('location.site-b.drawDNA')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import LocationRulesCollapse from '../LocationRulesCollapse.vue'
import DetermineBonusCardBenefit from '../DetermineBonusCardBenefit.vue'
import Module from '@/services/enum/Module'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'LocationSiteB',
  components: {
    LocationRulesCollapse,
    DetermineBonusCardBenefit
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
  computed: {
    hasNewArrivalsExpansion() : boolean {
      return this.state.setup.modules.includes(Module.NEW_ARRIVALS)
    }
  }
})
</script>
