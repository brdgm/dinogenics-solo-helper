<template>
  <ul>
    <li v-html="t('location.special-action.locationUse')"></li>
    <li v-html="t('location.special-action.resolveAction')"></li>
    <li v-html="t('location.special-action.breakingNewsApply')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'

export default defineComponent({
  name: 'LocationSpecialAction',
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
