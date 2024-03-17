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
      <h6>{{t(`rules.facilitiesHabitats.cards.title`)}}</h6>
      <ul>
        <li v-for="card of cards" :key="card">
          <b><span v-html="t(`rules.facilitiesHabitats.cards.${card}.title`)"></span>: </b>
          <span v-html="t(`rules.facilitiesHabitats.cards.${card}.description`)"></span>
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
  name: 'FacilitiesHabitatsModal',
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
        'geneGraftingLab',
        'geneticsFacility'
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.rules-image {
  width: 100%;
  max-width: 650px;
}
</style>
