<template>
  <p class="mt-4">{{ cardDeck.currentCard.id }} {{ validLocations }}</p>
</template>

<script lang="ts">
import CardDeck from '@/services/CardDeck'
import Location from '@/services/enum/Location'
import NavigationState from '@/util/NavigationState'
import isLocationAvailable from '@/util/isLocationAvailable'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'TurnBot',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    cardDeck: {
      type: CardDeck,
      required: true
    }
  },
  data() {
    return {
      currentLocationIndex: 0
    }
  },
  computed: {
    validLocations() : Location[] {
      return this.cardDeck.currentCard.locations
          .filter(item => isLocationAvailable(item, this.navigationState.modules))
    }
  }
})
</script>
