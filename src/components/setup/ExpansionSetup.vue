<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-switch" v-for="expansion of expansions" :key="expansion">
        <input class="form-check-input" type="checkbox" :id="`expansion-${expansion}`" :checked="hasExpansion(expansion)" @input="toggleExpansion(expansion)">
        <label class="form-check-label" :for="`expansion-${expansion}`" v-html="t(`setup.expansions.${expansion}`)"></label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Expansion from '@/services/enum/Expansion'
import { useStateStore } from '@/store/state'
import toggleArrayItem from 'brdgm-commons/src/util/array/toggleArrayItem'

export default defineComponent({
  name: 'ExpansionSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    expansions() : Expansion[] {
      return Object.values(Expansion)
    }
  },
  methods: {
    hasExpansion(expansion : Expansion) : boolean {
      return this.state.setup.expansions.includes(expansion)
    },
    toggleExpansion(expansion : Expansion) {
      toggleArrayItem(this.state.setup.expansions, expansion)
    }
  }
})
</script>
