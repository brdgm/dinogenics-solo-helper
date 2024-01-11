<template>
  <p v-html="t('location.city-center.actionSelection')"></p>
  <ol>
    <li v-html="t('location.city-center.receiveFences')"></li>
    <li>
      <span v-html="t('location.city-center.facilityBuildRepair')"></span>
      <ol type="a">
        <li v-html="t('location.city-center.facilityBuildRepairBiodome')"></li>
        <li v-html="t('location.city-center.facilityBuildRepairHotel')"></li>
        <li>
          <span v-html="t('location.city-center.facilityBuildRepairOtherwise')"></span><br/>
          <div v-if="facilityNumber" class="facility-result d-flex align-items-center">
            <span v-html="t('location.city-center.buildFacility', {number:facilityNumber})"></span>
            <button class="btn btn-secondary btn-sm ms-2" data-bs-toggle="modal" href="#facilitiesHabitatsModal">{{t('rules.facilitiesHabitats.title')}}</button>
          </div>
          <div v-else-if="noFacility" class="facility-result" v-html="t('location.city-center.noFacility')"></div>
          <button v-else class="btn btn-primary btn-sm mt-1" @click="determineFacility()">{{t('location.city-center.determineFacility')}}</button>          
       </li>
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
  },
  data() {
    return {
      facilityNumber: undefined as number|undefined,
      noFacility: false
    }
  },
  methods: {
    determineFacility() {
      const nextCard = this.bot.cardDeck.draw()
      if (nextCard.slot > 4) {
        this.noFacility = true
      }
      else {
        this.facilityNumber = nextCard.slot
      }
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
.facility-result {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  padding-left: 0.5rem;
}
</style>
