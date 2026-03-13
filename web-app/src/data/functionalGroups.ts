
import type { FunctionalGroup } from '../types';

export const basicRoots: FunctionalGroup[] = [
  {
    id: 'hydrocarbon',
    name: '烃',
    pinyin: 'tīng',
    english: 'Hydrocarbon',
    formula: 'CxHy',
    smiles: '', // No specific smiles
    color: '#a0a0a0',
    etymology: {
      type: '会意',
      description: '取“碳”之火字旁与“氢”之右下部（𢀖）组合而成，读音取“碳”之声母 t- 与“氢”之韵母 -ing 拼合。',
      academic_source: '常印佛《化学命名原则》'
    },
    history: [
      { year: 1932, author: '国立编译馆', name: '烃', description: '确立为碳氢化合物总称' }
    ],
    evolution_stages: []
  },
  {
    id: 'hydroxyl',
    name: '羟',
    pinyin: 'qiǎng',
    english: 'Hydroxyl',
    formula: '-OH',
    smiles: '',
    color: '#a0a0a0',
    etymology: {
      type: '会意',
      description: '取“氧”之羊字旁与“氢”之右下部组合而成，读音取“氢”之声母 q- 与“氧”之韵母 -ang 拼合。',
      academic_source: '化学名词审查会'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '羟', description: '确立为氢氧基团译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'carbonyl',
    name: '羰',
    pinyin: 'tāng',
    english: 'Carbonyl',
    formula: '=C=O',
    smiles: '',
    color: '#a0a0a0',
    etymology: {
      type: '会意',
      description: '取“碳”之头与“氧”之尾组合而成，读音取“碳”之声母 t- 与“氧”之韵母 -ang 拼合。',
      academic_source: '化学名词审查会'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '羰', description: '确立为碳氧基团译名' }
    ],
    evolution_stages: []
  }
];

export const functionalGroups: FunctionalGroup[] = [
  {
    id: 'alkane',
    name: '烷',
    pinyin: 'wán',
    english: 'Alkane',
    formula: 'CnH2n+2',
    smiles: 'CC', // Ethane as example
    color: '#ffffff',
    etymology: {
      type: '形声兼会意',
      description: '左从“火”表化学性质，右从“完”意为“完足、饱足”，指碳原子的四个价键完全被氢原子饱和。',
      academic_source: '何涓《中文化学名词烷、烯、炔之由来》'
    },
    history: [
      { year: 1908, author: '虞和钦', name: '矫质', description: '意译，取其性质强硬' }, // Note: Need to verify if "矫质" is correct for Alkane, usually it's "Saturated" -> "完"
      { year: 1932, author: '郑贞文', name: '烷', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'alkene',
    name: '烯',
    pinyin: 'xī',
    english: 'Alkene',
    formula: 'CnH2n',
    smiles: 'C=C', // Ethene
    color: '#ff5555',
    etymology: {
      type: '形声兼会意',
      description: '左从“火”，右从“稀”意为“稀少”，指氢原子数较烷烃稀少（不饱和）。',
      academic_source: '何涓《中文化学名词烷、烯、炔之由来》'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '烯', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'alkyne',
    name: '炔',
    pinyin: 'quē',
    english: 'Alkyne',
    formula: 'CnH2n-2',
    smiles: 'C#C', // Ethyne
    color: '#ffaa00',
    etymology: {
      type: '形声兼会意',
      description: '左从“火”，右从“夬”取“缺”意，指氢原子数比烯烃更进一步缺失。',
      academic_source: '何涓《中文化学名词烷、烯、炔之由来》'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '炔', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'alcohol',
    name: '醇',
    pinyin: 'chún',
    english: 'Alcohol',
    formula: 'R-OH',
    smiles: 'CO', // Methanol
    color: '#00ffaa',
    etymology: {
      type: '形声兼会意',
      description: '左从“酉”表示与酒相关，右从“享”既表音也寓意酒之醇香精粹。',
      academic_source: '何涓《中文化学名词醇醛酮醚酯之由来》'
    },
    history: [
      { year: 1908, author: '虞和钦', name: '醕', description: '意译，古同醇' },
      { year: 1932, author: '郑贞文', name: '醇', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'phenol',
    name: '酚',
    pinyin: 'fēn',
    english: 'Phenol',
    formula: 'Ar-OH',
    smiles: 'c1ccccc1O',
    color: '#f4c542',
    etymology: {
      type: '形声',
      description: '左从“酉”表示与有机含氧体系相关，右从“分”表音，借以译写 phenol 的读音并区分于“醇”。',
      academic_source: '近现代中文化学命名史料与术语规范整理'
    },
    history: [
      { year: 1908, author: '早期译名', name: '石炭酸', description: '以来源与性质命名，常见于教材与工业文献' },
      { year: 1932, author: '化学命名统一', name: '酚', description: '“酚”逐步确立为通用单字名' }
    ],
    evolution_stages: []
  },
  {
    id: 'ether',
    name: '醚',
    pinyin: 'mí',
    english: 'Ether',
    formula: 'R-O-R\'',
    smiles: 'COC', // Dimethyl ether
    color: '#00aaff',
    etymology: {
      type: '形声',
      description: '左从“酉”，右从“迷”。因其早期作为麻醉剂（使人昏迷）的特性而命名。',
      academic_source: '何涓《中文化学名词醇醛酮醚酯之由来》'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '醚', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'aldehyde',
    name: '醛',
    pinyin: 'quán',
    english: 'Aldehyde',
    formula: 'R-CHO',
    smiles: 'C=O', // Formaldehyde
    color: '#ffff00',
    etymology: {
      type: '形声兼会意',
      description: '左从“酉”，右从“全/旦”。源自“酒味变也”，暗示醇氧化后的性质转变。',
      academic_source: '何涓《中文化学名词醇醛酮醚酯之由来》'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '醛', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'ketone',
    name: '酮',
    pinyin: 'tóng',
    english: 'Ketone',
    formula: 'R-CO-R\'',
    smiles: 'CC(=O)C', // Acetone
    color: '#aa00ff',
    etymology: {
      type: '形声兼会意',
      description: '左从“酉”，右从“同”。既是 ketone 的音译，又取古字“酒欲酢（变酸）”之意。',
      academic_source: '何涓《中文化学名词醇醛酮醚酯之由来》'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '酮', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'carboxylic-acid',
    name: '羧酸',
    pinyin: 'suō suān',
    english: 'Carboxylic Acid',
    formula: 'R-COOH',
    smiles: 'CC(=O)O',
    color: '#ff7a7a',
    etymology: {
      type: '会意兼形声',
      description: '“羧”用于对应 carboxyl 概念，“酸”标明酸性官能团类别，组合后形成结构与性质兼顾的译名。',
      academic_source: '中文有机化学术语标准化资料'
    },
    history: [
      { year: 1910, author: '译名并行期', name: '羧基酸', description: '早期教材中常以组合词解释该类化合物' },
      { year: 1932, author: '命名规范化', name: '羧酸', description: '术语趋于统一并沿用至今' }
    ],
    evolution_stages: []
  },
  {
    id: 'ester',
    name: '酯',
    pinyin: 'zhǐ',
    english: 'Ester',
    formula: 'R-COO-R\'',
    smiles: 'CC(=O)OC', // Methyl acetate
    color: '#ff00ff',
    etymology: {
      type: '形声',
      description: '左从“酉”，右从“脂”。因其广泛存在于油脂（脂肪）中而得名。',
      academic_source: '何涓《中文化学名词醇醛酮醚酯之由来》'
    },
    history: [
      { year: 1932, author: '郑贞文', name: '酯', description: '确立为标准译名' }
    ],
    evolution_stages: []
  },
  {
    id: 'amine',
    name: '胺',
    pinyin: 'àn',
    english: 'Amine',
    formula: 'R-NH2',
    smiles: 'CN',
    color: '#7db7ff',
    etymology: {
      type: '形声',
      description: '“胺”用于对译 amine，字形沿“月（肉）”旁与音符构成，体现含氮有机碱类名称系统。',
      academic_source: '近代化学译名与现行术语规范'
    },
    history: [
      { year: 1910, author: '早期译法', name: '阿明', description: '音译并行使用，后逐步被单字术语替代' },
      { year: 1932, author: '命名规范化', name: '胺', description: '确立为标准名称并广泛采用' }
    ],
    evolution_stages: []
  },
  {
    id: 'amide',
    name: '酰胺',
    pinyin: 'xiān àn',
    english: 'Amide',
    formula: 'R-CONH2',
    smiles: 'CC(=O)N',
    color: '#b38cff',
    etymology: {
      type: '组合命名',
      description: '“酰”对应 acyl 结构单元，“胺”对应含氮部分，组合体现由酰基与氨基体系构成的官能团特征。',
      academic_source: '中文有机化学名词系统与教学用书'
    },
    history: [
      { year: 1920, author: '译名发展期', name: '酸胺', description: '过渡性称法用于解释由酸衍生的胺类' },
      { year: 1932, author: '命名规范化', name: '酰胺', description: '结构化命名形式被确立并沿用' }
    ],
    evolution_stages: []
  }
];
