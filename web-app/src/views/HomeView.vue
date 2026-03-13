
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { functionalGroups, basicRoots } from '../data/functionalGroups';

const router = useRouter();

// 数据源
const groups = functionalGroups;
const roots = basicRoots;

// 视图模式：'scroll' (默认) 或 'carousel'
const viewMode = ref<'scroll' | 'carousel'>((localStorage.getItem('viewMode') as 'scroll' | 'carousel') || 'scroll');

// 切换视图模式
const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'scroll' ? 'carousel' : 'scroll';
  localStorage.setItem('viewMode', viewMode.value);
};

// 3D 旋转木马状态
const rotationGroups = ref(0);
const rotationRoots = ref(0);

// 拖拽与惯性相关状态
let isDragging = false;
let startX = 0;
let currentRotationStart = 0;
let activeDeck: 'groups' | 'roots' | null = null;
let lastX = 0;
let lastTime = 0;
let velocity = 0;
let rafId: number | null = null;
let autoRotateId: number | null = null;

// 格式化化学式
const formatFormula = (formula: string) => {
  return formula.replace(/([a-zA-Z\)])(2n[+\-]\d+|2n|n|m|x|y|\d+)/g, '$1<sub>$2</sub>');
};

// 计算每个卡片的样式
const getCardStyle = (index: number, total: number, rotation: number) => {
  const angleStep = 360 / total;
  const currentAngle = angleStep * index + rotation;
  // 旋转半径
  const radius = 350; 
  
  // 计算透明度和层级，使得背面的卡片变暗且在后面
  // 使用余弦值判断卡片是在前面还是后面
  const rad = (currentAngle * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  
  // 简单的背面剔除或变暗效果
  // cosVal > 0 表示在前半圆（面向用户），< 0 表示在后半圆
  // 稍微放宽一点范围，让侧面的也能交互
  const isFront = cosVal > -0.5; // 放宽范围，让更多卡片可见
  const opacity = isFront ? 1 : 0.3;
  const zIndex = Math.round(cosVal * 100);
  
  // 始终允许交互，只是背面变暗
  const pointerEvents: 'auto' | 'none' = 'auto';

  // 增加border颜色动态变化，防止白边消失
  const borderColor = isFront ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)';

  // 增加box-shadow，增强可见性
  const boxShadow = isFront 
    ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' 
    : '0 4px 16px 0 rgba(31, 38, 135, 0.1)';

  return {
    transform: `rotateY(${currentAngle}deg) translateZ(${radius}px)`,
    opacity,
    zIndex,
    pointerEvents,
    borderColor,
    boxShadow
  };
};

// 处理鼠标按下
const handleMouseDown = (e: MouseEvent, deck: 'groups' | 'roots') => {
  if (viewMode.value !== 'carousel') return;
  isDragging = true;
  startX = e.clientX;
  activeDeck = deck;
  currentRotationStart = deck === 'groups' ? rotationGroups.value : rotationRoots.value;
  
  // 重置惯性状态
  lastX = e.clientX;
  lastTime = performance.now();
  velocity = 0;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  
  document.body.style.cursor = 'grabbing';
};

// 处理鼠标移动
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging || !activeDeck) return;
  
  const currentX = e.clientX;
  const deltaX = currentX - startX;
  const currentTime = performance.now();
  
  // 计算速度 (pixels / ms)
  const dt = currentTime - lastTime;
  if (dt > 0) {
    velocity = (currentX - lastX) / dt;
  }
  
  lastX = currentX;
  lastTime = currentTime;

  // 更新旋转角度
  const sensitivity = 0.2;
  if (activeDeck === 'groups') {
    rotationGroups.value = currentRotationStart + deltaX * sensitivity;
  } else {
    rotationRoots.value = currentRotationStart + deltaX * sensitivity;
  }
};

// 惯性动画循环
const inertiaLoop = () => {
  if (!activeDeck) return;

  // 摩擦系数
  const friction = 0.95;
  velocity *= friction;

  // 速度阈值，小于此值停止
  if (Math.abs(velocity) < 0.01) {
    velocity = 0;
    activeDeck = null; // 停止动画
    rafId = null;
    return;
  }

  // 更新角度
  if (activeDeck === 'groups') {
    rotationGroups.value += velocity * 10;
  } else {
    rotationRoots.value += velocity * 10;
  }

  rafId = requestAnimationFrame(inertiaLoop);
};

// 自动旋转循环
const startAutoRotate = () => {
  if (autoRotateId) return;
  
  const animate = () => {
    // 只有在非拖拽且非惯性滑动时才自动旋转
    if (!isDragging && !activeDeck && viewMode.value === 'carousel') {
      // 旋转速度
      const speed = 0.05; 
      rotationGroups.value -= speed;
      rotationRoots.value += speed; // 反向旋转，增加趣味性
    }
    autoRotateId = requestAnimationFrame(animate);
  };
  
  animate();
};

const stopAutoRotate = () => {
  if (autoRotateId) {
    cancelAnimationFrame(autoRotateId);
    autoRotateId = null;
  }
};

// 处理鼠标抬起/离开
const handleMouseUp = () => {
  if (!isDragging) return;
  
  isDragging = false;
  document.body.style.cursor = '';

  // 开始惯性滑动
  if (Math.abs(velocity) > 0.1) {
    inertiaLoop();
  } else {
    activeDeck = null;
  }
};

// 监听视图模式变化，控制自动旋转
watch(viewMode, (newMode) => {
  if (newMode === 'carousel') {
    startAutoRotate();
  } else {
    stopAutoRotate();
    // 重置旋转角度，以免切回来时角度很奇怪（可选）
    rotationGroups.value = 0;
    rotationRoots.value = 0;
  }
});

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('mouseleave', handleMouseUp);
  
  if (viewMode.value === 'carousel') {
    startAutoRotate();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
  window.removeEventListener('mouseleave', handleMouseUp);
  if (rafId) cancelAnimationFrame(rafId);
  stopAutoRotate();
});

const selectGroup = (id: string) => {
  if (Math.abs(velocity) > 0.1) return;
  router.push({ name: 'detail', params: { id } });
};
</script>

<template>
  <div class="home-view">
    <section class="hero-section">
      <h1 class="main-title">有机词源学 之 有机官能团 · 说文解字</h1>
      <p class="subtitle">从分子结构到汉字构形的跨学科可视化研究</p>
    </section>
    
    <!-- 视图切换按钮 (悬浮在右上角) -->
    <div class="view-toggle">
      <button class="toggle-btn" @click="toggleViewMode">
        {{ viewMode === 'scroll' ? '切换至 3D 环视模式' : '切换至 列表滚动模式' }}
      </button>
    </div>

    <div class="decks-container" :class="{ 'carousel-mode': viewMode === 'carousel' }">
        <!-- 有机物类别 -->
        <section class="navigation-deck main-deck">
          <h2 class="section-title">有机物类别</h2>
          
          <!-- Scroll Mode -->
          <div v-if="viewMode === 'scroll'" class="card-track">
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

          <!-- Carousel Mode -->
          <div 
            v-else
            class="carousel-container"
            @mousedown="handleMouseDown($event, 'groups')"
          >
            <div 
              class="carousel-stage"
            >
              <div 
                v-for="(group, index) in groups" 
                :key="group.id" 
                class="glass-card carousel-item"
                :style="getCardStyle(index, groups.length, rotationGroups)"
                @click.stop="selectGroup(group.id)"
              >
                <div class="card-content">
                  <span class="chem-name">{{ group.name }}</span>
                  <span class="chem-formula" v-html="formatFormula(group.formula)"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 基础字根 -->
        <section class="navigation-deck roots-deck">
          <h2 class="section-title">基础字根</h2>
          
          <!-- Scroll Mode -->
          <div v-if="viewMode === 'scroll'" class="card-track">
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

          <!-- Carousel Mode -->
          <div 
            v-else
            class="carousel-container"
            @mousedown="handleMouseDown($event, 'roots')"
          >
            <div 
              class="carousel-stage"
            >
              <div 
                v-for="(root, index) in roots" 
                :key="root.id" 
                class="glass-card carousel-item root-card"
                :style="getCardStyle(index, roots.length, rotationRoots)"
                @click.stop="selectGroup(root.id)"
              >
                <div class="card-content">
                  <span class="chem-name">{{ root.name }}</span>
                  <span class="chem-formula" v-html="formatFormula(root.formula)"></span>
                </div>
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
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2vh 0;
  box-sizing: border-box;
  overflow: hidden;
}

.hero-section {
    position: relative; // 确保子元素绝对定位相对于此
    text-align: center;
    margin-top: 0;
    flex-shrink: 0;
    
    // 增加额外的padding-bottom给toggle button腾出空间，如果需要的话
    // 或者我们直接把toggle button放在section外面，然后通过绝对定位定位到合适位置

    .main-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(to right, #fff, $color-text-accent);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      @include text-glow($color-text-accent);
    }

    .subtitle {
      font-size: 1rem;
      color: $color-text-secondary;
      margin: 0;
    }
  }

  .view-toggle {
  position: absolute;
  top: 6rem; // 调整top值，使其位于Home/About下方
  right: calc((100% - 1200px) / 2 + 1.5rem); // 对齐最大宽度容器的右侧padding
  z-index: 100;
  
  @media (max-width: 1240px) {
    right: 2rem;
  }
  
  .toggle-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    color: $color-text-secondary; // 稍微弱化颜色，不抢视觉
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s;
    backdrop-filter: blur(5px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: $color-text-accent;
      color: $color-text-primary;
    }
  }
}

.decks-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; // 保持间距一致，防止切换模式时标题抖动
    width: 100%;
    flex: 1;
    overflow: hidden;

    &.carousel-mode {
      .roots-deck {
        margin-top: -3rem; // 3D 模式下将“基础字根”整体再上移一些（原为 -2.5rem）
      }
    }
}

.section-title {
  font-size: 1.2rem;
  color: $color-text-accent;
  margin-bottom: 0.5rem;
  text-align: center;
  position: sticky;
  left: 0;
  width: 100%;
  font-weight: 300;
  letter-spacing: 2px;
  opacity: 0.8;
  background: transparent;
  z-index: 10;
  pointer-events: none; 
}

.navigation-deck {
  width: 100%;
  padding: 0.5rem 0;
  // Scroll mode styles
  overflow-x: auto;
  
  // Carousel specific overrides
  &:has(.carousel-container) {
    overflow: hidden; // Carousel needs hidden overflow
    perspective: 1200px;
    // 保持 padding 与滚动模式一致，防止标题位置偏移
  }
  
  .card-track {
    display: flex;
    gap: 1.5rem;
    padding: 0 2rem;
    min-width: max-content;
    margin: 0 auto; 
    justify-content: center;
    padding-bottom: 1rem;
  }
  
  .carousel-container {
    height: 200px; // Reduced height to bring titles closer (was 240px)
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: grab;
    user-select: none;
    margin-top: -10px; // Pull up slightly

    &:active {
      cursor: grabbing;
    }
  }

  .carousel-stage {
    width: 140px;
    height: 140px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.1s linear; 
  }

  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease, opacity 0.3s ease, z-index 0.3s;
  }
}

// Global Scrollbar (for Scroll Mode)
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
  width: 140px;
  height: 140px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  // Hover effect only for Scroll Mode (default)
  &:not(.carousel-item):hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 170, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);

    .chem-name {
      color: $color-text-accent;
      transform: scale(1.1);
      text-shadow: 0 0 10px rgba(0, 170, 255, 0.8);
    }
  }
  
  // Hover effect for Carousel Mode (No transform!)
  &.carousel-item:hover {
    // No transform here! It breaks 3D positioning
    box-shadow: 0 10px 30px rgba(0, 170, 255, 0.5);
    border-color: rgba(255, 255, 255, 0.8);
    
    .chem-name {
      color: $color-text-accent;
      // transform: scale(1.1); // Avoid transforming text if it causes issues, but text scale is usually fine
      text-shadow: 0 0 10px rgba(0, 170, 255, 0.8);
    }
    
    // Optional: scale internal content instead of the card
    .card-content {
       transform: scale(1.1); 
       transition: transform 0.3s ease;
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
    // pointer-events: none; // Removed to allow clicks, logic handled in script
  }

  .chem-name {
    font-size: 2.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
    font-family: 'Noto Serif SC', serif;
  }

  .chem-formula {
    font-size: 0.9rem;
    color: $color-text-secondary;
    font-family: 'Courier New', monospace;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
  }
}

.roots-deck {
  .glass-card {
    .chem-name {
      font-size: 2rem;
    }
  }
}
</style>
