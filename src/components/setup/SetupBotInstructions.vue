<template>
  <ul>
    <li v-html="t('setupBot.prepareGame', {totalPlayerCount})"></li>
    <li v-html="t('setupBot.workerCount', {workerCount})"></li>
    <li v-html="t('setupBot.botPlayerPieces')"></li>
    <li v-if="hasControlledChaos" v-html="t('setupBot.botDNACardsControlledChaos')"></li>
    <li v-else v-html="t('setupBot.botDNACards')"></li>
    <li>
      <span v-html="t('setupBot.botDNACardArrangement')"></span><br/>
      <button class="btn btn-secondary btn-sm mt-1 mb-2" data-bs-toggle="modal" data-bs-target="#dnaCollectionModal">
        {{t('rules.dnaCollection.title')}}
      </button>
    </li>
    <li v-html="t('setupBot.botTurnOrder')"></li>
  </ul>

  <DNACollectionModal/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Module from '@/services/enum/Module'
import DNACollectionModal from '../rules/DNACollectionModal.vue'
import getWorkerCount from '@/util/getWorkerCount'

export default defineComponent({
  name: 'SetupBotInstructions',
  components: {
    DNACollectionModal
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    totalPlayerCount(): number {
      return this.state.setup.playerSetup.playerCount + this.state.setup.playerSetup.botCount
    },
    hasControlledChaos(): boolean {
      return this.state.setup.modules.includes(Module.CONTROLLED_CHAOS)
    },
    workerCount() {
      return getWorkerCount(1, this.totalPlayerCount)
    }
  }
})
</script>
