<template>
  <template v-for="actionIndex of actionIndexes" :key="actionIndex">
    <hr v-if="actionIndex > 0"/>
    <div class="fw-bold">
      {{t(`rules.manipulationCard.infiltrator.chooseLocation`,{number:actionIndex+1})}}
    </div>
    <div class="form-check form-check-inline" v-for="location of locations" :key="location">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" v-model="selectedLocation[actionIndex]" :value="location" :name="`infiltratorLocation${actionIndex}`">
        {{t(`location.${location}.title`)}}
      </label>
    </div>
    <div v-if="selectedLocation[actionIndex]" class="card text-bg-info mt-2">
      <div class="card-body">
        <h3>{{t(`location.${selectedLocation[actionIndex]}.title`)}}</h3>
        <p>{{t(`location.${selectedLocation[actionIndex]}.ruleSummary`)}}</p>
        <LocationAction :location="selectedLocation[actionIndex]" :bot="bot" :navigationState="navigationState"/>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'
import LocationAction from './LocationAction.vue'

export default defineComponent({
  name: 'ManipulationCardInfiltratorActions',
  components: {
    LocationAction
  },
  setup(props) {
    const { t } = useI18n()

    const cardDeck = props.bot.cardDeck
    const locations : Location[] = cardDeck.currentCard?.locations ?? []
    const nextCard = cardDeck.draw()
    nextCard.locations.forEach(location => {
      if (!locations.includes(location)) {
        locations.push(location)
      }
    })

    return { t, locations }
  },
  props: {
    bot: {
      type: Bot,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      actionIndexes: [0, 1],
      selectedLocation: [] as (Location|undefined)[]
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    }
  }
})
</script>
