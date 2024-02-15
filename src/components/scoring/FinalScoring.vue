<template>  
  <table aria-describedby="headlineFinalScoring">
    <thead>
      <tr>
        <th scope="col">
          <h4 id="headlineFinalScoring" class="mt-3">{{t('endOfGame.resources.title')}}</h4>
        </th>
        <th scope="col" v-for="player in totalPlayerCount" :key="player">
          <AppIcon type="corporation" :name="playerCorporations[player-1]" class="corporation"/>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          {{t('endOfGame.resources.credits')}}
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="resourcesCredits[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreCredits" type="number" min="0" max="99" step="1" v-model="resourcesCredits[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.resources.dnaCards')}}
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="resourcesDNACards[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreDNACards" type="number" min="0" max="99" step="1" v-model="resourcesDNACards[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr v-if="botScoreExtraRemainingStuff">
        <th scope="row">
          {{t('endOfGame.resources.remainingStuff')}}
        </th>
        <td v-for="player in playerCount" :key="player"></td>
        <td v-for="bot in botCount" :key="bot">
          <input type="number" min="0" max="99" step="1" v-model="resourcesRemainingStuff[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.resources.dinosaurSpecies')}}
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="dinosaurSpecies[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input v-if="botScoreDinosaurVariety" type="number" min="0" max="99" step="1" v-model="dinosaurSpecies[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr v-if="botScoreExtraDinosaursCreated">
        <th scope="row">
          {{t('endOfGame.resources.dinosaurCreated')}}
        </th>
        <td v-for="player in playerCount" :key="player"></td>
        <td v-for="bot in botCount" :key="bot">
          <input type="number" min="0" max="99" step="1" v-model="dinosaurCreated[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.resources.scandalTokens')}}
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="99" step="1" v-model="scandalTokens[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input type="number" min="0" max="99" step="1" v-model="scandalTokens[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
      <tr v-if="hasControlledChaos">
        <th scope="row">
          {{t('endOfGame.resources.financialAdvisor')}}
          <div class="d-inline-flex"><label><input type="radio" v-model="financialAdvisorPlayerIndex" :value="undefined"/>{{t('endOfGame.resources.financialAdvisorNone')}}</label></div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="radio" v-model="financialAdvisorPlayerIndex" :value="player-1"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input type="radio" v-model="financialAdvisorPlayerIndex" :value="playerCount+bot-1"/>
        </td>
      </tr>
    </tbody>
    <thead>
      <tr>
        <th scope="col">
          <h4 id="headlineFinalScoring" class="mt-3">{{t('endOfGame.scoring.title')}}</h4>
        </th>
        <th scope="col" v-for="player in totalPlayerCount" :key="player">
          <AppIcon type="corporation" :name="playerCorporations[player-1]" class="corporation"/>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpGameBoard')}}
          <div class="description">{{t('endOfGame.scoring.vpGameBoardDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          <input type="number" min="0" max="999" step="1" v-model="vpGameBoard[player-1]" @focus="inputSelectAll"/>
        </td>
        <td v-for="bot in botCount" :key="bot">
          <input type="number" min="0" max="999" step="1" v-model="vpGameBoard[playerCount+bot-1]" @focus="inputSelectAll"/>
        </td>
      </tr>
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
          <div class="description text-danger" v-if="financialAdvisorPlayerIndex != undefined">{{t('endOfGame.scoring.vpSpecialistsIgnoreFinancialAdvisor')}}</div>
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
          {{vpDinosaurVariety[player-1]}}
        </td>
        <td v-for="bot in botCount" :key="bot">
          {{vpDinosaurVariety[playerCount+bot-1]}}
        </td>
      </tr>
      <tr v-if="botScoreExtraDinosaursCreated">
        <th scope="row">
          {{t('endOfGame.scoring.vpDinosaurCreated')}}
          <div class="description">{{t('endOfGame.scoring.vpDinosaurCreatedDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player"></td>
        <td v-for="bot in botCount" :key="bot">
          {{vpDinosaurCreated[playerCount+bot-1]}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpCredits')}}
          <div class="description">{{t('endOfGame.scoring.vpCreditsDescription')}}</div>
          <div class="description" v-if="hasFinancialAdvisorPlayer">{{t('endOfGame.scoring.vpCreditsFinancialAdvisorPlayer')}}</div>
          <div class="description" v-if="hasFinancialAdvisorBot">{{t('endOfGame.scoring.vpCreditsFinancialAdvisorBot')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          {{vpCredits[player-1]}}
        </td>
        <td v-for="bot in botCount" :key="bot">
          {{vpCredits[playerCount+bot-1]}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpDNACards')}}
          <div class="description">{{t('endOfGame.scoring.vpDNACardsDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          {{vpDNACards[player-1]}}
        </td>
        <td v-for="bot in botCount" :key="bot">
          {{vpDNACards[playerCount+bot-1]}}
        </td>
      </tr>
      <tr v-if="botScoreExtraRemainingStuff">
        <th scope="row">
          {{t('endOfGame.scoring.vpRemainingStuff')}}
          <div class="description">{{t('endOfGame.scoring.vpRemainingStuffDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player"></td>
        <td v-for="bot in botCount" :key="bot">
          {{vpRemainingStuff[playerCount+bot-1]}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.vpScandals')}}
          <div class="description">{{t('endOfGame.scoring.vpScandalsDescription')}}</div>
        </th>
        <td v-for="player in playerCount" :key="player">
          {{vpScandals[player-1]}}
        </td>
        <td v-for="bot in botCount" :key="bot">
          {{vpScandals[playerCount+bot-1]}}
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
      resourcesCredits: [] as number[],
      resourcesDNACards: [] as number[],
      resourcesRemainingStuff: [] as number[],
      dinosaurSpecies: [] as number[],
      dinosaurCreated: [] as number[],
      scandalTokens: [] as number[],
      financialAdvisorPlayerIndex : undefined as number|undefined,
      vpGameBoard: [] as number[],
      vpFacilities: [] as number[],
      vpSpecialists: [] as number[]
    }
  },
  computed: {
    hasControlledChaos() : boolean {
      return this.navigationState.hasControlledChaos
    },
    totalPlayerCount() : number {
      return this.playerCount + this.botCount
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
    hasFinancialAdvisorPlayer() : boolean {
      if (this.financialAdvisorPlayerIndex != undefined) {
        return this.financialAdvisorPlayerIndex >= 0 && this.financialAdvisorPlayerIndex < this.playerCount
      }
      return false
    },
    hasFinancialAdvisorBot() : boolean {
      if (this.financialAdvisorPlayerIndex != undefined) {
        return this.financialAdvisorPlayerIndex >= this.playerCount && this.financialAdvisorPlayerIndex < this.totalPlayerCount
      }
      return false
    },
    vpDinosaurVariety() : number[] {
      const result : number[] = []
      for (let i=0; i<this.totalPlayerCount; i++) {
        result[i] = this.toNumber(this.dinosaurSpecies[i], i, this.botScoreDinosaurVariety) * 3
      }
      return result
    },
    vpDinosaurCreated() : number[] {
      const result : number[] = []
      for (let i=0; i<this.playerCount; i++) {
        result[i] = 0
      }
      for (let i=0; i<this.botCount; i++) {
        const index = this.playerCount + i
        result[index] = this.toNumber(this.dinosaurCreated[index], index, this.botScoreExtraDinosaursCreated) * 2
      }
      return result
    },
    vpCredits() : number[] {
      const result : number[] = []
      for (let i=0; i<this.playerCount; i++) {
        const credits = this.toNumber(this.resourcesCredits[i], i, this.botScoreCredits)
        if (i == this.financialAdvisorPlayerIndex) {
          result[i] = Math.floor(credits / 2)
        }
        else {
          result[i] = Math.floor(credits / 3)
        }
      }
      for (let i=0; i<this.botCount; i++) {
        const index = this.playerCount + i
        let credits = this.toNumber(this.resourcesCredits[index], index, this.botScoreCredits)
        if (index == this.financialAdvisorPlayerIndex) {
          if (credits >= 10) {
            result[index] = 5
            credits = credits - 10
          }
          else {
            result[index] = 0
          }
          result[index] += Math.floor(credits / 3)
        }
        else {
          result[index] = Math.floor(credits / 3)
        }
      }
      return result
    },
    vpDNACards() : number[] {
      const result : number[] = []
      for (let i=0; i<this.totalPlayerCount; i++) {
        result[i] = Math.floor(this.toNumber(this.resourcesDNACards[i], i, this.botScoreDNACards) / 2)
      }
      return result
    },
    vpRemainingStuff() : number[] {
      const result : number[] = []
      for (let i=0; i<this.playerCount; i++) {
        result[i] = 0
      }
      for (let i=0; i<this.botCount; i++) {
        const index = this.playerCount + i
        result[index] = this.toNumber(this.resourcesRemainingStuff[index], index, this.botScoreExtraRemainingStuff)
      }
      return result
    },
    vpScandals() : number[] {
      const result : number[] = []
      for (let i=0; i<this.totalPlayerCount; i++) {
        result[i] = this.toNumber(this.scandalTokens[i], i) * -6
      }
      return result
    },
    vpTotal() : number[] {
      const result : number[] = []
      for (let i=0; i<this.totalPlayerCount; i++) {
        result[i] = this.toNumber(this.vpGameBoard[i], i)
            + this.toNumber(this.vpFacilities[i], i, this.botScoreFacilities)
            + this.toNumber(this.vpSpecialists[i], i, this.botScoreSpecialists)
            + this.vpDinosaurVariety[i]
            + this.vpDinosaurCreated[i]
            + this.vpCredits[i]
            + this.vpDNACards[i]
            + this.vpRemainingStuff[i]
            + this.vpScandals[i]
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
  max-width: 50rem;
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
input[type=radio] {
  width: 1.5rem;
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
