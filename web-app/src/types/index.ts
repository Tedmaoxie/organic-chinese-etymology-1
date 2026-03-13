
export interface Etymology {
  type: string; // e.g., "形声兼会意"
  description: string;
  academic_source: string;
}

export interface HistoryEvent {
  year: number;
  author: string;
  name: string;
  description: string;
}

export interface EvolutionStage {
  stage: string; // "甲骨文", "金文", "小篆", "隶书", "楷书"
  path: string; // SVG path data
}

export interface FunctionalGroup {
  id: string;
  name: string;
  pinyin: string;
  english: string;
  formula: string;
  smiles: string;
  color: string;
  etymology: Etymology;
  history: HistoryEvent[];
  evolution_stages: EvolutionStage[];
}
