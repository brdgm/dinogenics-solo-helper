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
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'GeneralRulesModal',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
