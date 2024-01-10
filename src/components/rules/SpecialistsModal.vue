<template>
  <ModalDialog id="specialistsModal" :size-lg="true" :scrollable="true"
      :title="t('rules.specialist.title')">
    <template #body>
      <ul>
        <li v-for="card of cards" :key="card">
          <b><span v-html="t(`rules.specialist.${card}.title`)"></span>: </b>
          <span v-html="t(`rules.specialist.${card}.description`)"></span>
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
  name: 'SpecialistsModal',
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
        'chaotician',
        'financialAdvisor',
        'masterArchitect',
        'securityOfficer',
        'seismologist'
      ]
    }
  }
})
</script>
