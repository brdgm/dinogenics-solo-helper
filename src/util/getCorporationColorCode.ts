import Corporation from '@/services/enum/Corporation'

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(corporation: Corporation) : string {
  switch (corporation) {
    case Corporation.BIOTHESAURI:
      return "#12100b"
    case Corporation.BLUESEA_GENETICS_PLC:
      return "#28bbe2"
    case Corporation.DINO_LIBRE:
      return "#ed6c1a"
    case Corporation.NTEK:
      return "#e1dddc"
    case Corporation.TRAPEZOHEDRON_INCORPORATED:
      return "#ffeb00"
    default:
      throw new Error(`Invalid corporation: ${corporation}.`)
  }
}
