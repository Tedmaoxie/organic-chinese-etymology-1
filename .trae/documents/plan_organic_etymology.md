# 📅 开发计划：有机官能团 · 说文解字可视化教学系统

本计划旨在构建一个达到“教研展示级”视觉标准的高中化学交互网页系统。开发将严格遵循《Organic Chinese Etymology.md》中定义的学术考据与设计规范。

## 阶段一：环境搭建与基础设施 (Phase 1: Infrastructure)
- [ ] **初始化项目**
    - 使用 Vite + Vue 3 + TypeScript 创建项目。
    - 配置 ESLint + Prettier 确保代码规范。
    - 配置路径别名 (`@/`)。
- [ ] **安装核心依赖**
    - `three`: 3D 渲染引擎。
    - `gsap`: 高级动画引擎 (含 ScrollTrigger, MorphSVG 插件)。
    - `hanzi-writer`: 汉字笔画书写库。
    - `tailwindcss` 或 `sass`: 样式处理（推荐 Tailwind 用于快速布局，Sass 用于复杂特效）。
    - `pinia`: 状态管理。
- [ ] **构建全局布局**
    - 实现全屏深色极光背景 (`AuroraBackground.vue`)。
    - 搭建页面骨架：导航栏、主体内容区、底部控制栏。
    - 定义全局 CSS 变量（颜色系统、玻璃拟态参数）。

## 阶段二：核心数据与逻辑层 (Phase 2: Data & Logic)
- [ ] **数据结构定义**
    - 创建 `src/data/functionalGroups.ts`。
    - 录入 8 大官能团（烷、烯、炔、醇、醛、酮、醚、酯）的完整数据。
    - 数据包含：基本信息、SMILES/3D坐标、学术考据文本、历史演变节点、汉字演化 SVG 路径（或占位符）。
- [ ] **状态管理**
    - 使用 Pinia 创建 `useChemicalStore`。
    - 管理当前选中的官能团、交互状态（如高亮原子索引）、语音播放状态。

## 阶段三：3D 分子可视化模块 (Phase 3: 3D Visualization)
- [ ] **3D 场景组件 (`MoleculeViewer.vue`)**
    - 初始化 Three.js 场景、相机、渲染器（开启 alpha 透明）。
    - 配置灯光系统：环境光 + 定向光 + **边缘光 (Rim Light)** 以增强立体感。
- [ ] **分子生成逻辑**
    - 编写 `MoleculeBuilder` 类：根据原子坐标生成球体（原子）和圆柱体（键）。
    - 材质调节：使用 `MeshPhysicalMaterial` 模拟类似玻璃/树脂的高级质感。
- [ ] **交互实现**
    - 实现鼠标悬停/点击交互（Raycaster）。
    - 实现原子高亮/脉冲效果（配合汉字交互）。

## 阶段四：汉字演化与书写模块 (Phase 4: Etymology & Calligraphy)
- [ ] **汉字书写组件 (`HanziWriter.vue`)**
    - 集成 Hanzi Writer。
    - 封装播放、暂停、重播控制接口。
    - 实现墨迹扩散效果（CSS/SVG 滤镜）。
- [ ] **字形演化组件 (`EvolutionTimeline.vue`)**
    - 使用 GSAP 实现 SVG 路径变形动画（甲骨文 → 金文 → ... → 楷书）。
    - 实现“文物叠影”效果：背景淡入对应的实物图片。
- [ ] **命名历史时间轴 (`HistoryTimeline.vue`)**
    - 垂直或水平时间轴布局，展示 1908-1932 年的命名变迁。

## 阶段五：UI 交互与视觉打磨 (Phase 5: UI & Polish)
- [ ] **界面组件开发**
    - 开发玻璃拟态卡片组件 (`GlassCard.vue`)。
    - 开发底部导航/控制栏。
- [ ] **粒子系统 (`ParticleField.vue`)**
    - 实现背景动态粒子场，模拟电子云。
    - 实现粒子随鼠标移动的扰动效果。
- [ ] **跨模块联动**
    - 绑定交互：点击右侧“偏旁” -> 左侧 3D 模型对应部分高亮。
    - 绑定交互：滚动页面 -> 触发视差滚动与背景色变。
- [ ] **语音合成**
    - 集成 Web Speech API，朗读官能团名称与简介。

## 阶段六：测试与优化 (Phase 6: Test & Build)
- [ ] **性能优化**
    - 3D 模型面数优化。
    - 动画帧率测试（目标 60fps）。
- [ ] **兼容性测试**
    - 检查不同分辨率下的响应式布局。
- [ ] **最终验收**
    - 对照《Organic Chinese Etymology.md》逐项核对功能。
