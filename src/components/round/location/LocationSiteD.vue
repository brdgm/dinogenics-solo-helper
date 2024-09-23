<template>
  <LocationRulesCollapse :dnaCollection="true">
    <ul>
      <li v-html="t('location.site-common.locationUse')"></li>
      <li v-html="t('location.site-common.cardAssignment')"></li>
      <li v-html="t('location.site-common.newStack')"></li>
    </ul>
  </LocationRulesCollapse>
  <ul>
    <li v-html="t('location.site-d.drawEDNA')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import LocationRulesCollapse from '../LocationRulesCollapse.vue'

export default defineComponent({
  name: 'LocationSiteD',
  components: {
    LocationRulesCollapse
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
