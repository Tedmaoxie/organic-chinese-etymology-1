# 🎨 UI 视觉风格提示词指南 (Visual Prompt Guide)

本指南总结了《有机官能团 · 说文解字可视化教学系统》的 UI 设计精髓，可作为未来其他“学术展示型”或“科技感”项目的视觉参考规范。

## 🌟 核心设计语言：玻璃拟态 2.0 (Glassmorphism 2.0)

### 1. 背景层 (Background)
- **极光渐变 (Aurora Gradient)**: 
  - 基础色：深空蓝 (#050a15) 到 深海蓝 (#0a1f3d)。
  - 动态效果：柔和的极光色块在背景中缓慢漂移。
- **粒子场 (Particle Field)**: 
  - 模拟微观原子或星空，增加空间深度感。

### 2. 容器层 (Container/Cards)
- **磨砂材质**: `backdrop-filter: blur(15px)`.
- **微光边缘 (Rim Light)**: 
  - 边框使用半透明白色或浅蓝色 (rgba(255,255,255,0.1))。
  - 顶部边缘增加 1px 的高亮线，模拟光源从上方照射。
- **动态悬停**: 鼠标悬停时，背景模糊度增加，阴影扩散。

### 3. 色彩系统 (Color Palette)
- **功能色**: 
  - 醇类: 翠绿 (#00ff88)
  - 酮类: 亮紫 (#aa00ff)
  - 烃类: 橙红 (#ff5555)
  - 苯: 金黄 (#ffdd00)
- **文字色**: 
  - 标题: 纯白 (#ffffff)
  - 正文: 冰蓝 (#a0aec0)

---

## 🤖 视觉生成提示词 (Prompts)

### 整体布局提示词
> "Modern educational dashboard, glassmorphism UI, deep space blue aurora background, floating scientific 3D models, futuristic typography, clean layout, high transparency, cyber-tech aesthetic, 8k resolution, elegant transitions."

### 交互组件提示词
> "Translucent frosted glass cards, subtle neon rim light, glowing chemical functional groups, interactive 3D molecules, fluid animations, minimalist icons, high-end teaching system interface."

---

## 🛠️ CSS 实现参考 (Snippets)

### 核心玻璃质感
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### 极光背景动画
```css
.aurora-bg {
  background: linear-gradient(135deg, #050a15 0%, #0a1f3d 100%);
  position: relative;
  overflow: hidden;
}
.aurora-light {
  filter: blur(80px);
  opacity: 0.4;
  animation: drift 20s infinite alternate;
}
```

---

## 💡 总结建议
在未来的项目中，若需实现类似的高端感，请务必保持 **“留白、透明度、光影、微动效”** 四者的平衡。避免过多的纯实色块，尽量使用透明渐变来模拟真实物理世界的材质感。
