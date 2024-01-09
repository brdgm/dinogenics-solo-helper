<template>
  <ModalDialog id="dnaCollectionArrangementModal" :size-xl="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('dnaCollectionArrangement.title')">
    <template #body>
      <img src="@/assets/dna-collection-arrangement.png" alt="" class="arrangement-image mb-2"/>
      <p v-html="t('dnaCollectionArrangement.setCollection')"></p>
      <p v-html="t('dnaCollectionArrangement.cardOrder')"></p>
      <p v-html="t('dnaCollectionArrangement.noDuplicates')"></p>
      <h6 class="fst-italic">{{t('dnaCollectionArrangement.example.title')}}</h6>
      <img src="@/assets/dna-collection-arrangement-example.jpg" alt="" class="arrangement-image mb-2"/>
      <p class="fst-italic" v-html="t('dnaCollectionArrangement.example.description')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'DNACollectionArrangement',
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
.arrangement-image {
  width: 100%;
  max-width: 700px;
}
</style>
