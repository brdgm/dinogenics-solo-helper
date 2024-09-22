<template>
  <ModalDialog id="manipulationCardsModal" :size-lg="true" :scrollable="true"
      :title="t('rules.manipulationCard.title')">
    <template #body>
      <ul>
        <li v-for="card of cards" :key="card">
          <b><span v-html="t(`rules.manipulationCard.${card}.title`)"></span>: </b>
          <span v-html="t(`rules.manipulationCard.${card}.description`)"></span>
          <div v-if="['blackAlleyConnections'].includes(card)">
            <DetermineBonusCardBenefit :navigationState="navigationState" :bot="navigationState.currentBot ?? navigationState.bots[0]" :multiple="true"/>
          </div>
          <div v-if="['benefitsPackage','offshoreContractors'].includes(card)">
            <DrawNumber :navigationState="navigationState"/>
          </div>
        </li>
      </ul>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import NavigationState from '@/util/NavigationState'
import DrawNumber from './DrawNumber.vue'
import DetermineBonusCardBenefit from '../round/DetermineBonusCardBenefit.vue'

export default defineComponent({
  name: 'ManipulationCardsModal',
  components: {
    ModalDialog,
    DetermineBonusCardBenefit,
    DrawNumber
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
      cards: [
        'blackAlleyConnections',
        'benefitsPackage',
        'blackMarket',
        'charitableDonation',
        'controlTheNewsCycle',
        'dnaSplice',
        'floodWaterCleanup',
        'foreignMarket',
        'geneticDeconstruction',
        'goatRustling',
        'infiltrator',
        'misdirection',
        'nonZeroSumGame',
        'offshoreContractors',
        'offSiteLocation',
        'pullingTheStrings',
        'rapidGestation',
        'renovation',
        'researchPact',
        'shareholderMeeting',
        'strongArmTheMarket',
        'unleashContagion',
        'whistleBlower'
      ]
    }
  }
})
</script>
