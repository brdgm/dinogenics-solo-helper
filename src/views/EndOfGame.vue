<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <FinalScoring :navigationState="navigationState"/>

  <DifficultyLevel :navigationState="navigationState"/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import DebugInfo from '@/components/round/DebugInfo.vue'
import FinalScoring from '@/components/scoring/FinalScoring.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    DebugInfo,
    FinalScoring,
    DifficultyLevel
},
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    return { t, state, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/7/upKeepPhase'
    }
  }
})
</script>
