<template>
  <div>
    <button class="btn btn-sm btn-secondary mb-3 me-1" data-bs-toggle="collapse" :data-bs-target="`#rules-${id}`" @click="showRules = !showRules">
      {{t(`locationRulesCollapse.${showRules ? 'hideRules' : 'showRules'}`)}}
    </button>
    <button v-if="dnaCollection" class="btn btn-secondary btn-sm mb-3 me-1" data-bs-toggle="modal" href="#dnaCollectionModal">{{t('rules.dnaCollection.title')}}</button>
    <button v-if="facilitiesHabitats" class="btn btn-secondary btn-sm mb-3 me-1" data-bs-toggle="modal" href="#facilitiesHabitatsModal">{{t('rules.facilitiesHabitats.title')}}</button>
    <button v-if="manipulationCards" class="btn btn-secondary btn-sm mb-3 me-1" data-bs-toggle="modal" href="#manipulationCardsModal">{{t('rules.manipulationCard.title')}}</button>
    <div class="collapse" :id="`rules-${id}`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { uniqueId } from 'lodash'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LocationRulesCollapse',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    dnaCollection: {
      type: Boolean,
      required: false
    },
    facilitiesHabitats: {
      type: Boolean,
      required: false
    },
    manipulationCards: {
      type: Boolean,
      required: false
    },
  },
  computed: {
    id() : string {
      return uniqueId()
    }
  },
  data() {
    return {
      showRules: false
    }
  }
})
</script>
