<template>
  <AppIcon v-for="corporation in corporations" :key="corporation"
      type="corporation" :name="corporation" class="icon"
      :class="{selected:corporation==selectedCorporation}" @click="selectCorporation(corporation)"/>
</template>

<script lang="ts">
import Corporation from '@/services/enum/Corporation'
import { defineComponent } from 'vue'
import getCorporationColorCode from '@/util/getCorporationColorCode'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'PlayerCorporationPicker',
  components: {
    AppIcon
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      corporations: Object.values(Corporation),
      selectedCorporation: this.modelValue
    }
  },
  methods: {
    getColorCode(corporation: Corporation): string {
      return getCorporationColorCode(corporation)
    },
    selectCorporation(corporation: Corporation): void {
      this.selectedCorporation = corporation
      this.$emit('update:modelValue', corporation)
    }
  }    
})
</script>

<style lang="scss" scoped>
.icon {
  width: 3rem;
  margin-right: 0.5rem;
  border: 4px solid transparent;
  border-radius: 1.5rem;
  cursor: pointer;
  &.selected {
    border: 5px solid #f00;
  }
}
</style>
