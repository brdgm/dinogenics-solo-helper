<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundUpkeepPhase.title')}}</h1>

  <ol>
    <li>
      <span v-html="t('roundUpkeepPhase.feedCarnivores')"></span>
      <ul>
        <li v-html="t('roundUpkeepPhase.spawnMutant')"></li>
      </ul>
    </li>
    <li v-html="t('roundUpkeepPhase.checkRampage')"></li>
    <li v-html="t('roundUpkeepPhase.gainVisitorVPs')"></li>
    <li v-html="t('roundUpkeepPhase.gainDinosaurFacilityVPs')"></li>
    <li v-html="t('roundUpkeepPhase.gainDinosaurFacilityResources')"></li>
    <template v-if="!lastRound">
      <li v-html="t('roundUpkeepPhase.returnWorkers')"></li>
      <li v-html="t('roundUpkeepPhase.advanceVisitorOverlay')"></li>
    </template>
  </ol>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'

export default defineComponent({
  name: 'RoundUpkeepPhase',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, turnCount } = navigationState
    return { t, state, round, turnCount, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/${this.round}/turn/${this.turnCount}`
    },
    lastRound() : boolean {
      return this.round == 7
    }
  },
  methods: {
    next() : void {
      if (this.lastRound) {
        this.$router.push('/endOfGame')
      }
      else {
        this.$router.push(`/round/${this.round + 1}/openSeason`)
      }
    }
  }
})
</script>
