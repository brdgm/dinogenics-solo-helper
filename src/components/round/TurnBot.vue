<template>
  <template v-if="isLocationInvalid">
    <p class="mt-4" v-html="t('turnBot.outOfLocations')"></p>
    <button class="btn btn-warning btn-lg mt-3" @click="back()">
      {{t('turnBot.back')}}
    </button>
  </template>
  <template v-else>
    <h3>{{t(`location.${currentLocation}.title`)}}</h3>
    <p>{{t(`location.${currentLocation}.ruleSummary`)}}</p>

    <template v-if="isOutsource">
      <p v-html="t('location.outsource.useOtherLocation')"></p>
      <div class="card text-bg-light mb-3">
        <div class="card-body">
          <h4 class="card-title">{{t(`location.${currentOutsourceLocation}.title`)}}</h4>
          <p class="card-subtitle mb-2">{{t(`location.${currentOutsourceLocation}.ruleSummary`)}}</p>
          <component :is="`location-${currentOutsourceLocation}`" :location="currentOutsourceLocation" :bot="bot" :navigationState="navigationState"/>
        </div>
      </div>
      <p v-html="t('location.outsource.actions')"></p>
    </template>
    <template v-else>
      <component :is="`location-${currentLocation}`" :location="currentLocation" :bot="bot" :navigationState="navigationState"/>
    </template>

    <button class="btn btn-success btn-lg mt-4" @click="executed()">
      {{t('turnBot.executed')}}
    </button>
    <button class="btn btn-danger btn-lg mt-4 ms-2" @click="notPossible()">
      {{t('turnBot.notPossible')}}
    </button>

  </template>
</template>

<script lang="ts">
import Bot from '@/services/Bot'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
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
  name: 'TurnBot',
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
  emits: ['next','back'],
  setup(props) {
    const { t } = useI18n()
    
    // draw next card for bot
    const { bot, navigationState } = props
    bot.cardDeck.draw()

    // determine current location
    const { round, turn, location, outsource, modules } = navigationState
    const currentLocation = bot.getLocation(location, modules)

    // check for outsource location
    const isOutsource = (currentLocation == Location.OUTSOURCE)
    let currentOutsourceLocation
    if (isOutsource) {
      currentOutsourceLocation = bot.getOutsourceLocation(outsource, modules)
    }

    return { t, currentLocation, round, turn, location, outsource, isOutsource, currentOutsourceLocation }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    bot: {
      type: Bot,
      required: true
    }
  },
  computed: {
    isLocationInvalid() : boolean {
      return this.currentLocation == undefined
          || (this.isOutsource && this.currentOutsourceLocation == undefined)
    }
  },
  methods: {
    executed() {
      this.$emit('next')
    },
    notPossible() {
      if (this.isOutsource) {
        this.$router.push(`/round/${this.round}/turn/${this.turn}/location/${this.location}/outsource/${this.outsource + 1}`)
      }
      else {
        this.$router.push(`/round/${this.round}/turn/${this.turn}/location/${this.location + 1}`)
      }
    },
    back() {
      this.$emit('back')
    }
  }
})
</script>
