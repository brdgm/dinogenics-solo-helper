<template>
  <ModalDialog id="dinosaurModal" :size-lg="true" :fullscreen-lg-down="true" :scrollable="true"
      :title="t('rules.dinosaur.title')">
    <template #body>
      <table>
        <thead>
          <tr>
            <th scope="col" colspan="2">{{t('rules.dinosaur.landDinosaur')}}</th>
            <th scope="col">{{t('rules.dinosaur.type')}}</th>
            <th scope="col">{{t('rules.dinosaur.vp')}}</th>
            <th scope="col">{{t('rules.dinosaur.reputation')}}</th>
            <th scope="col">{{t('rules.dinosaur.minPenSize')}}</th>
            <th scope="col">{{t('rules.dinosaur.dnaRequirement')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><AppIcon type="dinosaur" name="brontosaurus" class="dino"/></td>
            <th scope="row">Brontosaurus</th>
            <td><DinosaurType/></td>
            <td>5</td>
            <td>2</td>
            <td>0</td>
            <td>4</td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="tyrannosaurus" class="dino"/></td>
            <th scope="row">Tyrannosaurus</th>
            <td><DinosaurType :carnivore-goats="2"/></td>
            <td>7</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="ankylosaurus" class="dino"/></td>
            <th scope="row">Ankylosaurus</th>
            <td><DinosaurType/></td>
            <td>4</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="pterodactyl" class="dino"/></td>
            <th scope="row">Pterodactyl</th>
            <td><DinosaurType :carnivore-goats="1"/></td>
            <td>5</td>
            <td>4</td>
            <td>1</td>
            <td>3</td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="stegosaurus" class="dino"/></td>
            <th scope="row">Stegosaurus</th>
            <td><DinosaurType/></td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="raptor" class="dino"/></td>
            <th scope="row">Raptor</th>
            <td><DinosaurType :carnivore-goats="1"/></td>
            <td>4</td>
            <td>2</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="triceratops" class="dino"/></td>
            <th scope="row">Triceratops</th>
            <td><DinosaurType/></td>
            <td>2</td>
            <td>1</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="mutant" class="dino"/></td>
            <th scope="row">Mutant</th>
            <td><DinosaurType :omnivore="true"/></td>
            <td>2</td>
            <td>0</td>
            <td>1</td>
            <td>3</td>
          </tr>
          <template v-if="hasControlledChaos">
            <tr>
              <td><AppIcon type="dinosaur" name="gallimimus" class="dino"/></td>
              <th scope="row">Gallimimus</th>
              <td><DinosaurType :omnivore="true"/></td>
              <td>1</td>
              <td>2</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="therizinosaurus" class="dino"/></td>
              <th scope="row">Therizinosaurus</th>
              <td><DinosaurType/></td>
              <td>3</td>
              <td>1</td>
              <td>1</td>
              <td>3</td>
            </tr> 
          </template>
          <template v-if="hasDinosaurElites">
            <tr>
              <td><AppIcon type="dinosaur" name="parasaurolophus" class="dino"/></td>
              <th scope="row">Parasaurolophus</th>
              <td><DinosaurType/></td>
              <td>3</td>
              <td>3</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dimetrodon" class="dino"/></td>
              <th scope="row">Dimetrodon</th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>1</td>
              <td>3</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dreadnoughtus" class="dino"/></td>
              <th scope="row">Dreadnoughtus</th>
              <td><DinosaurType/></td>
              <td>5</td>
              <td>*</td>
              <td>0</td>
              <td>4</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="pachycephalosaurus" class="dino"/></td>
              <th scope="row">Pachycephalosaurus</th>
              <td><DinosaurType/></td>
              <td>2</td>
              <td>2</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </template>
          <template v-if="hasNewArrivals">
            <tr>
              <td><AppIcon type="dinosaur" name="quetzalcoatlus" class="dino"/></td>
              <th scope="row">Quetzalcoatlus</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="compsognathus" class="dino"/></td>
              <th scope="row">Compsognathus</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="carnotaurus" class="dino"/></td>
              <th scope="row">Carnotaurus</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dunkleosteus" class="dino"/></td>
              <th scope="row">Dunkleosteus</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dilophosaurus" class="dino"/></td>
              <th scope="row">Dilophosaurus</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </template>
        </tbody>
        <template v-if="hasControlledChaos">
          <thead>
            <tr>
              <th scope="col" colspan="2">{{t('rules.dinosaur.aquaticDinosaur')}}</th>
              <th scope="col">{{t('rules.dinosaur.type')}}</th>
              <th scope="col">{{t('rules.dinosaur.vp')}}</th>
              <th scope="col">{{t('rules.dinosaur.reputation')}}</th>
              <th scope="col">{{t('rules.dinosaur.aquaticSpaces')}}</th>
              <th scope="col">{{t('rules.dinosaur.dnaRequirement')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><AppIcon type="dinosaur" name="ichthyosaur" class="dino"/></td>
              <th scope="row">Ichthyosaur</th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>5</td>
              <td>1</td>
              <td>1</td>
              <td>3</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="plesiosaurus" class="dino"/></td>
              <th scope="row">Plesiosaurus</th>
              <td><DinosaurType :carnivore-goats="0"/></td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="megalodon" class="dino"/></td>
              <th scope="row">Megalodon</th>
              <td><DinosaurType :carnivore-goats="3"/></td>
              <td>6</td>
              <td>4</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="mosasaur" class="dino"/></td>
              <th scope="row">Mosasaur</th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>2</td>
              <td>3</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="spinosaurus" class="dino"/></td>
              <th scope="row">Spinosaurus</th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>6</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
          </tbody>
        </template>
      </table>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '../structure/AppIcon.vue'
import DinosaurType from './DinosaurType.vue'
import Module from '@/services/enum/Module'

export default defineComponent({
  name: 'DinosaurModal',
  components: {
    ModalDialog,
    AppIcon,
    DinosaurType
},
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const modules = state.setup.modules
    const hasControlledChaos = modules.includes(Module.CONTROLLED_CHAOS)
    const hasDinosaurElites = modules.includes(Module.CONTROLLED_CHAOS_DINOSAUR_ELITES)
    const hasNewArrivals = modules.includes(Module.NEW_ARRIVALS_MINI_EXPANSION)
    return { t, hasControlledChaos, hasDinosaurElites, hasNewArrivals }
  }
})
</script>

<style lang="scss" scoped>
.dino {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}
table {
  width: 100%;
}
th, td {
  text-align: center;
  padding: 0.5rem;
  .description {
    font-weight: normal;
    font-size: 0.85rem;
  }
}
td:nth-child(1) {
  width: 4rem;
  background-color: #fff;
  padding: 0;
}
th:nth-child(1), th:nth-child(2), td:nth-child(3) {
  text-align: start;
}
tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}
tr.total, tbody tr:nth-child(1) {
  border-top: 1px solid #666;
}
</style>
