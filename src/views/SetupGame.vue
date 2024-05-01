<template>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <DifficultyLevel/>
  <ModuleSetup/>

  <RouterLink class="btn btn-primary btn-lg mt-4" to="/setupBot">
    {{t('action.next')}}
  </RouterLink>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import ModuleSetup from '@/components/setup/ModuleSetup.vue'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    PlayersSetup,
    DifficultyLevel,
    ModuleSetup
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
