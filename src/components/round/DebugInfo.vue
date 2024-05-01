<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug" v-for="bot in bots" :key="bot.corporation">
      <b>[{{bot.corporation}}]</b> {{getCardDeckInfo(bot)}}, level: {{navigationState.difficultyLevel}}
      <ul>
        <li v-for="card of getNextThreeCards(bot)" :key="card.id">Card {{card.id}}: {{getCardInfo(card)}}</li>
      </ul>
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Bot from '@/services/Bot'
import Card from '@/services/Card'
import getBonusCardBenefit from '@/util/getBonusCardBenefit'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    bots() : Bot[] {
      return this.navigationState.bots
    }
  },
  methods: {
    getCardDeckInfo(bot : Bot) : string {
      const cardDeck = bot.cardDeck
      const pile = cardDeck.pile.map(item => item.id)
      const discard = cardDeck.discard.filter(item => item.id != cardDeck.currentCard?.id).map(item => item.id)
      return `pile: [${pile}], current: [${cardDeck.currentCard?.id ?? ''}], discard: [${discard}]`
    },
    getNextThreeCards(bot : Bot) : Card[] {
      const cards : Card[] = []
      if (bot.cardDeck.currentCard) {
        cards.push(bot.cardDeck.currentCard)
      }
      bot.cardDeck.pile.forEach(card => {
        if (cards.length < 3) {
          cards.push(card)
        }
      })
      return cards
    },
    getCardInfo(card : Card) : string {
      const bonus = getBonusCardBenefit(card, this.navigationState.difficultyLevel)
      return `[${card.locations}], slot ${card.slot}, [${card.dinosaurs}], bonus: ${bonus}, advanced: ${card.ruleChange}`
    }
  },
  mounted() {
    if (this.state.setup.debugMode) {
      window.setInterval(() => this.$forceUpdate(), 500)
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
