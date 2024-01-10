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
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'BreakingNewsModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      cards: [
        '26',
        '27',
        '29',
        'D1',
        'C01',
        'C02',
        'C03',
        'C04',
        'C05'
      ]
    }
  }
})
</script>
