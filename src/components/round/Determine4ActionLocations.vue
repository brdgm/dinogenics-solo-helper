<template>
  <button v-if="!locationsDetermined" class="btn btn-secondary btn-sm" @click="determineBonus()">{{t('determine4ActionLocations.determineLocations')}}</button>
  <span v-else class="fw-bold">
    <template v-for="(location,index) of locations" :key="location">
      <span v-if="index > 0">, </span>
      <span v-html="t(`location.${location}.title`)"></span>
    </template>
  </span>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Bot from '@/services/Bot'
import Location from '@/services/enum/Location'

export default defineComponent({
  name: 'Determine4ActionLocations',
  setup() {
    const { t } = useI18n()
    return { t }
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
      locationsDetermined: false,
      locations: undefined as (Location[])|undefined
    }
  },
  computed: {
    difficultyLevel() : DifficultyLevel {
      return this.navigationState.difficultyLevel
    }
  },
  methods: {
    determineBonus() : void {
      const nextCard = this.bot.cardDeck.draw()
      this.locations = nextCard.locations
      this.locationsDetermined = true
    }
  }
})
</script>
