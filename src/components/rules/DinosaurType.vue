<template>
  <template v-if="carnivoreGoats != undefined">
    <span>{{t('rules.dinosaur.carnivore')}}</span>
    <span v-if="carnivoreGoats > 0">: </span>
    <span v-for="goat of carnivoreGoats" :key="goat">🐐</span>
  </template>
  <template v-else-if="omnivore">
    <span>{{t('rules.dinosaur.omnivore')}}</span>
  </template>
  <template v-else>
    <span>{{t('rules.dinosaur.herbivore')}}</span>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DinosaurType',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    carnivoreGoats: {
      type: Number,
      required: false
    },
    omnivore: {
      type: Boolean,
      required: false
    }
  }
})
</script>
