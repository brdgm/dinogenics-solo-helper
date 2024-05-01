<template>
  <ModalDialog id="manipulationCardsModal" :size-lg="true" :scrollable="true"
      :title="t('rules.manipulationCard.title')">
    <template #body>
      <ul>
        <li v-for="card of cards" :key="card">
          <b><span v-html="t(`rules.manipulationCard.${card}.title`)"></span>: </b>
          <span v-html="t(`rules.manipulationCard.${card}.description`)"></span>
          <div v-if="card == 'benefitsPackage' || card == 'offshoreContractors'">
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

export default defineComponent({
  name: 'ManipulationCardsModal',
  components: {
    ModalDialog,
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
        'benefitsPackage',
        'blackMarket',
        'controlTheNewsCycle',
        'dnaSplice',
        'geneticDeconstruction',
        'goatRustling',
        'infiltrator',
        'misdirection',
        'nonZeroSumGame',
        'offshoreContractors',
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
