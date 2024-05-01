<template>
  <h3 class="mt-4 mb-3">{{t('setup.modules.title')}}</h3>
  <div class="row">
    <div class="col">
      <div class="form-check form-switch" v-for="item of modules" :key="item">
        <input class="form-check-input" type="checkbox" :id="`expansion-${item}`" :checked="hasModule(item)" @input="toggleModule(item)">
        <label class="form-check-label" :for="`expansion-${item}`" v-html="t(`setup.modules.${item}`)"></label>
      </div>
    </div>
  </div>
  <div class="alert alert-warning mt-3" v-if="!hasControlledChaos" v-html="t('setup.modules.noControlledChaosWarning')"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Module from '@/services/enum/Module'
import { useStateStore } from '@/store/state'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'

export default defineComponent({
  name: 'ModuleSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    modules() : Module[] {
      return Object.values(Module)
    },
    hasControlledChaos() : boolean {
      return this.state.setup.modules.includes(Module.CONTROLLED_CHAOS)
    }
  },
  methods: {
    hasModule(module : Module) : boolean {
      return this.state.setup.modules.includes(module)
    },
    toggleModule(module : Module) {
      toggleArrayItem(this.state.setup.modules, module)
    }
  }
})
</script>
