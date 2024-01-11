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
            <th scope="row"><a data-bs-toggle="collapse" href="#brontosaurusTrait">Brontosaurus</a></th>
            <td><DinosaurType/></td>
            <td>5</td>
            <td>2</td>
            <td>0</td>
            <td>4</td>
          </tr>
          <tr class="collapse" id="brontosaurusTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.brontosaurus')" class="trait"></td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="tyrannosaurus" class="dino"/></td>
            <th scope="row"><a data-bs-toggle="collapse" href="#tyrannosaurusTrait">Tyrannosaurus</a></th>
            <td><DinosaurType :carnivore-goats="2"/></td>
            <td>7</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr class="collapse" id="tyrannosaurusTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.tyrannosaurus')" class="trait"></td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="ankylosaurus" class="dino"/></td>
            <th scope="row"><a data-bs-toggle="collapse" href="#ankylosaurusTrait">Ankylosaurus</a></th>
            <td><DinosaurType/></td>
            <td>4</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr class="collapse" id="ankylosaurusTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.ankylosaurus')" class="trait"></td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="pterodactyl" class="dino"/></td>
            <th scope="row"><a data-bs-toggle="collapse" href="#pterodactylTrait">Pterodactyl</a></th>
            <td><DinosaurType :carnivore-goats="1"/></td>
            <td>5</td>
            <td>4</td>
            <td>1</td>
            <td>3</td>
          </tr>
          <tr class="collapse" id="pterodactylTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.pterodactyl')" class="trait"></td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="stegosaurus" class="dino"/></td>
            <th scope="row"><a data-bs-toggle="collapse" href="#stegosaurusTrait">Stegosaurus</a></th>
            <td><DinosaurType/></td>
            <td>3</td>
            <td>2</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr class="collapse" id="stegosaurusTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.stegosaurus')" class="trait"></td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="raptor" class="dino"/></td>
            <th scope="row"><a data-bs-toggle="collapse" href="#raptorTrait">Raptor</a></th>
            <td><DinosaurType :carnivore-goats="1"/></td>
            <td>4</td>
            <td>2</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr class="collapse" id="raptorTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.raptor')" class="trait"></td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="triceratops" class="dino"/></td>
            <th scope="row"><a data-bs-toggle="collapse" href="#triceratopsTrait">Triceratops</a></th>
            <td><DinosaurType/></td>
            <td>2</td>
            <td>1</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr class="collapse" id="triceratopsTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.triceratops')" class="trait"></td>
          </tr>
          <tr>
            <td><AppIcon type="dinosaur" name="mutant" class="dino"/></td>
            <th scope="row"><a data-bs-toggle="collapse" href="#mutantTrait">Mutant</a></th>
            <td><DinosaurType :omnivore="true"/></td>
            <td>2</td>
            <td>0</td>
            <td>1</td>
            <td>3</td>
          </tr>
          <tr class="collapse" id="mutantTrait">
            <td colspan="8" v-html="t('rules.dinosaur.trait.mutant')" class="trait"></td>
          </tr>
          <template v-if="hasControlledChaos">
            <tr>
              <td><AppIcon type="dinosaur" name="gallimimus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#gallimimusTrait">Gallimimus</a></th>
              <td><DinosaurType :omnivore="true"/></td>
              <td>1</td>
              <td>2</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr class="collapse" id="gallimimusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.gallimimus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="therizinosaurus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#therizinosaurusTrait">Therizinosaurus</a></th>
              <td><DinosaurType/></td>
              <td>3</td>
              <td>1</td>
              <td>1</td>
              <td>3</td>
            </tr> 
            <tr class="collapse" id="therizinosaurusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.therizinosaurus')" class="trait"></td>
            </tr>
          </template>
          <template v-if="hasDinosaurElites">
            <tr>
              <td><AppIcon type="dinosaur" name="parasaurolophus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#parasaurolophusTrait">Parasaurolophus</a></th>
              <td><DinosaurType/></td>
              <td>3</td>
              <td>3</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr class="collapse" id="parasaurolophusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.parasaurolophus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dimetrodon" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#dimetrodonTrait">Dimetrodon</a></th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>1</td>
              <td>3</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr class="collapse" id="dimetrodonTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.dimetrodon')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dreadnoughtus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#dreadnoughtusTrait">Dreadnoughtus</a></th>
              <td><DinosaurType/></td>
              <td>5</td>
              <td>*</td>
              <td>0</td>
              <td>4</td>
            </tr>
            <tr class="collapse" id="dreadnoughtusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.dreadnoughtus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="pachycephalosaurus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#pachycephalosaurusTrait">Pachycephalosaurus</a></th>
              <td><DinosaurType/></td>
              <td>2</td>
              <td>2</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr class="collapse" id="pachycephalosaurusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.pachycephalosaurus')" class="trait"></td>
            </tr>
          </template>
          <template v-if="hasNewArrivals">
            <tr>
              <td><AppIcon type="dinosaur" name="quetzalcoatlus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#quetzalcoatlusTrait">Quetzalcoatlus</a></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="collapse" id="quetzalcoatlusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.quetzalcoatlus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="compsognathus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#compsognathusTrait">Compsognathus</a></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="collapse" id="compsognathusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.compsognathus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="carnotaurus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#carnotaurusTrait">Carnotaurus</a></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="collapse" id="carnotaurusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.carnotaurus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dunkleosteus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#dunkleosteusTrait">Dunkleosteus</a></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="collapse" id="dunkleosteusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.dunkleosteus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="dilophosaurus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#dilophosaurusTrait">Dilophosaurus</a></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="collapse" id="dilophosaurusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.dilophosaurus')" class="trait"></td>
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
              <th scope="row"><a data-bs-toggle="collapse" href="#ichthyosaurTrait">Ichthyosaur</a></th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>5</td>
              <td>1</td>
              <td>1</td>
              <td>3</td>
            </tr>
            <tr class="collapse" id="ichthyosaurTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.ichthyosaur')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="plesiosaurus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#plesiosaurusTrait">Plesiosaurus</a></th>
              <td><DinosaurType :carnivore-goats="0"/></td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr class="collapse" id="plesiosaurusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.plesiosaurus')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="megalodon" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#megalodonTrait">Megalodon</a></th>
              <td><DinosaurType :carnivore-goats="3"/></td>
              <td>6</td>
              <td>4</td>
              <td>2</td>
              <td>4</td>
            </tr>
            <tr class="collapse" id="megalodonTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.megalodon')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="mosasaur" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#mosasaurTrait">Mosasaur</a></th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>2</td>
              <td>3</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr class="collapse" id="mosasaurTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.mosasaur')" class="trait"></td>
            </tr>
            <tr>
              <td><AppIcon type="dinosaur" name="spinosaurus" class="dino"/></td>
              <th scope="row"><a data-bs-toggle="collapse" href="#spinosaurusTrait">Spinosaurus</a></th>
              <td><DinosaurType :carnivore-goats="1"/></td>
              <td>6</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
            <tr class="collapse" id="spinosaurusTrait">
              <td colspan="8" v-html="t('rules.dinosaur.trait.spinosaurus')" class="trait"></td>
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
th:nth-child(1), th:nth-child(2), td:nth-child(1), td:nth-child(3) {
  text-align: start;
}
tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}
tr.total, tbody tr:nth-child(1) {
  border-top: 1px solid #666;
}
</style>
