<template>
  <ModalDialog id="dnaCollectionArrangementModal" :size-xl="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.dnaCollectionArrangement.title')">
    <template #body>
      <img src="@/assets/rules/dna-collection-arrangement.png" alt="" class="rules-image mb-2"/>
      <p v-html="t('rules.dnaCollectionArrangement.setCollection')"></p>
      <p v-html="t('rules.dnaCollectionArrangement.cardOrder')"></p>
      <p v-html="t('rules.dnaCollectionArrangement.noDuplicates')"></p>
      <h6 class="fst-italic">{{t('rules.dnaCollectionArrangement.example.title')}}</h6>
      <img src="@/assets/rules/dna-collection-arrangement-example.jpg" alt="" class="rules-image mb-2"/>
      <p class="fst-italic" v-html="t('rules.dnaCollectionArrangement.example.description')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'DNACollectionArrangementModal',
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
