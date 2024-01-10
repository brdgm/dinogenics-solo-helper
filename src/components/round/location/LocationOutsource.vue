<template>
  <LocationRulesCollapse>
    <ul>
      <li v-html="t('location.outsource.drawAnotherCard')"></li>
      <li v-html="t('location.outsource.actions')"></li>
    </ul>
  </LocationRulesCollapse>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'
import LocationRulesCollapse from '../LocationRulesCollapse.vue'

export default defineComponent({
  name: 'LocationOutsource',
  components: {
    LocationRulesCollapse
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
  }
})
</script>
