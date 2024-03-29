<template>
  <div>
    <h6>{{t('roundOpenSeason.determinePlayerOrder.currentItems')}}</h6>
    <div class="player-order">
      <div v-for="corporation in availableItems" :key="corporation" @click="selectItem(corporation)">
        <AppIcon type="corporation" :name="corporation" class="icon"/>
      </div>
    </div>

    <h6>{{t('roundOpenSeason.determinePlayerOrder.newItems')}}</h6>
    <div class="player-order">
      <template v-if="newItems.length === 0">
        <div class="row">
          <div class="col">
            <div class="fst-italic alert alert-primary">{{t('roundOpenSeason.determinePlayerOrder.newItemsSelect')}}</div>
          </div>
        </div>
      </template>
      <div v-else v-for="corporation in newItems" :key="corporation" @click="deselectItem(corporation)">
        <AppIcon type="corporation" :name="corporation" class="icon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Corporation from '@/services/enum/Corporation'
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DeterminePlayerOrder',
  components: {
    AppIcon
  },
  emits: ['newPlayerOrder'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    playerOrder: {
      type: Array as PropType<Corporation[]>,
      required: true
    }
  },
  data() {
    return {
      availableItems: [...this.playerOrder],
      newItems: [] as Corporation[]
    }
  },
  methods: {
    selectItem(corporation: Corporation) {
      this.newItems.push(corporation)
      this.availableItems = this.availableItems.filter(item => item !== corporation)
      this.$emit('newPlayerOrder', this.newItems)
    },
    deselectItem(corporation: Corporation) {
      this.availableItems.push(corporation)
      this.newItems = this.newItems.filter(item => item !== corporation)
      this.$emit('newPlayerOrder', this.newItems)
    }
  }
})
</script>

<style lang="scss" scoped>
.player-order {
  display: flex;
  gap: 10px;
  height: 4.5rem;
  @media (max-width: 600px) {
    height: 3rem;
  }
}
.icon {
  height: 4rem;
  filter: drop-shadow(0.15rem 0.15rem 0.15rem #aaa);
  cursor: pointer;
  @media (max-width: 600px) {
    height: 2.5rem;
  }
}
</style>