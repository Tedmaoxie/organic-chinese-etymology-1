
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isLightMode = ref(localStorage.getItem('theme') === 'light')

  const toggleTheme = () => {
    isLightMode.value = !isLightMode.value
    localStorage.setItem('theme', isLightMode.value ? 'light' : 'dark')
  }

  // Apply theme to document
  watch(isLightMode, (val) => {
    if (val) {
      document.documentElement.classList.add('light-mode')
    } else {
      document.documentElement.classList.remove('light-mode')
    }
  }, { immediate: true })

  return {
    isLightMode,
    toggleTheme
  }
})
