<template>
  <p v-html="t('location.dinogenics-iom.locationUse')"></p>
  <ol>
    <li v-html="t('location.dinogenics-iom.locationUseDNASet')"></li>
    <li v-html="t('location.dinogenics-iom.locationUseMutant')"></li>
  </ol>
  <p v-html="t('location.dinogenics-iom.enoughFences')"></p>
  <p v-html="t('location.dinogenics-iom.creatingDinosaur')"></p>
  <p v-html="t('location.dinogenics-iom.createHabitat')"></p>
  <p v-html="t('location.dinogenics-iom.moveStacks')"></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'

export default defineComponent({
  name: 'LocationDinogenicsIom',
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
