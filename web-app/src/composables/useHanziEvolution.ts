import { ref, computed, watch, nextTick, type Ref } from 'vue';
import { ancientScripts, getRadical, combinedCompositions, type CombinedScript } from '../data/ancientScripts';
import HanziWriter from 'hanzi-writer';

export interface UseHanziEvolutionOptions {
  char: Ref<string>;
  container: Ref<HTMLElement | null>;
}

export function useHanziEvolution({ char, container }: UseHanziEvolutionOptions) {
  const currentStage = ref<'oracle' | 'bronze' | 'seal' | 'standard'>('standard');
  const isPlaying = ref(false);
  const animationId = ref(0);
  let writer: HanziWriter | null = null;
  const replayKey = ref(0);

  const primaryChar = computed(() => {
    return Array.from(char.value.trim())[0] || '';
  });

  // Combined Composition Logic
  const combinedData = computed<CombinedScript | undefined>(() => {
    return combinedCompositions[primaryChar.value];
  });

  const isCombined = computed(() => !!combinedData.value);

  const ancientData = computed(() => {
    const radical = getRadical(primaryChar.value);
    return ancientScripts[primaryChar.value] || ancientScripts[radical];
  });

  const isUsingRadical = computed(() => {
    if (isCombined.value) return false;
    return !ancientScripts[primaryChar.value] && !!ancientScripts[getRadical(primaryChar.value)];
  });

  const radicalChar = computed(() => getRadical(primaryChar.value));

  const hasAncientData = computed(() => !!ancientData.value || !!combinedData.value);

  const getPath = (key: string, stage: 'oracle' | 'bronze' | 'seal') => {
    const script = ancientScripts[key];
    if (!script) return '';
    return script[stage] || '';
  };

  const currentSvgPath = computed(() => {
    if (isCombined.value) return '';
    if (!ancientData.value || currentStage.value === 'standard') return '';
    return ancientData.value[currentStage.value as 'oracle' | 'bronze' | 'seal'];
  });

  const combinedPaths = computed(() => {
    if (!isCombined.value || currentStage.value === 'standard') return null;
    
    const comp = combinedData.value!;
    const stage = currentStage.value as 'oracle' | 'bronze' | 'seal';
    
    const radicalPath = getPath(comp.radical, stage);
    const phoneticPath = getPath(comp.phonetic, stage);
    
    let radicalTransform = '';
    let phoneticTransform = '';
    
    if (comp.layout === 'left-right') {
      const rScale = comp.scaleRadical || 0.65;
      const pScale = comp.scalePhonetic || 0.65;
      radicalTransform = `translate(-10, 10) scale(${rScale})`; 
      phoneticTransform = `translate(37, 10) scale(${pScale})`;
    }
    
    return {
      radical: radicalPath,
      phonetic: phoneticPath,
      radicalTransform,
      phoneticTransform
    };
  });

  const stageLabel = computed(() => {
    switch (currentStage.value) {
      case 'oracle': return '甲骨文';
      case 'bronze': return '金文';
      case 'seal': return '小篆';
      case 'standard': return '楷书';
      default: return '';
    }
  });

  const initWriter = () => {
    if (!container.value || !char.value) return;
    
    if (writer && char.value === (writer as any)._character) {
      return;
    }
    
    if (writer) {
      writer.cancelQuiz();
      writer = null;
    }
    if (container.value) {
      container.value.innerHTML = '';
    }

    const chars = Array.from(char.value.trim());
    const pChar = chars[0];
    const fallbackChar = chars[chars.length - 1];
    if (!pChar) return;
    
    // Calculate size dynamically but safely
    const size = Math.min(180, Math.max(140, Math.floor(window.innerHeight * 0.2)));

    try {
      writer = HanziWriter.create(container.value, pChar, {
        width: size,
        height: size,
        padding: 5,
        showOutline: true,
        strokeAnimationSpeed: 1, // Slower speed for more natural feel
        delayBetweenStrokes: 200, // Longer pause between strokes
        strokeColor: '#00aaff',
        radicalColor: '#ffaa00',
      });
      writer.animateCharacter();
    } catch {
      if (!fallbackChar || fallbackChar === primaryChar.value) return;
      writer = HanziWriter.create(container.value, fallbackChar, {
        width: size,
        height: size,
        padding: 5,
        showOutline: true,
        strokeAnimationSpeed: 1, // Slower speed for more natural feel
        delayBetweenStrokes: 200, // Longer pause between strokes
        strokeColor: '#00aaff',
        radicalColor: '#ffaa00',
      });
      writer.animateCharacter();
    }
  };

  const cleanup = () => {
    if (writer) {
      writer.cancelQuiz();
      writer = null;
    }
    if (container.value) {
      container.value.innerHTML = '';
    }
  };

  const replay = () => {
    if (currentStage.value === 'standard') {
      writer?.animateCharacter();
    } else {
      replayKey.value++;
    }
  };

  const playEvolution = async () => {
    if (isPlaying.value || !hasAncientData.value) return;
    isPlaying.value = true;
    const currentAnimId = ++animationId.value;
    
    const stages: ('oracle' | 'bronze' | 'seal' | 'standard')[] = 
      ['oracle', 'bronze', 'seal', 'standard'];
    
    for (const stage of stages) {
      if (animationId.value !== currentAnimId) break;
      
      currentStage.value = stage;
      
      if (stage !== 'standard') {
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        if (writer) {
          writer.showCharacter();
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (animationId.value === currentAnimId) {
             writer.animateCharacter();
          }
        }
      }
    }
    
    if (animationId.value === currentAnimId) {
      isPlaying.value = false;
    }
  };

  // Watchers
  watch(char, (newChar) => {
    if (newChar) {
      animationId.value++;
      isPlaying.value = false;
      currentStage.value = 'standard';
      nextTick(() => initWriter());
    }
  });

  return {
    currentStage,
    isPlaying,
    primaryChar,
    combinedData,
    isCombined,
    ancientData,
    isUsingRadical,
    radicalChar,
    hasAncientData,
    currentSvgPath,
    combinedPaths,
    stageLabel,
    replayKey,
    initWriter,
    cleanup,
    replay,
    playEvolution
  };
}
