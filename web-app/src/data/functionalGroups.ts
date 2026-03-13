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
      { year: 1873, author: '毕利干', name: '轻精', description: '《化学指南》中对碳氢化合物的早期译名' },
      { year: 1873, author: '徐寿', name: '轻衰', description: '《化学鉴原续编》中对简单碳氢化合物的译名' },
      { year: 1908, author: '虞和钦', name: '矫质', description: '《中国有机化学命名草》意译，指碳原子价键完全饱和，取“矫健、完足”之意' },
      { year: 1908, author: '留欧中华化学会', name: '火字旁系统', description: '在《化学命名建议》中确立了火字旁作为烃类的标志性偏旁' },
      { year: 1932, author: '国立编译馆', name: '烃', description: '取“碳”之火部与“氢”之巠部合字，确立为碳氢化合物总称' }
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
      { year: 1873, author: '徐寿', name: '氧氢基', description: '早期描述性命名，直译其组成元素' },
      { year: 1921, author: '科学名词审查会', name: '羟', description: '首次提出火部与羊部结合的构字方案' },
      { year: 1932, author: '郑贞文', name: '羟', description: '确立为氢氧基团标准译名' }
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
      { year: 1873, author: '徐寿', name: '碳氧基', description: '早期描述性命名' },
      { year: 1921, author: '科学名词审查会', name: '羰', description: '确立碳部与氧部结合的构字方案' },
      { year: 1932, author: '郑贞文', name: '羰', description: '确立为碳氧基团标准译名' }
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
      { year: 1908, author: '虞和钦', name: '矫质', description: '《中国有机化学命名草》中意译，指碳原子价键完全饱和' },
      { year: 1908, author: '留欧中华化学会', name: '火字旁尝试', description: '提出使用火部结合特定声旁，为后来的单字命名奠定基础' },
      { year: 1921, author: '科学名词审查会', name: '烷', description: '确立火部与“完”结合的构字方案，取“完足”之意' },
      { year: 1932, author: '郑贞文', name: '烷', description: '在《化学命名原则》中最终确立为标准译名' }
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
      { year: 1873, author: '徐寿', name: '以脱里尼', description: '《化学鉴原续编》中对 ethylene 的早期音译' },
      { year: 1908, author: '虞和钦', name: '羸质', description: '意译，指氢原子数较烷烃稀少，取“瘦弱、稀少”之意' },
      { year: 1908, author: '留欧中华化学会', name: '不饱和烃系统', description: '提出以火字旁结合声旁，区分不同饱和度的烃类' },
      { year: 1921, author: '科学名词审查会', name: '烯', description: '确立火部与“稀”结合的构字方案，意为氢原子稀少' },
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
      { year: 1908, author: '虞和钦', name: '亚羸质', description: '意译，指氢原子数比烯烃更进一步缺失，取“次于羸弱”之意' },
      { year: 1908, author: '留欧中华化学会', name: '三键烃尝试', description: '确立了以火部结合声旁来表征炔烃的逻辑' },
      { year: 1921, author: '科学名词审查会', name: '炔', description: '确立火部与“夬（缺）”结合的构字方案，意为氢原子进一步缺失' },
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
      { year: 1868, author: '丁韪良', name: '酒精', description: '《格物入门》中对乙醇的早期通用名称' },
      { year: 1875, author: '徐寿', name: '醕', description: '《化学鉴原》中使用的名称，古同“醇”' },
      { year: 1908, author: '虞和钦', name: '二炭醕', description: '《中国有机化学命名草》中以碳数命名的系统，保留“醕”字' },
      { year: 1908, author: '留欧中华化学会', name: '醇', description: '在《化学命名建议》中正式提出以“醇”作为此类化合物的总称' },
      { year: 1932, author: '郑贞文', name: '醇', description: '确立为标准译名，统一含羟基有机物称呼' }
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
      { year: 1873, author: '徐寿', name: '石炭酸', description: '《化学鉴原续编》中以来源与性质命名' },
      { year: 1908, author: '虞和钦', name: '𨠮', description: '早期意译尝试，体现其不同于醇的性质' },
      { year: 1932, author: '郑贞文', name: '酚', description: '“酚”确立为通用单字名，音译自 Phenol' }
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
      { year: 1868, author: '丁韪良', name: '磺精', description: '《格物入门》中对 ether 的早期译名，因其制备常涉及硫酸' },
      { year: 1873, author: '毕利加', name: '轻精', description: '《化学指南》中对乙醚的早期译名' },
      { year: 1873, author: '徐寿', name: '以脱', description: '《化学鉴原续编》中对 ether 的早期音译' },
      { year: 1908, author: '虞和钦', name: '醇精', description: '《中国有机化学命名草》意译，指其为“醇之精粹”（醇脱水产物）' },
      { year: 1908, author: '留欧中华化学会', name: '醚', description: '取“迷”之意，指其具有麻醉作用，并确立“酉”部系统' },
      { year: 1921, author: '科学名词审查会', name: '醚', description: '正式采纳留欧中华化学会的“醚”字方案' },
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
      { year: 1871, author: '嘉约翰', name: '丫的歇', description: '《化学初阶》中对 aldehyde 的早期音译' },
      { year: 1875, author: '徐寿', name: '阿勒弟海特', description: '《化学鉴原续编》中对 aldehyde 的音译' },
      { year: 1908, author: '虞和钦', name: '间质', description: '《中国有机化学命名草》意译，指其性质处于醇与酸之间' },
      { year: 1908, author: '留欧中华化学会', name: '醛', description: '取“酒味变也”之意，结合“酉”部与“全”声，正式提出“醛”字' },
      { year: 1921, author: '科学名词审查会', name: '醛', description: '正式确立“酉+全”的构字方案' },
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
      { year: 1871, author: '嘉约翰', name: '丫薛同', description: '《化学初阶》中对 ketone (acetone) 的早期音译' },
      { year: 1875, author: '徐寿', name: '阿西多尼', description: '《化学鉴原续编》中对 acetone 的音译' },
      { year: 1908, author: '虞和钦', name: '拟间质', description: '意译，指其性质类同于醛（间质）' },
      { year: 1908, author: '留欧中华化学会', name: '酮', description: '取“酒欲酢（变酸）”之意，结合“酉”部与“同”声，正式提出“酮”字' },
      { year: 1921, author: '科学名词审查会', name: '酮', description: '正式确立“酉+同”的构字方案' },
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
      { year: 1873, author: '徐寿', name: '醋酸', description: '《化学鉴原》中对乙酸的早期通用称呼' },
      { year: 1908, author: '留欧中华化学会', name: '羧', description: '提出“羧”字以对应 carboxyl，取“碳”与“酸”之音合' },
      { year: 1908, author: '虞和钦', name: '酸', description: '指含有矫基（烷基）的有机酸' },
      { year: 1932, author: '郑贞文', name: '羧酸', description: '确立“羧”字以对应 carboxyl，规范化术语' }
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
      { year: 1873, author: '徐寿', name: '以脱盐', description: '徐寿对 ether salt (ester) 的音译加类名' },
      { year: 1908, author: '虞和钦', name: '矫基盐', description: '意译，指烷基（矫基）与酸形成的盐类' },
      { year: 1931, author: '屈逊立', name: '酯', description: '在《有机化学》中首次使用“酯”字，取“酉+脂”之意' },
      { year: 1932, author: '郑贞文', name: '酯', description: '确立为标准译名，体现其广泛存在于油脂中' }
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
      { year: 1873, author: '徐寿', name: '阿明', description: '《化学鉴原续编》中对 amine 的音译' },
      { year: 1908, author: '留欧中华化学会', name: '胺', description: '提出使用“月”旁（肉部）字对译含氮有机碱' },
      { year: 1908, author: '虞和钦', name: '氨质', description: '意译，指含氨基的有机物' },
      { year: 1932, author: '国立编译馆', name: '胺', description: '确立为标准单字名，规范化音译' }
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
      { year: 1873, author: '徐寿', name: '阿密得', description: '对 amide 的音译' },
      { year: 1920, author: '译名发展期', name: '酸胺', description: '过渡性称法，解释其为酸之衍生物' },
      { year: 1932, author: '郑贞文', name: '酰胺', description: '结构化命名确立，酰基+胺的复合形式' }
    ],
    evolution_stages: []
  },
  {
    id: 'benzene',
    name: '苯',
    pinyin: 'běn',
    english: 'Benzene',
    formula: 'C6H6',
    smiles: 'c1ccccc1',
    color: '#ffdd00',
    etymology: {
      type: '形声',
      description: '左从“草”头表示其多源于植物（芳香族），右从“本”音译自 Benzene 的首音节。',
      academic_source: '何涓《轮、困还是苯？——有机化合物命名用字音译原则之由来》'
    },
    history: [
      { year: 1875, author: '徐寿', name: '安息油', description: '早期通用名称，因其源于安息香树脂，属于来源命名法' },
      { year: 1908, author: '虞和钦', name: '轮质', description: '《有机化学命名草》意译，基于凯库勒的环状结构理论，属于结构命名法' },
      { year: 1915, author: '教育部', name: '𦵏', description: '早期象形尝试，试图以文字形状模拟六角环结构' },
      { year: 1932, author: '郑贞文', name: '苯', description: '《化学命名原则》确立音译优先，取 Benzene 首音节，并加草字头表其多源于植物' }
    ],
    evolution_stages: []
  }
];
