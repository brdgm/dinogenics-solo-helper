<template>
  <ModalDialog id="facilitiesHabitatsModal" :size-xl="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.facilitiesHabitats.title')">
    <template #body>
      <img src="@/assets/rules/facilities-habitats.jpg" alt="" class="rules-image mb-2"/>
      <p v-html="t('rules.facilitiesHabitats.intro')"></p>
      <ul>
        <li v-html="t('rules.facilitiesHabitats.newDinosaurs')"></li>
        <li v-html="t('rules.facilitiesHabitats.facilities')"></li>
        <li v-html="t('rules.facilitiesHabitats.largeFacilities')"></li>
        <li v-html="t('rules.facilitiesHabitats.commercialFacilities')"></li>
        <li v-html="t('rules.facilitiesHabitats.largeCommercialFacilities')"></li>
      </ul>
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
  max-width: 650px;
}
</style>
