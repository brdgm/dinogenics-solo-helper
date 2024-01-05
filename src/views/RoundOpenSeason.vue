<template>
  <h1>{{t('roundOpenSeason.title')}}</h1>

  <ol>
    <template v-if="round > 1">
      <li>
        <span v-html="t('roundOpenSeason.playerOrder')"></span><br/>
        <DeterminePlayerOrder :playerOrder="playerOrder" @newPlayerOrder="setNewPlayerOrder" class="ms-3" />
      </li>
      <li v-html="t('roundOpenSeason.assignVisitors')"></li>
      <li v-html="t('roundOpenSeason.assignBonusVisitors')"></li>
      <li v-html="t('roundOpenSeason.receiveIncome')"></li>
      <li v-html="t('roundOpenSeason.breakingNews')"></li>
    </template>
    <li v-html="t('roundOpenSeason.drawFacilityTiles')"></li>
    <li v-if="hasControlledChaos" v-html="t('roundOpenSeason.drawSpecialists')"></li>
  </ol>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" :disabled="!hasValidPlayerOrder">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Round, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import DeterminePlayerOrder from '@/components/round/DeterminePlayerOrder.vue'
import Corporation from '@/services/enum/Corporation'

export default defineComponent({
  name: 'RoundOpenSeason',
  components: {
    FooterButtons,
    DeterminePlayerOrder
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const { round, playerOrder, hasControlledChaos } = navigationState
    return { t, state, round, navigationState, playerOrder, hasControlledChaos }
  },
  data() {
    return {
      newPlayerOrder: [] as Corporation[]
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round > 1) {
        return `/round/${this.round - 1}/upkeepPhase`
      }
      else {
        return ''
      }
    },
    hasValidPlayerOrder() : boolean {
      return this.newPlayerOrder.length == this.playerOrder.length
    }
  },
  methods: {
    next() : void {
      const roundData : Round = {
        round: this.round,
        playerOrder: this.newPlayerOrder,
        botRound: []
      }
      this.state.storeRound(roundData)
      this.$router.push(`/round/${this.round}/turn/1`)
    },
    setNewPlayerOrder(newPlayerOrder: Corporation[]) : void {
      this.newPlayerOrder = newPlayerOrder
    }
  },
  mounted() {
    if (this.round == 1) {
      this.newPlayerOrder = this.playerOrder
    }
  }
})
</script>
