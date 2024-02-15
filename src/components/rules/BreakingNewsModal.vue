<template>
  <ModalDialog id="breakingNewsModal" :size-lg="true" :scrollable="true"
      :title="t('rules.breakingNews.title')">
    <template #body>
      <ul>
        <li v-for="card of cards" :key="card">
          <b>{{card}}: </b>
          <span v-html="t(`rules.breakingNews.${card}`)"></span>
        </li>
      </ul>
      <h5 v-html="t('rules.breakingNews.corruptedTRex.title')"></h5>
      <p v-html="t('rules.breakingNews.corruptedTRex.intro')"></p>
      <ul>
        <li v-html="t('rules.breakingNews.corruptedTRex.dnaAction')"></li>
        <li v-html="t('rules.breakingNews.corruptedTRex.cityCenter')"></li>
        <li v-html="t('rules.breakingNews.corruptedTRex.placeTRex')"></li>
      </ul>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStateStore } from '@/store/state'
import Module from '@/services/enum/Module'

export default defineComponent({
  name: 'BreakingNewsModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasControlledChaosExpansion() : boolean {
      return this.state.setup.modules.includes(Module.CONTROLLED_CHAOS)
    },
    hasChaosTheoryModule() : boolean {
      return this.state.setup.modules.includes(Module.CONTROLLED_CHAOS_CHAOS_THEORY)
    },
    cards() : string[] {
      const cards = [
        '26',
        '27',
        '29',
        '30',
        '33'
      ]
      if (this.hasControlledChaosExpansion) {
        cards.push(
          'D1',
          'D3'
        )
      }
      if (this.hasChaosTheoryModule) {
        cards.push(
          'C01',
          'C02',
          'C03',
          'C04',
          'C05'
        )
      }
      return cards
    }
  }
})
</script>
