<script setup lang="ts">
import { ref, toRef, onMounted, onBeforeUnmount } from 'vue';
import { useHanziEvolution } from '../composables/useHanziEvolution';

const props = defineProps<{
  char: string;
}>();

const container = ref<HTMLElement | null>(null);

const {
  currentStage,
  isPlaying,
  isCombined,
  isUsingRadical,
  radicalChar,
  combinedData,
  hasAncientData,
  currentSvgPath,
  combinedPaths,
  stageLabel,
  replayKey,
  initWriter,
  cleanup,
  replay,
  playEvolution
} = useHanziEvolution({
  char: toRef(props, 'char'),
  container
});

onMounted(() => {
  initWriter();
});

onBeforeUnmount(() => {
  cleanup();
});
</script>

<template>
  <div class="hanzi-evolution">
    <div class="display-card" @click="replay">
      <div class="canvas-wrapper">
        <!-- Standard Hanzi Writer Container -->
        <div 
          ref="container" 
          class="writer-container" 
          :style="{ display: currentStage === 'standard' ? 'block' : 'none' }"
        ></div>

        <!-- Ancient Script SVG Container -->
        <div 
          v-if="currentStage !== 'standard'" 
          class="ancient-container"
          :key="replayKey"
        >
          <svg viewBox="0 0 100 100" class="ancient-svg">
            <!-- Single Component Mode -->
            <path 
              v-if="!isCombined"
              :d="currentSvgPath" 
              fill="none" 
              stroke="#ffaa00" 
              stroke-width="3" 
              stroke-linecap="round" 
              stroke-linejoin="round"
              class="draw-path"
            />
            
            <!-- Combined Component Mode -->
            <g v-else-if="combinedPaths">
              <!-- Radical: Yellow -->
              <path 
                :d="combinedPaths.radical" 
                :transform="combinedPaths.radicalTransform"
                fill="none" 
                stroke="#ffaa00" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="draw-path"
              />
              <!-- Phonetic: Blue (matching Kaiti) -->
              <path 
                :d="combinedPaths.phonetic" 
                :transform="combinedPaths.phoneticTransform"
                fill="none" 
                stroke="#00aaff" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="draw-path delay-path"
              />
            </g>
          </svg>
        </div>
      </div>
      
      <div class="stage-badge">
        <span class="stage-name">{{ stageLabel }}</span>
        <span v-if="isUsingRadical && currentStage !== 'standard'" class="meta-note">
          部首演变
        </span>
        <span v-if="isCombined && currentStage !== 'standard'" class="meta-note">
          组合演变
        </span>
      </div>
    </div>

    <div class="controls-panel">
      <div v-if="isUsingRadical" class="info-text">
        <span class="icon">ℹ️</span>
        <span>{{ props.char }}为近代造字，展示其义符“{{ radicalChar }}”的演变</span>
      </div>
      <div v-if="isCombined" class="info-text">
        <span class="icon">ℹ️</span>
        <span>{{ props.char }}为形声字，展示“{{ combinedData?.radical }}”与“{{ combinedData?.phonetic }}”的组合演变</span>
      </div>
      
      <div class="actions">
        <button class="btn btn-secondary" @click="replay" :disabled="isPlaying">
          <span class="icon">↺</span> 重播
        </button>
        <button 
          v-if="hasAncientData" 
          class="btn btn-primary"
          @click="playEvolution" 
          :disabled="isPlaying"
        >
          <span class="icon">▶</span> 演变动画
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';

.hanzi-evolution {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.display-card {
  @include glass-panel;
  position: relative;
  padding: 1.5rem;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 200px;
  
  &:hover {
    @include glass-panel-hover;
    transform: translateY(-2px);
  }
}

.canvas-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ancient-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .ancient-svg {
    width: 90%;
    height: 90%;
    filter: drop-shadow(0 0 8px rgba(255, 170, 0, 0.4));
    
    .draw-path {
      stroke-dasharray: 1500; // Increased safety margin
      stroke-dashoffset: 1500;
      animation: draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; // Smoother easing
      
      &.delay-path {
        animation-delay: 0.8s;
      }
    }
  }
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.stage-badge {
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  
  .stage-name {
    font-family: $font-family-serif;
    font-size: 1.1rem;
    font-weight: bold;
    color: $color-alkyne;
    @include text-glow($color-alkyne);
    letter-spacing: 2px;
  }
  
  .meta-note {
    font-size: 0.7rem;
    color: rgba($color-text-secondary, 0.8);
    margin-top: 2px;
  }
}

.controls-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  
  .info-text {
    font-size: 0.85rem;
    color: $color-text-secondary;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    
    .icon {
      font-size: 1rem;
    }
  }
  
  .actions {
    display: flex;
    gap: 1rem;
  }
}

.btn {
  background: transparent;
  border: 1px solid transparent;
  padding: 0.6rem 1.4rem; // Slightly wider padding
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.1rem; // Increased font size
  font-weight: 500; // Slightly bolder
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  backdrop-filter: blur(4px);
  
  .icon {
    font-size: 1.2em; // Larger icon
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(1);
  }
}

.btn-secondary {
  border-color: rgba($color-text-accent, 0.3);
  color: $color-text-accent;
  
  &:hover:not(:disabled) {
    background: rgba($color-text-accent, 0.1);
    border-color: $color-text-accent;
    box-shadow: 0 0 15px rgba($color-text-accent, 0.2);
  }
}

.btn-primary {
  border-color: rgba($color-alkyne, 0.5);
  color: $color-alkyne;
  
  &:hover:not(:disabled) {
    background: rgba($color-alkyne, 0.1);
    border-color: $color-alkyne;
    box-shadow: 0 0 15px rgba($color-alkyne, 0.3);
  }
}
</style>
