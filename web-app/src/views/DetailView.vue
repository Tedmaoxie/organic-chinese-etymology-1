<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MoleculeViewer from '../components/MoleculeViewer.vue';
import HanziEvolution from '../components/HanziEvolution.vue';
import { functionalGroups, basicRoots } from '../data/functionalGroups';
import type { FunctionalGroup } from '../types';

const route = useRoute();
const router = useRouter();

const currentGroup = computed<FunctionalGroup>(() => {
  // Check both lists
  const group = functionalGroups.find(g => g.id === route.params.id) || 
                basicRoots.find(g => g.id === route.params.id);
  return (group || functionalGroups[0]) as FunctionalGroup;
});

const selectedVariant = ref('');
const displayGroupId = computed(() => {
  if (['hydrocarbon', 'hydroxyl'].includes(currentGroup.value.id) && selectedVariant.value) {
    return selectedVariant.value;
  }
  return currentGroup.value.id;
});

const getVariants = (id: string) => {
  if (id === 'hydrocarbon') {
    return [
      { label: '乙烷 (Ethane)', value: 'alkane' },
      { label: '乙烯 (Ethene)', value: 'alkene' },
      { label: '乙炔 (Ethyne)', value: 'alkyne' },
      { label: '苯 (Benzene)', value: 'benzene' }
    ];
  }
  if (id === 'hydroxyl') {
    return [
      { label: '甲醇 (Methanol)', value: 'alcohol' },
      { label: '苯酚 (Phenol)', value: 'phenol' }
    ];
  }
  return [];
};

const updateVariant = () => {
  // Logic handled by computed displayGroupId
};

// Reset variant when group changes
import { watch } from 'vue';
watch(() => currentGroup.value.id, (newId) => {
  if (newId === 'hydrocarbon') selectedVariant.value = 'alkane';
  else if (newId === 'hydroxyl') selectedVariant.value = 'alcohol';
  else selectedVariant.value = '';
}, { immediate: true });

const activeTab = ref('etymology'); // 'etymology' | 'history'

const toggleTab = (tab: string) => {
  activeTab.value = tab;
};

const goToPrev = () => {
  // Determine which list the current group belongs to
  let list = functionalGroups;
  let currentIndex = functionalGroups.findIndex(g => g.id === currentGroup.value.id);
  
  if (currentIndex === -1) {
    list = basicRoots;
    currentIndex = basicRoots.findIndex(g => g.id === currentGroup.value.id);
  }
  
  if (currentIndex !== -1) {
    // Handle wrapping for negative index
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    const prevGroup = list[prevIndex];
    if (prevGroup) {
      router.push(`/group/${prevGroup.id}`);
    }
  }
};

const goToNext = () => {
  let list = functionalGroups;
  let currentIndex = functionalGroups.findIndex(g => g.id === currentGroup.value.id);
  
  if (currentIndex === -1) {
    list = basicRoots;
    currentIndex = basicRoots.findIndex(g => g.id === currentGroup.value.id);
  }

  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % list.length;
    const nextGroup = list[nextIndex];
    if (nextGroup) {
      router.push(`/group/${nextGroup.id}`);
    }
  }
};

// Play audio if available (mock function)
const playAudio = () => {
  if (document.hidden) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(currentGroup.value.name + "。" + currentGroup.value.etymology.description);
  utter.lang = 'zh-CN';
  synth.speak(utter);
};

const stopAudio = () => {
  window.speechSynthesis.cancel();
};

// Helper to format chemical formula with subscripts
const formatFormula = (formula: string) => {
  return formula.replace(/([a-zA-Z\)])(2n[+\-]\d+|2n|n|m|x|y|\d+)/g, '$1<sub>$2</sub>');
};

const onVisibilityChange = () => {
  if (document.hidden) {
    stopAudio();
  }
};

onMounted(() => {
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('blur', stopAudio);
});

onBeforeUnmount(() => {
  stopAudio();
  document.removeEventListener('visibilitychange', onVisibilityChange);
  window.removeEventListener('blur', stopAudio);
});
</script>

<template>
  <div v-if="currentGroup" class="detail-view">
    <div class="header">
      <router-link to="/" class="back-btn">← 返回</router-link>
      <h1>{{ currentGroup.name }} <span class="en">{{ currentGroup.english }}</span></h1>
      <div class="formula" v-html="formatFormula(currentGroup.formula)"></div>
    </div>

    <div class="content-split">
      <!-- Left: 3D Lab -->
      <div class="lab-panel glass-panel">
        <!-- Add selector for multi-variant roots -->
        <div v-if="['hydrocarbon', 'hydroxyl'].includes(currentGroup.id)" class="variant-selector">
          <select v-model="selectedVariant" @change="updateVariant">
            <option v-for="v in getVariants(currentGroup.id)" :key="v.value" :value="v.value">
              {{ v.label }}
            </option>
          </select>
        </div>
        <MoleculeViewer :groupId="displayGroupId" />
        <div class="controls">
          <button @click="goToPrev" class="nav-btn prev">← 上一个</button>
          <button @click="playAudio" class="play-btn" title="朗读">🔊</button>
          <button @click="goToNext" class="nav-btn next">下一个 →</button>
        </div>
      </div>

      <!-- Right: Etymology Library -->
      <div class="library-panel glass-panel">
        <div class="tabs">
          <button :class="{ active: activeTab === 'etymology' }" @click="toggleTab('etymology')">说文解字</button>
          <button :class="{ active: activeTab === 'history' }" @click="toggleTab('history')">命名演进</button>
        </div>

        <div v-if="activeTab === 'etymology'" class="tab-content etymology-content">
          <div class="hanzi-display">
            <HanziEvolution :char="currentGroup.name" />
          </div>
          <div class="etymology-text">
            <h3>{{ currentGroup.etymology.type }}</h3>
            <p>{{ currentGroup.etymology.description }}</p>
            <cite>—— {{ currentGroup.etymology.academic_source }}</cite>
          </div>
        </div>

        <div v-if="activeTab === 'history'" class="tab-content history-timeline">
          <div v-for="event in currentGroup.history" :key="event.year" class="timeline-item">
            <div class="year">{{ event.year }}</div>
            <div class="event-details">
              <h4>{{ event.author }}</h4>
              <p class="name-evolution">{{ event.name }}</p>
              <p class="desc">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="error-state">
    <p>Loading or Error: Group not found</p>
    <router-link to="/">Return Home</router-link>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

.detail-view {
  width: 100%;
  max-width: 1200px; // Reverted max-width
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem; // Extreme minimal gap
  padding: 0 0.5rem 0.1rem 0.5rem; // Extreme minimal padding
  box-sizing: border-box;
  overflow: hidden; 
}

.header {
  display: flex;
  align-items: center;
  gap: 0.8rem; // Reduced gap
  flex-shrink: 0; 
  padding-top: 0.1rem; // Minimal padding
    
    .back-btn {
      color: $color-text-secondary;
      text-decoration: none;
      font-size: 0.8rem; // Reduced font size
    transition: color 0.3s;
    
    &:hover {
      color: $color-text-accent;
    }
  }

  h1 {
    font-size: clamp(1.2rem, 1.4vw, 1.6rem); // Reduced font size
    margin: 0;
    
    .en {
      font-size: 0.8rem; // Reduced font size
      color: $color-text-secondary;
      font-weight: normal;
    }
  }

  .formula {
    font-family: monospace;
    font-size: 0.8rem; // Reduced font size
    color: $color-text-accent;
    border: 1px solid $color-text-accent;
    padding: 0.1rem 0.3rem; // Reduced padding
    border-radius: 4px;
  }
}

.content-split {
  display: grid;
  // Adjusted grid columns
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 380px); 
  gap: 0.8rem; // Reduced gap
  flex: 1; 
  min-height: 0; 
  overflow: hidden; 
  // Add padding bottom to avoid clipping at the very bottom
  padding-bottom: 0; // Removed padding
}

.lab-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px; // Reduced radius
  @include glass-panel;
  
  .variant-selector {
      position: absolute;
      top: 0.5rem; // Adjusted top
      left: 0.5rem; // Adjusted left
      z-index: 20;
      
      select {
        background: rgba(0, 0, 0, 0.6);
        color: white;
        border: 1px solid $color-text-accent;
        padding: 0.2rem; // Reduced padding
        font-size: 0.8rem; // Reduced font size
        border-radius: 6px; // Reduced radius
        font-family: inherit;
        cursor: pointer;
        backdrop-filter: blur(4px);
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba($color-text-accent, 0.5);
        }
      }
    }

    .controls {
    position: absolute;
    bottom: 0.5rem; // Adjusted bottom
    left: 0.5rem; // Adjusted left
    right: 0.5rem; // Adjusted right
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none; 
    
    button {
      pointer-events: auto; 
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid $color-text-secondary;
      color: #fff;
      padding: 0.2rem 0.5rem; // Reduced padding
      font-size: 0.8rem; // Reduced font size
      border-radius: 16px; // Reduced radius
      cursor: pointer;
      backdrop-filter: blur(5px);
      transition: all 0.3s;
      
      &.nav-btn {
        background: rgba($color-text-accent, 0.2);
        border-color: $color-text-accent;
        color: $color-text-accent;
        font-weight: bold;
        min-width: 60px; // Reduced width
        
        &:hover {
          background: $color-text-accent;
          color: #000;
        }
      }
      
      &.play-btn {
        border-radius: 50%;
        width: 2rem; // Reduced size
        height: 2rem; // Reduced size
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-size: 0.8rem; // Reduced font size
      }
      
      &:hover {
        background: $color-text-accent;
        border-color: $color-text-accent;
        color: #000;
      }
    }
  }
}

.library-panel {
  display: flex;
  flex-direction: column;
  border-radius: 12px; // Reduced radius
  overflow: hidden;
  padding: 1rem; // Reduced padding
  min-height: 0;
  @include glass-panel;
  
  .tabs {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 0.6rem; // Reduced margin
    flex-shrink: 0;
    
    button {
      background: transparent;
      border: none;
      color: $color-text-secondary;
      padding: 0.5rem; // Reduced padding
      font-size: 0.85rem; // Reduced font size
      cursor: pointer;
      position: relative;
      flex: 1;
      text-align: center;
      
      &.active {
        color: $color-text-primary;
        font-weight: bold;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: $color-text-accent;
        }
      }
    }
  }
}

.tab-content {
    flex: 1;
    overflow-y: auto; 
    display: flex;
    flex-direction: column;
    min-height: 0; 
    padding-right: 0.5rem; 
    
    // Custom Scrollbar
    &::-webkit-scrollbar {
      width: 4px; // Thinner scrollbar
    }
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
    
    &.history-timeline {
      gap: 1rem; // Reduced gap
      padding-left: 0.6rem; // Reduced padding
      border-left: 2px solid rgba(255, 255, 255, 0.1);
      margin-left: 0.4rem;
    
    .timeline-item {
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        left: -1.1rem; // Adjusted align
        top: 0.3rem;
        width: 6px; // Smaller dot
        height: 6px; // Smaller dot
        background: $color-text-accent;
        border-radius: 50%;
        box-shadow: 0 0 6px $color-text-accent;
      }
      
      .year {
        font-size: 0.75rem; // Reduced font size
        color: $color-text-secondary;
        margin-bottom: 0.1rem;
      }
      
      .event-details {
        h4 {
          margin: 0;
          font-size: 1.2rem; // Further increased
        }
        
        .name-evolution {
          font-size: 1.3rem; // Further increased
          font-weight: bold;
          color: $color-text-accent;
          margin: 0.1rem 0;
        }
        
        .desc {
          font-size: 1.05rem; // Further increased
          color: $color-text-secondary;
          line-height: 1.4; 
        }
      }
    }
  }

  &.etymology-content {
    .hanzi-display {
      flex-shrink: 0;
      margin-bottom: 0.5rem; // Reduced margin
      display: flex;
      justify-content: center;
      min-height: 140px; // Reduced height
      transform: scale(0.8); // Scale down the hanzi viewer
      transform-origin: center center;
    }

    .etymology-text {
      text-align: justify;
      
      h3 {
        color: $color-text-accent;
        margin-bottom: 0.2rem;
        margin-top: 0;
        font-size: 1.1rem; // Increased font size
      }
      
      p {
        line-height: 1.4; // Slightly increased line height
        margin-bottom: 0.4rem;
        font-size: 0.95rem; // Increased font size
      }
    
      cite {
        display: block;
        text-align: right;
        font-size: 0.8rem; // Increased font size
        color: $color-text-secondary;
        font-style: italic;
        margin-top: 0.2rem;
      }
    }
  }
}

// Media query adjustment
@media (max-width: 1024px) {
  .content-split {
    grid-template-columns: 1fr; 
    overflow-y: auto; 
    display: flex;
    flex-direction: column;
  }
  
  .detail-view {
    overflow-y: auto;
    display: block; 
    height: auto;
    min-height: 100%;
  }
  
  .lab-panel {
    height: 300px; // Reduced height
    flex-shrink: 0;
  }
  
  .library-panel {
    height: auto;
    min-height: 300px; // Reduced height
  }
}

  .error-state {
    color: white;
    text-align: center;
    margin-top: 20%;
    
    a {
      color: $color-text-accent;
    }
  }
</style>
