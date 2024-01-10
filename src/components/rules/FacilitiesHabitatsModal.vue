<template>
  <ModalDialog id="facilitiesHabitatsModal" :size-xl="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.facilitiesHabitats.title')">
    <template #body>
      <p v-html="t('rules.facilitiesHabitats.1')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'FacilitiesHabitatsModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.rules-image {
  width: 100%;
  max-width: 700px;
}
</style>
