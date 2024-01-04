<template>
  <svg v-for="corporation in corporations" :key="corporation" width="1.5rem" height="1.5rem" class="color"
      :class="{selected:corporation==selectedCorporation}" @click="selectCorporation(corporation)">
    <rect width="1rem" height="1rem" :style="`fill:${getColorCode(corporation)};'`"/>
  </svg>
</template>

<script lang="ts">
import Corporation from '@/services/enum/Corporation'
import { defineComponent } from 'vue'
import getCorporationColorCode from '@/util/getCorporationColorCode'

export default defineComponent({
  name: 'PlayerCorporationPicker',
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
    getColorCode(corporation : Corporation) : string {
      return getCorporationColorCode(corporation)
    },
    selectCorporation(corporation : Corporation) : void {
      this.selectedCorporation = corporation
      this.$emit('update:modelValue', corporation)
    }
  }
})
</script>
<style lang="scss" scoped>
.color {
  margin-right: 0.5rem;
  border: 4px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  &.selected {
    border: 4px solid #999;
  }
}
</style>
