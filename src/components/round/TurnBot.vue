<template>
  <p class="mt-4">{{ cardDeck.currentCard.id }} {{ validLocations }}</p>

  <button class="btn btn-primary btn-lg mt-4" @click="$emit('next')">
    {{t('action.next')}}
  </button>
</template>

<script lang="ts">
import Bot from '@/services/Bot'
import CardDeck from '@/services/CardDeck'
import Location from '@/services/enum/Location'
import NavigationState from '@/util/NavigationState'
import isLocationAvailable from '@/util/isLocationAvailable'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'TurnBot',
  emits: ['next'],
  setup() {
    const { t } = useI18n()
    return { t }
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
    cardDeck() : CardDeck {
      return this.bot.cardDeck
    },
    validLocations() : Location[] {
      return this.cardDeck.currentCard.locations
          .filter(item => isLocationAvailable(item, this.navigationState.modules))
    }
  }
})
</script>
