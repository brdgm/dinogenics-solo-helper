<template>
  <p v-html="t('location.city-center.actionSelection')"></p>
  <ol>
    <li v-html="t('location.city-center.receiveFences')"></li>
    <li>
      <span v-html="t('location.city-center.facilityBuildRepair')"></span>
      <ol type="a">
        <li v-html="t('location.city-center.facilityBuildRepairBiodome')"></li>
        <li v-html="t('location.city-center.facilityBuildRepairHotel')"></li>
        <li v-html="t('location.city-center.facilityBuildRepairOtherwise')"></li>
      </ol>
    </li>
    <li v-html="t('location.city-center.buyMarket')"></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'

export default defineComponent({
  name: 'LocationCityCenter',
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

<style lang="scss" scoped>
li {
  margin-bottom: 0.5rem;
}
li li {
  margin-bottom: 0;
}
</style>
