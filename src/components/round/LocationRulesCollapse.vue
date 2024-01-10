<template>
  <div>
    <button class="btn btn-sm btn-secondary mb-3" data-bs-toggle="collapse" :data-bs-target="`#rules-${id}`" @click="showRules = !showRules">
      {{t(`locationRulesCollapse.${showRules ? 'hideRules' : 'showRules'}`)}}
    </button>
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
