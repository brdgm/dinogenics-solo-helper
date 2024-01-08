<template>
  <p class="mt-4" v-html="t('turnPlayer.takeYourTurn')"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="$emit('next')">
    {{t('action.next')}}
  </button>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'TurnPlayer',
  emits: ['next'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  }
})
</script>
