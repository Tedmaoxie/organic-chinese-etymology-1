
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface FunctionalGroup {
  id: string
  name: string
  pinyin: string
  english: string
  formula: string
  smiles: string
  color: string // For UI theme
  etymology: {
    type: string
    description: string
    academic_source: string
  }
  history: Array<{
    year: number
    author: string
    name: string
    description: string
  }>
  evolution_stages: Array<{
    stage: string
    path: string // SVG path or placeholder
  }>
}

export const useChemicalStore = defineStore('chemical', () => {
  const currentGroup = ref<FunctionalGroup | null>(null)
  const is3DLoaded = ref(false)
  const highlightedAtoms = ref<number[]>([])
  const isAudioPlaying = ref(false)

  // Example data (will be populated fully later)
  const functionalGroups = ref<FunctionalGroup[]>([])

  const setGroup = (group: FunctionalGroup) => {
    currentGroup.value = group
    highlightedAtoms.value = [] // Reset highlights
  }

  const setHighlight = (atomIndices: number[]) => {
    highlightedAtoms.value = atomIndices
  }

  return {
    currentGroup,
    is3DLoaded,
    highlightedAtoms,
    isAudioPlaying,
    functionalGroups,
    setGroup,
    setHighlight
  }
})
