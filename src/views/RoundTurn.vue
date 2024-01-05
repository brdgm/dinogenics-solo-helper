<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    <AppIcon type="corporation" :name="navigationState.currentCorporation" class="corporation"/>
    {{t('roundTurn.title')}}
  </h1>

  <TurnPlayer v-if="navigationState.isPlayerTurn" :navigationState="navigationState" />
  <TurnBot v-if="navigationState.isBotTurn" :navigationState="navigationState" />

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

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
import TurnPlayer from '@/components/round/TurnPlayer.vue'
import TurnBot from '@/components/round/TurnBot.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'RoundTurn',
  components: {
    FooterButtons,
    SideBar,
    TurnPlayer,
    TurnBot,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, turn, turnCount } = navigationState
    return { t, state, navigationState, round, turn, turnCount }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn - 1}`
      }
      else {
        return `/round/${this.round}/openSeason`
      }
    }
  },
  methods: {
    next() : void {
      if (this.turn < this.turnCount) {
        this.$router.push(`/round/${this.round}/turn/${this.turn + 1}`)
      }
      else {
        this.$router.push(`/round/${this.round}/upkeepPhase`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.corporation {
  height: 4rem;
  filter: drop-shadow(0.15rem 0.15rem 0.15rem #aaa);
}
</style>