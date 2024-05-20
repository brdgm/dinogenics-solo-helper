<template>
  <ModalDialog id="speciesSelectionModal" :size-md="true" :scrollable="true"
      :title="t('rules.speciesSelection.title')">
    <template #body>
      <p v-html="t('rules.speciesSelection.intro')"></p>
      <div class="speciesSelection">
        <button class="btn btn-secondary btn-sm me-1 mt-1 d-inline-flex align-items-center" v-for="bot of bots" :key="bot.corporation" @click="getDinoHints(bot)">
          {{t('rules.speciesSelection.getDinoHints')}}
          <AppIcon type="corporation" :name="bot.corporation" class="corporation"/>
        </button>
        <ul class="mt-1 speciesSelectionResult">
          <li v-for="dinosaur of dinosaurs" :key="dinosaur" class="dinosaur">{{dinosaur}}</li>
        </ul>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import NavigationState from '@/util/NavigationState'
import Bot from '@/services/Bot'
import AppIcon from '../structure/AppIcon.vue'
import isDinosaurAvailable from '@/util/isDinosaurAvailable'

export default defineComponent({
  name: 'SpeciesSelectionModal',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      dinosaurs: undefined as string[]|undefined
    }
  },
  computed: {
    bots() : Bot[] {
      return this.navigationState.bots
    }
  },
  methods: {
    getDinoHints(bot : Bot) : void {
      const nextCard = bot.cardDeck.draw()
      this.dinosaurs = nextCard.dinosaurs.filter(item => isDinosaurAvailable(item, this.navigationState.modules))
      if (this.dinosaurs.length === 0) {
        // may happen if several expansions/modules are not in play
        this.getDinoHints(bot)
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.speciesSelection {
  min-height: 8rem;
}
.corporation {
  height: 2rem;
  margin-left: 0.5rem;
}
.dinosaur {
  text-transform: capitalize;
}
.speciesSelectionResult {
  min-height: 3rem;
}
</style>