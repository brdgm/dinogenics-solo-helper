<template>
  <LocationRulesCollapse>
    <ul>
      <li v-html="t('location.agency.drawManipulation')"></li>
      <li v-html="t('location.agency.discardScandalToken')"></li>
    </ul>
  </LocationRulesCollapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import LocationRulesCollapse from '../LocationRulesCollapse.vue'

export default defineComponent({
  name: 'LocationAgency',
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
