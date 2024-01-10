<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    <AppIcon type="corporation" :name="navigationState.currentCorporation" class="corporation"/>
    {{t('roundTurn.title', {worker})}}
  </h1>

  <TurnPlayer v-if="navigationState.isPlayerTurn" :navigationState="navigationState" @next="next()"/>
  <TurnBot v-if="navigationState.isBotTurn && navigationState.currentBot"
      :navigationState="navigationState" :bot="navigationState.currentBot" @next="next()" @back="back()"/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Turn, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'
import TurnPlayer from '@/components/round/TurnPlayer.vue'
import TurnBot from '@/components/round/TurnBot.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'

export default defineComponent({
  name: 'RoundTurn',
  components: {
    FooterButtons,
    SideBar,
    TurnPlayer,
    TurnBot,
    AppIcon,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, turn, location, outsource, worker, turnCount } = navigationState
    return { t, state, navigationState, round, turn, location, outsource, worker, turnCount }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.outsource > 0) {
        return `/round/${this.round}/turn/${this.turn}/location/${this.location}/outsource/${this.outsource - 1}`
      }
      if (this.location > 0) {
        return `/round/${this.round}/turn/${this.turn}/location/${this.location - 1}`
      }
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
      const turnData : Turn = {
        round: this.round,
        turn: this.turn,
        botTurns: this.navigationState.bots.map(bot => bot.toPersistence())
      }
      this.state.storeTurn(turnData)
      if (this.turn < this.turnCount) {
        this.$router.push(`/round/${this.round}/turn/${this.turn + 1}`)
      }
      else {
        this.$router.push(`/round/${this.round}/upkeepPhase`)
      }
    },
    back() : void {
      this.$router.push(this.backButtonRouteTo)
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