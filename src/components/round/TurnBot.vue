<template>
  <div v-if="bonusCardBenefit" class="row p-1">
    <div class="col alert alert-warning">
      <span v-html="t('turnBot.bonusCardBenefit')"></span><span>&nbsp;</span>
      <span class="fw-bold" v-html="t(`bonusCardBenefit.${bonusCardBenefit}`,{difficultyLevel})"></span>
    </div>
  </div>
  <template v-if="isLocationInvalid">
    <p class="mt-4" v-html="t('turnBot.outOfLocations')"></p>
    <button class="btn btn-warning btn-lg mt-3" @click="back()">
      {{t('turnBot.back')}}
    </button>
  </template>
  <template v-else>
    <h3>{{t(`location.${currentLocation}.title`)}}</h3>
    <p>{{t(`location.${currentLocation}.ruleSummary`)}}</p>

    <template v-if="isOutsource">
      <p v-html="t('location.outsource.useOtherLocation')"></p>
      <div class="card text-bg-light mb-3">
        <div class="card-body">
          <h4 class="card-title">{{t(`location.${currentOutsourceLocation}.title`)}}</h4>
          <p class="card-subtitle mb-2">{{t(`location.${currentOutsourceLocation}.ruleSummary`)}}</p>
          <LocationAction v-if="currentOutsourceLocation" :location="currentOutsourceLocation" :bot="bot" :navigationState="navigationState"/>
          <button class="btn btn-danger mt-4" @click="notPossibleOutsource()">
            {{t('turnBot.notPossible')}}
          </button>
        </div>
      </div>
      <p v-html="t('location.outsource.actions')"></p>
    </template>
    <template v-else>
      <LocationAction v-if="currentLocation" :location="currentLocation" :bot="bot" :navigationState="navigationState"/>
    </template>

    <button class="btn btn-success btn-lg mt-4 me-2" @click="executed()">
      {{t('turnBot.executed')}}
    </button>
    <button class="btn btn-danger btn-lg mt-4" @click="notPossible()">
      {{t('turnBot.notPossible')}}
    </button>

  </template>
</template>

<script lang="ts">
import Bot from '@/services/Bot'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Location from '@/services/enum/Location'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import LocationAction from './LocationAction.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    LocationAction
  },
  emits: ['next','back'],
  setup(props) {
    const { t } = useI18n()
    
    // draw next card for bot
    const { bot, navigationState } = props
    bot.cardDeck.draw()

    // determine current location
    const { round, turn, location, outsource, modules } = navigationState
    const botLocation = bot.getLocation(location, modules, navigationState.difficultyLevel)
    const currentLocation = botLocation?.location
    let bonusCardBenefit = botLocation?.bonusCardBenefit

    // check for outsource location
    const isOutsource = (currentLocation == Location.OUTSOURCE)
    let currentOutsourceLocation
    if (isOutsource) {
      const outsourceBotLocation = bot.getOutsourceLocation(outsource, modules, navigationState.difficultyLevel)
      currentOutsourceLocation = outsourceBotLocation?.location
      bonusCardBenefit = undefined
    }

    return { t, currentLocation, bonusCardBenefit, round, turn, location, outsource, isOutsource, currentOutsourceLocation }
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
  computed: {
    isLocationInvalid() : boolean {
      return this.currentLocation == undefined
          || (this.isOutsource && this.currentOutsourceLocation == undefined)
    },
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    }
  },
  methods: {
    executed() {
      this.$emit('next')
    },
    notPossible() {
      this.$router.push(`/round/${this.round}/turn/${this.turn}/location/${this.location + 1}`)
    },
    notPossibleOutsource() {
      this.$router.push(`/round/${this.round}/turn/${this.turn}/location/${this.location}/outsource/${this.outsource + 1}`)
    },
    back() {
      this.$emit('back')
    }
  }
})
</script>
