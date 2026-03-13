<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import AuroraBackground from './components/AuroraBackground.vue'

const stopBackgroundActivities = () => {
  window.speechSynthesis.cancel()
}

const onVisibilityChange = () => {
  if (document.hidden) {
    stopBackgroundActivities()
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', onVisibilityChange)
  window.addEventListener('blur', stopBackgroundActivities)
  window.addEventListener('pagehide', stopBackgroundActivities)
})

onBeforeUnmount(() => {
  stopBackgroundActivities()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  window.removeEventListener('blur', stopBackgroundActivities)
  window.removeEventListener('pagehide', stopBackgroundActivities)
})
</script>

<template>
  <div class="app-container">
    <AuroraBackground />
    
    <header class="glass-header">
      <div class="header-content">
        <div class="logo">Organic Etymology</div>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </header>

    <main class="content-area">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="glass-footer">
      <div class="footer-content">
        <p>&copy; 2026 Organic Chinese Etymology Lab</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import './assets/styles/variables.scss';

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; // Strict height constraint
  position: relative;
  overflow: hidden; // Prevent scrolling on body
  color: $color-text-primary;
}

.glass-header {
  position: sticky;
  top: 0.5rem; // Reduced top margin
  z-index: 100;
  width: calc(100% - 2rem);
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 16px;
  
  @include glass-panel;
  
  transition: all 0.3s ease;

  .header-content {
    padding: 0.5rem 1.5rem; // Reduced padding
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  .logo {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: $color-text-primary;
    font-family: $font-family-serif;
    @include text-glow($color-text-accent);
  }

  nav {
    display: flex;
    gap: 1.5rem;

    a {
      color: $color-text-secondary;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.3s;
      position: relative;

      &:hover {
        color: $color-text-primary;
      }

      &.router-link-active {
        color: $color-text-accent;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: $color-text-accent;
          box-shadow: 0 0 8px $color-text-accent;
          border-radius: 2px;
        }
      }
    }
  }
}

.content-area {
  flex: 1;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 0; // Force flex child to respect container height
  min-height: 0; 
  overflow: hidden; 
}

.glass-footer {
  width: calc(100% - 2rem);
  max-width: 1200px; // Reverted max-width
  margin: 0 auto 0.2rem; // Minimal bottom margin
  border-radius: 12px;
  flex-shrink: 0; // Prevent shrinking
  @include glass-panel;
  
  .footer-content {
    padding: 0.2rem; // Minimal padding
    text-align: center;
    font-size: 0.65rem; 
    color: $color-text-secondary;
    letter-spacing: 1px;
  }
}

// Global Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
