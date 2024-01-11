<template>
  <div class="sidebar">
    <p>{{t('sideBar.round')}} <strong>{{navigationState.round}}</strong> / 7</p>
    <ul class="rules">
      <li><a data-bs-toggle="modal" href="#generalRulesModal">{{t('rules.general.title')}}</a></li>
      <li><a data-bs-toggle="modal" href="#dnaCollectionModal">{{t('rules.dnaCollection.title')}}</a></li>
      <li><a data-bs-toggle="modal" href="#facilitiesHabitatsModal">{{t('rules.facilitiesHabitats.title')}}</a></li>
      <li><a data-bs-toggle="modal" href="#breakingNewsModal">{{t('rules.breakingNews.title')}}</a></li>
      <li><a data-bs-toggle="modal" href="#manipulationCardsModal">{{t('rules.manipulationCard.title')}}</a></li>
      <li><a data-bs-toggle="modal" href="#specialistsModal">{{t('rules.specialist.title')}}</a></li>
    </ul>
  </div>

  <GeneralRulesModal :navigationState="navigationState"/>
  <DNACollectionModal/>
  <FacilitiesHabitatsModal/>
  <BreakingNewsModal/>
  <ManipulationCardsModal/>
  <SpecialistsModal/>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import GeneralRulesModal from '../rules/GeneralRulesModal.vue'
import DNACollectionModal from '../rules/DNACollectionModal.vue'
import FacilitiesHabitatsModal from '../rules/FacilitiesHabitatsModal.vue'
import BreakingNewsModal from '../rules/BreakingNewsModal.vue'
import ManipulationCardsModal from '../rules/ManipulationCardsModal.vue'
import SpecialistsModal from '../rules/SpecialistsModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    GeneralRulesModal,
    DNACollectionModal,
    FacilitiesHabitatsModal,
    BreakingNewsModal,
    ManipulationCardsModal,
    SpecialistsModal
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
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 160px;
  margin-right: -12px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding-right: 10px;
  @media (max-width: 600px) {
    width: 110px;
  }
}
.rules {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  li {
    margin-bottom: 8px;
    a {
      text-decoration-line: underline;
      text-decoration-style: dotted;
      color: #333;
      font-size: 0.9rem;
      @media (max-width: 600px) {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
