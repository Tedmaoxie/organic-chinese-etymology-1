﻿﻿﻿﻿export interface AncientScript {
  char: string;
  oracle: string; // 甲骨文 SVG Path
  bronze: string; // 金文 SVG Path
  seal: string;   // 小篆 SVG Path
}

export interface CombinedScript {
  radical: string; // Key of the radical in ancientScripts
  phonetic: string; // Key of the phonetic in ancientScripts (or new phoneticScripts)
  layout: 'left-right' | 'top-bottom' | 'surround'; // Layout type
  scaleRadical?: number; // Optional scale override
  scalePhonetic?: number; // Optional scale override
}

export const ancientScripts: Record<string, AncientScript> = {
  // --- Radicals ---
  '火': {
    char: '火',
    oracle: 'M50,80 Q30,60 20,40 Q50,10 80,40 Q70,60 50,80 M35,50 Q40,30 50,20 Q60,30 65,50 M20,70 Q30,80 40,90 M80,70 Q70,80 60,90',
    bronze: 'M50,85 Q25,65 15,35 Q50,5 85,35 Q75,65 50,85 M35,55 Q45,35 50,25 Q55,35 65,55 M20,75 L40,90 M80,75 L60,90',
    seal: 'M50,90 Q30,70 30,40 Q50,10 70,40 Q70,70 50,90 M30,50 L70,50 M50,20 L50,80'
  },
  '酉': {
    char: '酉',
    oracle: 'M30,20 L70,20 L80,50 L50,90 L20,50 Z M40,30 L60,30 M50,30 L50,50',
    bronze: 'M30,20 L70,20 L75,60 L50,95 L25,60 Z M35,30 L65,30 M50,30 L50,60 M40,50 L60,50',
    seal: 'M25,25 L75,25 L75,75 L25,75 Z M35,35 L65,35 M50,35 L50,65 M30,65 L70,65'
  },
  '气': {
    char: '气',
    oracle: 'M20,30 L80,30 M20,50 L80,50 M20,70 L80,70',
    bronze: 'M20,30 Q50,20 80,30 M20,50 Q50,40 80,50 M20,70 Q50,60 80,70',
    seal: 'M20,25 Q50,15 80,25 M20,45 L70,45 Q80,45 80,55 L20,85'
  },
  '羊': {
    char: '羊',
    oracle: 'M20,20 L30,40 L70,40 L80,20 M50,40 L50,90 M30,60 L70,60 M30,75 L70,75',
    bronze: 'M25,20 C30,10 70,10 75,20 L70,40 L30,40 Z M50,40 L50,90 M35,60 L65,60 M35,75 L65,75',
    seal: 'M30,20 L40,30 M70,20 L60,30 M25,40 L75,40 M50,20 L50,90 M30,60 L70,60 M30,75 L70,75'
  },
  '月': {
    char: '月',
    oracle: 'M30,20 Q10,50 30,90 L70,90 Q50,50 70,20 M40,40 L60,40 M40,60 L60,60',
    bronze: 'M35,20 Q15,50 35,90 L65,90 Q45,50 65,20 Z M40,45 L60,45 M40,65 L60,65',
    seal: 'M30,20 L30,90 L70,90 L70,20 Q50,10 30,20 M30,45 L70,45 M30,70 L70,70'
  },
  '艹': {
    char: '艹',
    // 两株嫩草
    oracle: 'M25,60 L25,30 M25,30 L15,20 M25,30 L35,20 M75,60 L75,30 M75,30 L65,20 M75,30 L85,20',
    bronze: 'M25,65 Q25,35 25,30 Q25,30 15,20 Q25,30 35,20 M75,65 Q75,35 75,30 Q75,30 65,20 Q75,30 85,20',
    seal: 'M30,70 L30,40 Q30,40 20,30 M30,40 Q30,40 40,30 M70,70 L70,40 Q70,40 60,30 M70,40 Q70,40 80,30'
  },
  '本': {
    char: '本',
    // 树木下方加一横表示根部
    oracle: 'M50,10 L50,80 M20,50 L80,50 M50,50 L20,80 M50,50 L80,80 M35,85 L65,85',
    bronze: 'M50,10 L50,85 M20,55 L80,55 M50,55 L25,85 M50,55 L75,85 M30,90 L70,90',
    seal: 'M50,10 L50,80 M20,50 L80,50 M50,50 L20,80 M50,50 L80,80 M30,85 L70,85'
  },
  // --- Phonetics / Components ---
  '𢀖': {
    char: '𢀖',
    // 织布机上的经线穿过工架
    oracle: 'M30,20 L70,20 M50,20 L50,80 M35,20 L35,80 M65,20 L65,80 M30,80 L70,80',
    bronze: 'M30,25 L70,25 M50,25 L50,85 M35,25 L35,85 M65,25 L65,85 M30,85 L70,85',
    seal: 'M30,20 L70,20 M50,20 L50,80 M35,20 L35,80 M65,20 L65,80 M30,80 L70,80'
  },
  '巠': {
    char: '巠',
    // 上方水流(巛) + 下方经线(𢀖)
    oracle: 'M30,10 Q50,0 70,10 M30,25 Q50,15 70,25 M30,40 Q50,30 70,40 M30,50 L70,50 M50,50 L50,90 M35,50 L35,90 M65,50 L65,90 M30,90 L70,90',
    bronze: 'M30,15 Q50,5 70,15 M30,30 Q50,20 70,30 M30,45 Q50,35 70,45 M30,55 L70,55 M50,55 L50,95 M35,55 L35,95 M65,55 L65,95 M30,95 L70,95',
    seal: 'M30,15 Q50,5 70,15 M30,30 Q50,20 70,30 M30,45 Q50,35 70,45 M30,55 L70,55 M50,55 L50,95 M35,55 L35,95 M65,55 L65,95 M30,95 L70,95'
  },
  '炭': {
    char: '炭',
    // 上山(山) + 下火(火)
    oracle: 'M50,10 L50,40 M30,25 L30,40 L70,40 L70,25 M35,80 Q30,60 20,40 Q50,10 80,40 Q70,60 50,80 M50,50 L50,70',
    bronze: 'M50,10 L50,35 M25,20 L25,35 L75,35 L75,20 M35,85 Q25,65 15,35 Q50,5 85,35 Q75,65 50,85 M50,55 L50,80',
    seal: 'M50,10 L50,30 M25,20 L25,30 L75,30 L75,20 M50,90 Q30,70 30,40 Q50,10 70,40 Q70,70 50,90 M30,50 L70,50'
  },
  '完': {
    char: '完',
    // Roof + Yuan (Man with big head/top)
    oracle: 'M20,30 L50,10 L80,30 M20,30 L20,60 M80,30 L80,60 M35,50 L65,50 M50,50 L50,70 M35,90 L50,70 L65,90',
    bronze: 'M20,30 L50,10 L80,30 M20,30 L20,55 M80,30 L80,55 M35,45 L65,45 M50,45 L50,65 M35,85 L50,65 L65,85',
    seal: 'M25,25 L50,10 L75,25 M25,25 L25,45 M75,25 L75,45 M35,40 L65,40 M50,40 L50,60 M40,80 L50,60 L60,80'
  },
  '稀': {
    char: '稀',
    // Grain (He) + Xi (Cross/Cloth)
    oracle: 'M30,20 L30,80 M10,40 L50,40 M10,20 L30,40 L50,20 M60,20 L90,20 M75,20 L75,80 M60,50 L90,50 M60,80 L90,80',
    bronze: 'M30,20 L30,85 M10,40 L50,40 M15,25 L30,40 L45,25 M65,20 L85,20 M75,20 L75,85 M65,50 L85,50 M65,85 L85,85',
    seal: 'M30,15 L30,90 M10,35 L50,35 M15,15 L30,35 L45,15 M65,20 L85,20 M75,20 L75,90 M65,50 L85,50 M65,90 L85,90'
  },
  '夬': {
    char: '夬',
    // Hand holding object / Split
    oracle: 'M30,20 L70,20 M50,20 L50,80 M30,50 L70,50 M70,20 L70,60',
    bronze: 'M30,20 L70,20 M50,20 L50,85 M30,50 L70,50 M70,20 L70,70',
    seal: 'M30,25 L70,25 M50,25 L50,90 M30,55 L70,55 M70,25 L70,75'
  },
  '享': {
    char: '享',
    // Temple/Building
    oracle: 'M50,10 L50,30 M20,30 L80,30 M30,30 L30,60 L70,60 L70,30 M30,70 L70,70 M30,70 L30,90 L70,90 L70,70',
    bronze: 'M50,10 L50,25 M20,25 L80,25 M35,25 L35,55 L65,55 L65,25 M25,65 L75,65 M35,65 L35,90 L65,90 L65,65',
    seal: 'M50,10 L50,20 M20,20 L80,20 M35,20 L35,50 L65,50 L65,20 M25,60 L75,60 M35,60 L35,85 L65,85 L65,60'
  },
  '分': {
    char: '分',
    // Eight (divide) + Knife
    oracle: 'M30,20 L50,40 M70,20 L50,40 M30,60 L70,60 M30,60 L30,90 M70,60 L70,90 M30,80 L70,80',
    bronze: 'M30,15 L50,35 M70,15 L50,35 M30,55 L70,55 M35,55 L35,90 M65,55 L65,90 M35,80 L65,80',
    seal: 'M35,15 L50,30 M65,15 L50,30 M30,50 L70,50 M35,50 L35,90 M65,50 L65,90 M35,80 L65,80'
  },
  '迷': {
    char: '迷',
    // Rice + Walk
    oracle: 'M50,30 L50,70 M30,50 L70,50 M30,30 L70,70 M70,30 L30,70 M20,80 L50,90 L80,80',
    bronze: 'M50,25 L50,65 M30,45 L70,45 M35,30 L65,60 M65,30 L35,60 M15,85 L50,95 L85,85',
    seal: 'M50,20 L50,60 M30,40 L70,40 M35,25 L65,55 M65,25 L35,55 M15,80 L50,90 L85,80'
  },
  '全': {
    char: '全',
    // Roof + Jade/King
    oracle: 'M50,10 L20,40 M50,10 L80,40 M30,60 L70,60 M50,60 L50,90 M40,80 L60,80 M30,90 L70,90',
    bronze: 'M50,10 L20,35 M50,10 L80,35 M30,55 L70,55 M50,55 L50,90 M35,75 L65,75 M30,90 L70,90',
    seal: 'M50,10 L20,30 M50,10 L80,30 M30,50 L70,50 M50,50 L50,90 M35,70 L65,70 M30,90 L70,90'
  },
  '同': {
    char: '同',
    // Cover + One + Mouth
    oracle: 'M20,20 L80,20 L80,90 M20,20 L20,90 M30,40 L70,40 M40,60 L60,60 L60,80 L40,80 L40,60',
    bronze: 'M20,15 L80,15 L80,95 M20,15 L20,95 M30,35 L70,35 M40,55 L60,55 L60,80 L40,80 L40,55',
    seal: 'M25,15 L75,15 L75,90 M25,15 L25,90 M35,35 L65,35 M40,55 L60,55 L60,80 L40,80 L40,55'
  },
  '脂': {
    char: '脂',
    // Flesh + Spoon/Delicious
    oracle: 'M20,20 Q10,50 20,80 L50,80 Q40,50 50,20 M30,40 L40,40 M30,60 L40,60 M60,20 L90,20 M60,20 L60,50 L90,50 M60,60 L90,60 L90,80 L60,80 L60,60',
    bronze: 'M20,20 Q10,50 20,85 L50,85 Q40,50 50,20 M30,45 L40,45 M30,65 L40,65 M65,20 L85,20 M65,20 L65,45 L85,45 M65,55 L85,55 L85,80 L65,80 L65,55',
    seal: 'M25,20 L25,85 L45,85 L45,20 M25,40 L45,40 M25,65 L45,65 M65,20 L85,20 M65,20 L65,45 L85,45 M65,55 L85,55 L85,80 L65,80 L65,55'
  },
  '安': {
    char: '安',
    // Roof + Woman
    oracle: 'M50,10 L20,30 M50,10 L80,30 M30,50 L70,50 L30,90 L70,90 M50,60 L20,80 M50,60 L80,80',
    bronze: 'M50,10 L20,30 M50,10 L80,30 M30,45 L70,45 L30,85 L70,85 M50,55 L20,75 M50,55 L80,75',
    seal: 'M50,10 L20,25 M50,10 L80,25 M30,40 L70,40 L30,80 L70,80 M50,50 L20,70 M50,50 L80,70'
  },
  '夋': {
    char: '夋',
    // Walking slowly? (Top of Acid)
    oracle: 'M50,20 L30,50 L70,50 L50,20 M50,50 L50,80 M30,80 L70,80',
    bronze: 'M50,20 L30,50 L70,50 L50,20 M50,50 L50,85 M30,85 L70,85',
    seal: 'M50,15 L30,45 L70,45 L50,15 M50,45 L50,85 M30,85 L70,85'
  },
  '先': {
    char: '先',
    // Foot + Person
    oracle: 'M50,20 L30,50 M50,20 L70,50 M30,50 L70,50 M50,50 L50,80 M30,80 L70,80',
    bronze: 'M50,20 L30,50 M50,20 L70,50 M30,50 L70,50 M50,50 L50,85 M30,85 L70,85',
    seal: 'M50,15 L30,45 M50,15 L70,45 M30,45 L70,45 M50,45 L50,85 M30,85 L70,85'
  }
};

export const combinedCompositions: Record<string, CombinedScript> = {
  '烷': { radical: '火', phonetic: '完', layout: 'left-right' },
  '烯': { radical: '火', phonetic: '稀', layout: 'left-right' },
  '炔': { radical: '火', phonetic: '夬', layout: 'left-right' },
  '烃': { radical: '火', phonetic: '𢀖', layout: 'left-right' }, // 新增
  '醇': { radical: '酉', phonetic: '享', layout: 'left-right' },
  '酚': { radical: '酉', phonetic: '分', layout: 'left-right' },
  '醚': { radical: '酉', phonetic: '迷', layout: 'left-right' },
  '醛': { radical: '酉', phonetic: '全', layout: 'left-right' },
  '酮': { radical: '酉', phonetic: '同', layout: 'left-right' },
  '酯': { radical: '酉', phonetic: '脂', layout: 'left-right' }, 
  '胺': { radical: '月', phonetic: '安', layout: 'left-right' },
  '酸': { radical: '酉', phonetic: '夋', layout: 'left-right' },
  '羧': { radical: '羊', phonetic: '夋', layout: 'left-right' },
  '酰': { radical: '酉', phonetic: '先', layout: 'left-right' },
  '羟': { radical: '羊', phonetic: '𢀖', layout: 'left-right' }, // 新增
  '羰': { radical: '羊', phonetic: '炭', layout: 'left-right' }, // 新增
  '苯': { radical: '艹', phonetic: '本', layout: 'top-bottom' }, // 新增
};

export const getRadical = (char: string): string => {
  if (['烷', '烯', '炔', '烃', '火', '炭'].includes(char)) return '火';
  if (['醇', '酚', '醚', '醛', '酮', '酯', '酸', '酰', '酉'].includes(char)) return '酉';
  if (['氢', '氧', '氮', '氯', '气'].includes(char)) return '气';
  if (['羟', '羧', '羊', '羰'].includes(char)) return '羊';
  if (['胺', '月', '肉', '脂', '胱', '脏'].includes(char)) return '月';
  if (['苯', '艹'].includes(char)) return '艹';
  return '';
};
