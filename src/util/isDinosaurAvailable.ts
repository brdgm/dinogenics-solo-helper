import Dinosaur from '@/services/enum/Dinosaur';
import Module from '@/services/enum/Module';

/**
 * Checks if the given dinosaur is available for the given set of modules.
 * @param dinosaur Dinosaur
 * @param modules Modules
 * @returns true if location is available
 */
export default function(dinosaur: Dinosaur, modules: Module[]) : boolean {
  switch (dinosaur) {
    case Dinosaur.GALLIMIMUS:
    case Dinosaur.ICHTHYOSAUR:
    case Dinosaur.THERIZINOSAURUS:
    case Dinosaur.PLESIOSAURUS:
    case Dinosaur.MEGALODON:
    case Dinosaur.MOSASAUR:
    case Dinosaur.SPINOSAURUS:
      return modules.includes(Module.CONTROLLED_CHAOS)
    case Dinosaur.PARASAUROLOPHUS:
    case Dinosaur.DIMETRODON:
    case Dinosaur.DREADNOUGHTUS:
    case Dinosaur.PACHYCEPHALOSAURUS:
      return modules.includes(Module.CONTROLLED_CHAOS_DINOSAUR_ELITES)
    default:
      return true
  }
}
