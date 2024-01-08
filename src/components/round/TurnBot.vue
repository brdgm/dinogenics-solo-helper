<template>
  <h3>{{t(`location.${currentLocation}.title`)}}</h3>
  <p>{{t(`location.${currentLocation}.ruleSummary`)}}</p>

  <div>
    <button class="btn btn-sm btn-secondary mb-3" data-bs-toggle="collapse" data-bs-target="#locationFullRules">Show Rules</button>
    <div class="collapse" id="locationFullRules">
      <component :is="`location-${currentLocation}`" :location="currentLocation" :bot="bot" :navigationState="navigationState"/>
    </div>
  </div>  

  <button class="btn btn-success btn-lg mt-4" @click="executed()">
    {{t('turnBot.executed')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4 ms-2" @click="notPossible()">
    {{t('turnBot.notPossible')}}
  </button>
</template>

<script lang="ts">
import Bot from '@/services/Bot'
import CardDeck from '@/services/CardDeck'
import Location from '@/services/enum/Location'
import NavigationState from '@/util/NavigationState'
import isLocationAvailable from '@/util/isLocationAvailable'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LocationAgency from './location/LocationAgency.vue'
import LocationBoneyard from './location/LocationBoneyard.vue'
import LocationCityCenter from './location/LocationCityCenter.vue'
import LocationDinogenicsIom from './location/LocationDinogenicsIom.vue'
import LocationFarm from './location/LocationFarm.vue'
import LocationFerry from './location/LocationFerry.vue'
import LocationIntelligenDesignsHq from './location/LocationIntelligenDesignsHq.vue'
import LocationOutsource from './location/LocationOutsource.vue'
import LocationRefinement from './location/LocationRefinement.vue'
import LocationSiteA from './location/LocationSiteA.vue'
import LocationSiteB from './location/LocationSiteB.vue'
import LocationSiteD from './location/LocationSiteD.vue'
import LocationSpecialAction from './location/LocationSpecialAction.vue'
import LocationTimeShare from './location/LocationTimeShare.vue'
import LocationUplink from './location/LocationUplink.vue'

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
    LocationOutsource,
    LocationSiteA,
    LocationSiteB,
    LocationSiteD,
    LocationSpecialAction,
    LocationTimeShare,
    LocationUplink
  },
  emits: ['next'],
  setup(props) {
    const { t } = useI18n()
    // draw next card for bot
    const currentCard = props.bot.cardDeck.draw()
    const cardId = ref(currentCard.id)
    return { t, cardId }
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
  data() {
    return {
      currentLocationIndex: 0
    }
  },
  computed: {
    cardDeck(): CardDeck {
      return this.bot.cardDeck
    },
    validLocations(): Location[] {
      this.cardId  // ensure re-computation when current card changes
      return (this.cardDeck.currentCard?.locations ?? [])
          .filter(item => isLocationAvailable(item, this.navigationState.modules))
    },
    currentLocation() : Location {
      return this.validLocations[this.currentLocationIndex]
    }
  },
  methods: {
    executed() {
      this.$emit('next')
    },
    notPossible() {
      if (this.currentLocationIndex < this.validLocations.length - 1) {
        this.currentLocationIndex++
      }
      else {
        // no valid location on current card? draw next card
        const currentCard = this.cardDeck.draw()
        this.cardId = currentCard.id
        this.currentLocationIndex = 0
      }
    }
  }
})
</script>
