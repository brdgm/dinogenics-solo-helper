<template>
  <h1>{{t('setup.title')}}</h1>

  <button class="btn btn-primary btn-lg mt-4" @click="setupGame()">
    {{t('action.next')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    setupGame() : void {
      this.state.resetGame()

      this.$router.push('/round/1')
    }
  }
})
</script>
