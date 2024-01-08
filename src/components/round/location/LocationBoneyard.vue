<template>
  <ul>
    <li v-html="t(`location.boneyard.locationUse`)"></li>
    <li v-html="t(`location.boneyard.severalMatches`)"></li>
    <li v-html="t(`location.boneyard.scandalToken`)"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'

export default defineComponent({
  name: 'LocationBoneyard',
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
