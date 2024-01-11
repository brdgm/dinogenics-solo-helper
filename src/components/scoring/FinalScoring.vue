<template>  
  <table aria-describedby="headlineFinalScoring">
    <thead>
      <tr>
        <th scope="col">
          <h3 id="headlineFinalScoring" class="mt-3">{{t('endOfGame.scoring.title')}}</h3>
        </th>
        <th scope="col" v-for="player in playerCount+botCount" :key="player">
          <AppIcon type="corporation" :name="playerCorporations[player]" class="corporation"/>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpFacilities')}}
          <div class="description">{{t('endOfGame.scoring.vpFacilitiesDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="vpFacilities[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreFacilities" type="number" min="0" max="99" step="1" v-model="vpFacilities[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr v-if="hasControlledChaos">
        <th scope="row">
          {{t('endOfGame.scoring.vpSpecialists')}}
          <div class="description">{{t('endOfGame.scoring.vpSpecialistsDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="vpSpecialists[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreSpecialists" type="number" min="0" max="99" step="1" v-model="vpSpecialists[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpDinosaurVariety')}}
          <div class="description">{{t('endOfGame.scoring.vpDinosaurVarietyDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="3" v-model="vpDinosaurVariety[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreDinosaurVariety" type="number" min="0" max="99" step="3" v-model="vpDinosaurVariety[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpCredits')}}
          <div class="description">{{t('endOfGame.scoring.vpCreditsDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="vpCredits[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreCredits" type="number" min="0" max="99" step="1" v-model="vpCredits[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpDNACards')}}
          <div class="description">{{t('endOfGame.scoring.vpDNACardsDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="vpDNACards[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreDNACards" type="number" min="0" max="99" step="1" v-model="vpDNACards[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpScandals')}}
          <div class="description">{{t('endOfGame.scoring.vpScandalsDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="-96" max="0" step="6" v-model="vpScandals[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input type="number" min="-96" max="0" step="6" v-model="vpScandals[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr v-if="botScoreExtra">
        <th scope="row">
          {{t('endOfGame.scoring.vpExtra')}}
          <div class="description">{{t('endOfGame.scoring.vpExtraDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player"></td>
        <td v-for="bot in botCount" :key="bot">
          <input type="number" min="0" max="99" step="1" v-model="vpExtra[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr class="total">
        <th scope="row">
          {{t('endOfGame.scoring.vpTotal')}}
        </th>
        <td v-for="player in playerCount" :key="player">
          {{vpTotal[player-1]}}
        </td>
        <td v-for="bot in botCount" :key="bot">
          {{vpTotal[playerCount+bot-1]}}
        </td>
      </tr>
    </tbody>
  </table>

  <div v-if="botScoreExtra" class="mt-3">
    <p v-html="t('endOfGame.scoring.extraVP.title')"></p>
    <ul>
      <li v-if="botScoreExtraFinancialAdvisor" v-html="t('endOfGame.scoring.extraVP.financialAdvisor')"></li>
      <li v-if="botScoreExtraRemainingStuff" v-html="t('endOfGame.scoring.extraVP.remainingStuff')"></li>
      <li v-if="botScoreExtraDinosaursCreated" v-html="t('endOfGame.scoring.extraVP.dinosaursCreated')"></li>
    </ul>
  </div>

  <p class="mt-3" v-html="t('endOfGame.scoring.determineWinner')"></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateStore } from '@/store/state'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { playerCount, botCount, playerCorporations } = state.setup.playerSetup
    return { t, state, playerCount, botCount, playerCorporations }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      vpFacilities: [] as number[],
      vpSpecialists: [] as number[],
      vpDinosaurVariety: [] as number[],
      vpCredits: [] as number[],
      vpDNACards: [] as number[],
      vpScandals: [] as number[],
      vpExtra: [] as number[]
    }
  },
  computed: {
    hasControlledChaos() : boolean {
      return this.navigationState.hasControlledChaos
    },
    difficultyLevel() : DifficultyLevel {
      return this.state.setup.difficultyLevel
    },
    botScoreFacilities() : boolean {
      return this.difficultyLevel != DifficultyLevel.VERY_EASY && this.difficultyLevel != DifficultyLevel.EASY
    },
    botScoreSpecialists() : boolean {
      return this.difficultyLevel != DifficultyLevel.VERY_EASY && this.difficultyLevel != DifficultyLevel.EASY
    },
    botScoreDinosaurVariety() : boolean {
      return this.difficultyLevel != DifficultyLevel.VERY_EASY && this.difficultyLevel != DifficultyLevel.EASY
    },
    botScoreCredits() : boolean {
      return this.difficultyLevel != DifficultyLevel.VERY_EASY
    },
    botScoreDNACards() : boolean {
      return this.difficultyLevel != DifficultyLevel.VERY_EASY
    },
    botScoreExtra() : boolean {
      return this.botScoreExtraFinancialAdvisor || this.botScoreExtraRemainingStuff || this.botScoreExtraDinosaursCreated
    },
    botScoreExtraFinancialAdvisor() : boolean {
      return this.hasControlledChaos &&
        (this.difficultyLevel == DifficultyLevel.NORMAL || this.difficultyLevel == DifficultyLevel.HARD || this.difficultyLevel == DifficultyLevel.VERY_HARD)
    },
    botScoreExtraRemainingStuff() : boolean {
      return this.difficultyLevel == DifficultyLevel.HARD || this.difficultyLevel == DifficultyLevel.VERY_HARD
    },
    botScoreExtraDinosaursCreated() : boolean {
      return this.difficultyLevel == DifficultyLevel.VERY_HARD
    },
    vpTotal() : number[] {
      const result : number[] = []
      for (let i=0; i<this.playerCount+this.botCount; i++) {
        result[i] = this.toNumber(this.vpFacilities[i], i, this.botScoreFacilities)
            + this.toNumber(this.vpSpecialists[i], i, this.botScoreSpecialists)
            + this.toNumber(this.vpDinosaurVariety[i], i, this.botScoreDinosaurVariety)
            + this.toNumber(this.vpCredits[i], i, this.botScoreCredits)
            + this.toNumber(this.vpDNACards[i], i, this.botScoreDNACards)
            + this.toNumber(this.vpScandals[i], i)
            + this.toNumber(this.vpExtra[i], i, this.botScoreExtra)
      }
      return result
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    },
    toNumber(value : number|undefined, playerIndex : number, scoreBot : boolean = true) {
      if ((this.isBotPlayerIndex(playerIndex) && !scoreBot) || (typeof value == 'string')) {
        return 0
      }
      else {
        return value ?? 0
      }
    },
    isBotPlayerIndex(playerIndex : number) : boolean {
      return playerIndex >= this.playerCount
    }
  }
})
</script>

<style lang="scss" scoped>
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";

.corporation {
  height: 3rem;
}
table {
  width: 100%;
  max-width: 40rem;
}
th, td {
  text-align: center;
  padding: 0.5rem;
  .description {
    font-weight: normal;
    font-size: 0.85rem;
  }
}
th:nth-child(1) {
  text-align: start;
}
tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}
input {
  width: 5rem;
}
tr.total, tbody tr:nth-child(1) {
  border-top: 1px solid #666;
}
tr.total td {
  font-weight: bold;
}

@include media-breakpoint-down(sm) {
  input {
    width: 3rem;
  }
  th, td {
    .description {
      font-size: 0.75rem;
    }
  }
}
</style>
