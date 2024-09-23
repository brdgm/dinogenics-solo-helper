<template>
  <ModalDialog id="manipulationCardsModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.manipulationCard.title')">
    <template #body>
      <ul>
        <li v-for="card of cards" :key="card">
          <b><span v-html="t(`rules.manipulationCard.${card}.title`)"></span>: </b>
          <span v-html="t(`rules.manipulationCard.${card}.description`)"></span>
          <div v-if="['blackAlleyConnections'].includes(card)">
            <DetermineBonusCardBenefit :navigationState="navigationState" :bot="bot" :multiple="true"/>
          </div>
          <div v-if="['floodWaterCleanup','misdirection','pullingTheStrings'].includes(card)">
            <Determine4ActionLocations :navigationState="navigationState" :bot="bot"/>
          </div>
          <div v-if="['benefitsPackage','offshoreContractors','offSiteLocation','renovation'].includes(card)">
            <DrawNumber :navigationState="navigationState"/>
          </div>
          <div v-if="['foreignMarket'].includes(card)">
            <button v-if="!showIntelligen" class="btn btn-secondary btn-sm" @click="showIntelligen=true">{{t('location.intelligen-designs-hq.title')}}</button>
            <div v-else class="card text-bg-light mb-3">
              <div class="card-body">
                <LocationIntelligenDesignsHq :navigationState="navigationState" :bot="bot"/>
              </div>
            </div>
          </div>
          <div v-if="['infiltrator'].includes(card)">
            <button v-if="!showInfiltratorActions" class="btn btn-secondary btn-sm" @click="showInfiltratorActions=true">{{t(`rules.manipulationCard.${card}.title`)}}</button>
            <div v-else class="card text-bg-light mb-3">
              <div class="card-body">
                <ManipulationCardInfiltratorActions :navigationState="navigationState" :bot="bot"/>
              </div>
            </div>
          </div>
          <div v-if="['strongArmTheMarket'].includes(card)">
            <button v-if="!showCityCenter" class="btn btn-secondary btn-sm" @click="showCityCenter=true">{{t('location.city-center.title')}}</button>
            <div v-else class="card text-bg-light mb-3">
              <div class="card-body">
                <LocationCityCenter :navigationState="navigationState" :bot="bot" :determineFacilityRepeatable="true"/>
              </div>
            </div>
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
import DetermineBonusCardBenefit from '../round/DetermineBonusCardBenefit.vue'
import Determine4ActionLocations from '../round/Determine4ActionLocations.vue'
import DrawNumber from './DrawNumber.vue'
import Bot from '@/services/Bot'
import LocationIntelligenDesignsHq from '../round/location/LocationIntelligenDesignsHq.vue'
import LocationCityCenter from '../round/location/LocationCityCenter.vue'
import ManipulationCardInfiltratorActions from '../round/ManipulationCardInfiltratorActions.vue'

export default defineComponent({
  name: 'ManipulationCardsModal',
  components: {
    ModalDialog,
    DetermineBonusCardBenefit,
    Determine4ActionLocations,
    DrawNumber,
    LocationIntelligenDesignsHq,
    LocationCityCenter,
    ManipulationCardInfiltratorActions
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
  computed: {
    bot() : Bot {
      return this.navigationState.currentBot ?? this.navigationState.bots[0] 
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
      ],
      showIntelligen: false,
      showCityCenter: false,
      showInfiltratorActions: false
    }
  }
})
</script>

<style lang="scss" scoped>
ul > li {
  margin-top: 0.5rem;
}
</style>
