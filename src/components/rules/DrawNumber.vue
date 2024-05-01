<template>
  <button class="btn btn-secondary btn-sm me-2" @click="drawNumber()">{{t('drawNumber.title')}}</button>
  <span class="fw-bold">{{drawnNumber}}</span>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'DrawNumber',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      drawnNumber: undefined as number|undefined
    }
  },
  computed: {
    cardDeck() : CardDeck {
      return this.navigationState.bots[0].cardDeck
    }
  },
  methods: {
    drawNumber() : void {
      const nextCard = this.cardDeck.draw()
      this.drawnNumber = nextCard.slot
    }
  }
})
</script>
