<template>
  <ul>
    <li v-for="(corporation,index) of playerOrder" :key="corporation">
      <AppIcon type="corporation" :name="corporation" class="icon"/>
      <span>: </span>
      <span v-html="t('roundOpenSeason.assignVisitorCount', {visitorCount:visitorCount[index], bonusVisitorTakeCount:bonusVisitorTakeCount[index], bonusVisitorCount})"></span>
    </li>
  </ul>
</template>

<script lang="ts">
import Corporation from '@/services/enum/Corporation'
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { useI18n } from 'vue-i18n'
import getVisitorCount from '@/util/getVisitorCount'
import getBonusVisitorCount from '@/util/getBonusVisitorCount'

export default defineComponent({
  name: 'AssignVisitors',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    playerOrder: {
      type: Array as PropType<Corporation[]>,
      required: true
    },
    round: {
      type: Number,
      required: true
    }
  },
  computed: {
    playerCount() : number {
      return this.playerOrder.length
    },
    visitorCount() : number[] {
      const result : number[] = []
      for (let i = 0; i < this.playerCount; i++) {
        result.push(getVisitorCount(this.round, i, this.playerCount))
      }
      return result
    },
    bonusVisitorTakeCount() : number[] {
      const result : number[] = []
      for (let i = 0; i < this.playerCount; i++) {
        if (i == 0) {
          result.push(2)
        }
        else {
          result.push(1)
        }
      }
      return result
    },
    bonusVisitorCount() : number {
      return getBonusVisitorCount(this.round)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 2rem;
  margin-bottom: 0.25rem;
}
</style>