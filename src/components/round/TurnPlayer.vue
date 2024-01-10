<template>
  <div class="row mt-4">
    <div class="col-12">
      <p v-if="advancedRuleChange" class="alert alert-warning fst-italic" v-html="t(`ruleChange.${advancedRuleChange}`)"></p>
    </div>
  </div>

  <p class="mt-4" v-html="t('turnPlayer.takeYourTurn')"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="$emit('next')">
    {{t('action.next')}}
  </button>
</template>

<script lang="ts">
import Module from '@/services/enum/Module'
import RuleChange from '@/services/enum/RuleChange'
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
  },
  computed: {
    advancedRuleChange() : RuleChange|undefined {
      if (!this.navigationState.modules.includes(Module.DINO_ADVANCED)) {
        return undefined
      }
      // use rule change only from first bot
      return this.navigationState.bots[0]?.cardDeck.currentCard?.ruleChange ?? RuleChange.NONE
    }
  }
})
</script>
