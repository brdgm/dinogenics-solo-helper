import Location from '@/services/enum/Location';
import Module from '@/services/enum/Module';

/**
 * Checks if the given location is available for the given set of modules.
 * @param location Location
 * @param modules Modules
 * @returns true if location is available
 */
export default function(location: Location, modules: Module[]) : boolean {
  switch (location) {
    case Location.SITE_D:
    case Location.REFINEMENT:
    case Location.INTELLIGEN_DESIGNS_HQ:
      return modules.includes(Module.CONTROLLED_CHAOS)
    default:
      return true
  }
}
