<template>
  <ModalDialog id="generalRulesModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.general.title')">
    <template #body>
      <p v-html="t('rules.general.intro')"></p>
      <ul>
        <li v-html="t('rules.general.noMoney')"></li>
        <li v-html="t('rules.general.noKilling')"></li>
        <li v-html="t('rules.general.noHandLimit')"></li>
        <li v-html="t('rules.general.collectFences')"></li>
        <li v-html="t('rules.general.upkeepPhase')"></li>
        <li v-html="t('rules.general.notEnoughGoats')"></li>
      </ul>
      <h5 v-html="t('rules.general.feedingPriority.title')"></h5>
      <ol>
        <li v-html="t('rules.general.feedingPriority.fedCompletely')"></li>
        <li v-html="t('rules.general.feedingPriority.vp')"></li>
        <li v-html="t('rules.general.feedingPriority.reputation')"></li>
      </ol>
      <h5 v-html="t('rules.general.resolvingChoices.title')"></h5>
      <p v-html="t('rules.general.resolvingChoices.intro')"></p>
      <ol>
        <li v-html="t('rules.general.resolvingChoices.vp')"></li>
        <li v-html="t('rules.general.resolvingChoices.removeScandal')"></li>
        <li v-html="t('rules.general.resolvingChoices.credits')"></li>
        <li v-html="t('rules.general.resolvingChoices.dnaCards')"></li>
        <li v-html="t('rules.general.resolvingChoices.manipulationCards')"></li>
        <li v-html="t('rules.general.resolvingChoices.refinedDNAToken')"></li>
        <li v-html="t('rules.general.resolvingChoices.gainScandal')"></li>
        <li v-html="t('rules.general.resolvingChoices.rampageCheck')"></li>
      </ol>
      <h5 v-html="t('rules.general.rampageChoice.title')"></h5>
      <p v-html="t('rules.general.rampageChoice.affectedDino.intro')"></p>
      <ol>
        <li v-html="t('rules.general.rampageChoice.affectedDino.lowestSeasonalVP')"></li>
        <li v-html="t('rules.general.rampageChoice.affectedDino.lowestReputation')"></li>
        <li v-html="t('rules.general.rampageChoice.affectedDino.speciesSelection')"></li>
      </ol>
      <p v-html="t('rules.general.rampageChoice.parkStructure.intro')"></p>
      <ol>
        <li v-html="t('rules.general.rampageChoice.parkStructure.lowestSeasonalVP')"></li>
        <li v-html="t('rules.general.rampageChoice.parkStructure.emptyHotels')"></li>
        <li v-html="t('rules.general.rampageChoice.parkStructure.otherCommercialFacilities')"></li>
        <li v-html="t('rules.general.rampageChoice.parkStructure.parkFacilities')"></li>
        <li v-html="t('rules.general.rampageChoice.parkStructure.occupiedHotels')"></li>
      </ol>
      <p v-html="t('rules.general.rampageChoice.parkStructure.prioritize')"></p>
      <h5 v-html="t('rules.general.speciesSelection.title')"></h5>
      <div>
        <button class="btn btn-secondary btn-sm me-1 mt-1 d-inline-flex align-items-center" v-for="bot of bots" :key="bot.corporation" @click="getDinoHints(bot)">
          {{t('rules.general.speciesSelection.getDinoHints')}}
          <AppIcon type="corporation" :name="bot.corporation" class="corporation"/>
        </button>
        <ul class="mt-1 speciesSelectionResult">
          <li v-for="dinosaur of dinosaurs" :key="dinosaur" class="dinosaur">{{dinosaur}}</li>
        </ul>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import AppIcon from '../structure/AppIcon.vue'
import isDinosaurAvailable from '@/util/isDinosaurAvailable'

export default defineComponent({
  name: 'GeneralRulesModal',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      dinosaurs: undefined as string[]|undefined
    }
  },
  computed: {
    bots() : Bot[] {
      return this.navigationState.bots
    }
  },
  methods: {
    getDinoHints(bot : Bot) : void {
      const nextCard = bot.cardDeck.draw()
      this.dinosaurs = nextCard.dinosaurs.filter(item => isDinosaurAvailable(item, this.navigationState.modules))
      if (this.dinosaurs.length === 0) {
        // may happen if several expansions/modules are not in play
        this.getDinoHints(bot)
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.corporation {
  height: 2rem;
  margin-left: 0.5rem;
}
.dinosaur {
  text-transform: capitalize;
}
.speciesSelectionResult {
  min-height: 3rem;
}
</style>