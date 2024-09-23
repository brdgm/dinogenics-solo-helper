<template>
  <component :is="`location-${location}`" :bot="bot" :navigationState="navigationState"/>
</template>

<script lang="ts">
import Bot from '@/services/Bot'
import NavigationState from '@/util/NavigationState'
import { defineComponent, PropType } from 'vue'
import LocationAgency from './location/LocationAgency.vue'
import LocationBoneyard from './location/LocationBoneyard.vue'
import LocationCityCenter from './location/LocationCityCenter.vue'
import LocationDinogenicsIom from './location/LocationDinogenicsIom.vue'
import LocationFarm from './location/LocationFarm.vue'
import LocationFerry from './location/LocationFerry.vue'
import LocationIntelligenDesignsHq from './location/LocationIntelligenDesignsHq.vue'
import LocationRefinement from './location/LocationRefinement.vue'
import LocationSiteA from './location/LocationSiteA.vue'
import LocationSiteB from './location/LocationSiteB.vue'
import LocationSiteD from './location/LocationSiteD.vue'
import LocationSpecialAction from './location/LocationSpecialAction.vue'
import LocationTimeShare from './location/LocationTimeShare.vue'
import LocationUplink from './location/LocationUplink.vue'
import Location from '@/services/enum/Location'

export default defineComponent({
  name: 'LocationAction',
  components: {
    LocationAgency,
    LocationBoneyard,
    LocationCityCenter,
    LocationDinogenicsIom,
    LocationFarm,
    LocationFerry,
    LocationIntelligenDesignsHq,
    LocationRefinement,
    LocationSiteA,
    LocationSiteB,
    LocationSiteD,
    LocationSpecialAction,
    LocationTimeShare,
    LocationUplink
  },
  props: {
    location: {
      type: String as PropType<Location>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    },
    bot: {
      type: Bot,
      required: true
    }
  }
})
</script>
