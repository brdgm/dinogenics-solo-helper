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
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import SetupBotInstructions from '@/components/setup/SetupBotInstructions.vue'

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
      this.$router.push('/round/1')
    }
  }
})
</script>
