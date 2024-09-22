<template>
  <ModalDialog id="dnaCollectionModal" :size-xl="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.dnaCollection.title')">
    <template #body>
      <h5 v-html="t('rules.dnaCollection.arrangement.title')"></h5>
      <img src="@/assets/rules/dna-collection-arrangement.webp" alt="" class="rules-image mb-2"/>
      <p v-html="t('rules.dnaCollection.arrangement.setCollection')"></p>
      <p v-html="t('rules.dnaCollection.arrangement.cardOrder')"></p>
      <p v-html="t('rules.dnaCollection.arrangement.noDuplicates')"></p>
      <h6 class="fst-italic">{{t('rules.dnaCollection.arrangement.example.title')}}</h6>
      <img src="@/assets/rules/dna-collection-arrangement-example.webp" alt="" class="rules-image mb-2"/>
      <p class="fst-italic" v-html="t('rules.dnaCollection.arrangement.example.description')"></p>
      <h5 v-html="t('rules.dnaCollection.acquiring.title')"></h5>
      <p v-html="t('rules.dnaCollection.acquiring.intro')"></p>
      <ol>
        <li>
          <span v-html="t('rules.dnaCollection.acquiring.matchExisting')"></span>
          <ul>
            <li v-html="t('rules.dnaCollection.acquiring.matchExistingResult')"></li>
          </ul>
        </li>
        <li>
          <span v-html="t('rules.dnaCollection.acquiring.emptyColumn')"></span>
          <ul>
            <li v-html="t('rules.dnaCollection.acquiring.emptyColumnResult')"></li>
          </ul>
        </li>
        <li>
          <span v-html="t('rules.dnaCollection.acquiring.noEmptyColumn')"></span>
          <ul>
            <li v-html="t('rules.dnaCollection.acquiring.noEmptyColumnResult')"></li>
          </ul>
        </li>
        <li>
          <span v-html="t('rules.dnaCollection.acquiring.polymorphicDNA')"></span>
          <ul>
            <li v-html="t('rules.dnaCollection.acquiring.polymorphicDNAResult')"></li>
          </ul>
        </li>
      </ol>
      <p v-html="t('rules.dnaCollection.acquiring.noHandLimit')"></p>
      <h5 v-html="t('rules.dnaCollection.refresh.title')"></h5>
      <p v-html="t('rules.dnaCollection.refresh.intro')"></p>
      <ol>
        <li v-html="t('rules.dnaCollection.refresh.notInPark')"></li>
        <li v-html="t('rules.dnaCollection.refresh.fewestMissingDNA')"></li>
        <li v-html="t('rules.dnaCollection.refresh.hightestDNA')"></li>
        <li v-html="t('rules.dnaCollection.refresh.topmost')"></li>
      </ol>
      <p v-html="t('rules.dnaCollection.refresh.newStack')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'DNACollectionModal',
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
