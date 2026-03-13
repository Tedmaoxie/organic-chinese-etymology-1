
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { functionalGroups, basicRoots } from '../data/functionalGroups';

const router = useRouter();

// Use real data
const groups = functionalGroups;
const roots = basicRoots;

// Helper to format chemical formula with subscripts
const formatFormula = (formula: string) => {
  // Matches element symbol or closing paren followed by subscripts
  // Subscripts can be:
  // 1. Complex: 2n+2, 2n-6, 2n
  // 2. Simple variables: n, m, x, y
  // 3. Numbers: \d+
  // We match longer patterns first to avoid partial matches
  return formula.replace(/([a-zA-Z\)])(2n[+\-]\d+|2n|n|m|x|y|\d+)/g, '$1<sub>$2</sub>');
};

const selectGroup = (id: string) => {
  console.log('Navigating to group:', id);
  router.push({ name: 'detail', params: { id } });
};
</script>

<template>
  <div class="home-view">
    <section class="hero-section">
      <h1 class="main-title">有机官能团 · 说文解字</h1>
      <p class="subtitle">从分子结构到汉字构形的跨学科可视化研究</p>
    </section>

    <div class="decks-container">
        <section class="navigation-deck main-deck">
          <h2 class="section-title">有机物类别</h2>
          <div class="card-track">
            <div 
              v-for="group in groups" 
              :key="group.id" 
              class="glass-card"
              @click="selectGroup(group.id)"
            >
              <div class="card-content">
                <span class="chem-name">{{ group.name }}</span>
                <span class="chem-formula" v-html="formatFormula(group.formula)"></span>
              </div>
            </div>
          </div>
        </section>

        <section class="navigation-deck roots-deck">
          <h2 class="section-title">基础字根</h2>
          <div class="card-track">
            <div 
              v-for="root in roots" 
              :key="root.id" 
              class="glass-card root-card"
              @click="selectGroup(root.id)"
            >
              <div class="card-content">
                <span class="chem-name">{{ root.name }}</span>
                <span class="chem-formula" v-html="formatFormula(root.formula)"></span>
              </div>
            </div>
          </div>
        </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

.home-view {
  width: 100%;
  max-width: 1400px; // Increased max-width
  display: flex;
  flex-direction: column;
  gap: 0.5rem; // Minimal gap
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2vh 0; // Very tight top padding
  box-sizing: border-box;
  overflow: hidden; // Prevent scrollbar on body if content fits
}

.hero-section {
  text-align: center;
  margin-top: 0;
  flex-shrink: 0; // Prevent shrinking

  .main-title {
    font-size: 2.5rem; // Smaller title
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(to right, #fff, $color-text-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @include text-glow($color-text-accent);
  }

  .subtitle {
    font-size: 1rem;
    color: $color-text-secondary;
    margin: 0;
  }
}

.decks-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    flex: 1;
    overflow: hidden; // Contain scrollbars
}

.section-title {
  font-size: 1.2rem; // Smaller section title
  color: $color-text-accent;
  margin-bottom: 0.5rem;
  text-align: center;
  position: sticky;
  left: 0;
  width: 100%;
  font-weight: 300;
  letter-spacing: 2px;
  opacity: 0.8;
  background: transparent; // Ensure no background blocking
  z-index: 10;
}

.navigation-deck {
  width: 100%;
  overflow-x: auto;
  padding: 0.5rem 0; // Minimal padding
  max-width: 100vw;
  
  .card-track {
    display: flex;
    gap: 1.5rem; // Reduced gap
    padding: 0 2rem; // Reduced side padding
    min-width: max-content;
    margin: 0 auto; 
    justify-content: center; // Default center
    padding-bottom: 1rem;
  }
}

// Global scrollbar styles (moved here to avoid duplication or scoped issues)
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.glass-card {
  @include glass-panel;
  width: 140px; // Standardized width
  height: 140px; // Standardized height (was 180px)
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  flex-shrink: 0; // Don't shrink cards

  &:hover {
    transform: translateY(-5px) scale(1.05); // Reduced hover effect
    box-shadow: 0 10px 30px rgba(0, 170, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);

    .chem-name {
      color: $color-text-accent;
      transform: scale(1.1);
      text-shadow: 0 0 10px rgba(0, 170, 255, 0.8);
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
  }

  .chem-name {
    font-size: 2.5rem; // Smaller text
    font-weight: bold;
    transition: all 0.3s ease;
    font-family: 'Noto Serif SC', serif;
  }

  .chem-formula {
    font-size: 0.9rem; // Smaller formula
    color: $color-text-secondary;
    font-family: 'Courier New', monospace;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
  }
}

.roots-deck {
  .glass-card {
    height: 140px; // Even smaller for roots if desired, or keep consistent
    width: 140px; // Match width if preferred, or keep square-ish
    
    .chem-name {
      font-size: 2rem;
    }
  }
}
</style>
