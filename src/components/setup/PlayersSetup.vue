<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-4 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerCount')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="playerCount" v-model="playerCount">
        <option v-for="i in maxPlayerCount" :key="i" :value="i">{{t('setup.players.playerCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="playerCorporationIndex in playerCount" :key="playerCorporationIndex+playerCorporations[playerCorporationIndex-1]">
    <div class="col-4 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerColor', {index:playerCorporationIndex}, playerCount)}}</label>
    </div>
    <div class="col-8 col-md-9">
      <PlayerCorporationPicker :model-value="playerCorporations[playerCorporationIndex-1]" @update:model-value="corporation => playerCorporationChanged(playerCorporationIndex-1, corporation)"/>
    </div>
  </div>  

  <div class="row mt-3">
    <div class="col-4 col-md-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in maxBotCount" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="botColorIndex in botCount" :key="botColorIndex+playerCorporations[playerCount+botColorIndex-1]">
    <div class="col-4 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.botColor', botCount)}}</label>
    </div>
    <div class="col-8 col-md-9">
      <PlayerCorporationPicker :model-value="playerCorporations[playerCount+botColorIndex-1]" @update:model-value="corporation => playerCorporationChanged(playerCount+botColorIndex-1, corporation)"/>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import PlayerCorporationPicker from './PlayerCorporationPicker.vue'
import Corporation from '@/services/enum/Corporation'

export default defineComponent({
  name: 'PlayersSetup',
  components: {
    PlayerCorporationPicker
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const playerCount = ref(state.setup.playerSetup.playerCount)
    const botCount = ref(state.setup.playerSetup.botCount)
    const playerCorporations = ref(state.setup.playerSetup.playerCorporations)

    return { t, state, playerCount, botCount, playerCorporations }
  },
  computed: {
    maxPlayerCount() : number {
      return 5 - this.botCount
    },
    maxBotCount() : number {
      return 5 - this.playerCount
    }
  },
  watch: {
    playerCount() {
      if (this.botCount > this.maxBotCount) {
        this.botCount = this.maxBotCount
      }
      this.storePlayerSetup()
    },
    playerCorporations() {
      this.storePlayerSetup()
    },
    botCount() {
      if (this.playerCount > this.maxPlayerCount) {
        this.playerCount = this.maxPlayerCount
      }
      this.storePlayerSetup()
    }
  },
  methods: {
    storePlayerSetup() {
      this.state.setup.playerSetup = {
        playerCount: this.playerCount,
        botCount: this.botCount,
        playerCorporations: this.playerCorporations
      }
    },
    playerCorporationChanged(index : number, corporation : Corporation) {
      const newPlayerCorporations = [...this.playerCorporations]
      newPlayerCorporations[index] = corporation
      for (let i=0; i<this.playerCorporations.length; i++) {
        if (i!=index && newPlayerCorporations[i]==corporation) {
          const newColor = Object.values(Corporation).find(c => !newPlayerCorporations.includes(c))
          if (newColor) {
            newPlayerCorporations[i] = newColor
          }
        }
      }
      this.playerCorporations = newPlayerCorporations
    }
  }
})
</script>
