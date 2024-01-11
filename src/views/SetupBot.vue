<template>
  <h1>{{t('setupBot.title')}}</h1>

  <SetupBotInstructions/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { BotTurn, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import SetupBotInstructions from '@/components/setup/SetupBotInstructions.vue'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    SetupBotInstructions
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()

      // create initial bock decks
      const { playerCorporations, playerCount, botCount } = this.state.setup.playerSetup
      const initialBotTurns : BotTurn[] = []
      for (let playerIndex = playerCount; playerIndex < playerCount + botCount; playerIndex++) {
        initialBotTurns.push({
          corporation: playerCorporations[playerIndex],
          cardDeck: CardDeck.new().toPersistence()
        })
      }
      this.state.setup.initialBotTurns = initialBotTurns

      this.$router.push('/round/1/openSeason')
    }
  }
})
</script>
