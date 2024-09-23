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
          <button v-if="(!facilityNumber && !noFacility) || determineFacilityRepeatable" class="btn btn-primary btn-sm mt-1" @click="determineFacility()">{{t('location.city-center.determineFacility')}}</button>
          <div v-if="facilityNumber" class="facility-result d-flex align-items-center">
            <span v-html="t('location.city-center.buildFacility', {number:facilityNumber})"></span>
            <button class="btn btn-secondary btn-sm ms-2" data-bs-toggle="modal" href="#facilitiesHabitatsModal">{{t('rules.facilitiesHabitats.title')}}</button>
          </div>
          <div v-else-if="noFacility" class="facility-result" v-html="t('location.city-center.noFacility')"></div>
       </li>
       <li><LackOfBuildingSpace :bot="bot" :navigationState="navigationState"/></li>
      </ol>
    </li>
    <li v-html="t('location.city-center.buyMarket')"></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import LackOfBuildingSpace from '../LackOfBuildingSpace.vue'

export default defineComponent({
  name: 'LocationCityCenter',
  components: {
    LackOfBuildingSpace
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
    },
    determineFacilityRepeatable: {
      type: Boolean,
      required: false
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
        this.facilityNumber = undefined
        this.noFacility = true
      }
      else {
        this.facilityNumber = nextCard.slot
        this.noFacility = false
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
