# 🧪 有机官能团 · 说文解字可视化前端应用 (Web App)

本项目是“有机官能团 · 说文解字可视化教学系统”的前端应用部分。

## 🛠️ 技术栈与核心架构

- **Vue 3 (Composition API)**: 核心组件化开发框架。
- **Vite**: 极速构建与热更新工具。
- **TypeScript**: 提供强类型支持，增强代码稳健性。
- **Three.js**: 渲染 3D 球棍分子模型，提供沉浸式交互体验。
- **Pinia**: 轻量化状态管理，用于存储与同步官能团演进数据。
- **SCSS**: 实现复杂的玻璃拟态与极光渐变样式。

## 📂 核心目录说明

- `src/components/`: 
  - `MoleculeViewer.vue`: 基于 Three.js 的 3D 分子渲染核心组件。
  - `HanziEvolution.vue`: 负责汉字五阶段演化动画展示。
- `src/data/`: 
  - `functionalGroups.ts`: 核心学术数据库，包含所有官能团的构形考据、命名历史及 SMILES 结构。
- `src/views/`: 
  - `HomeView.vue`: 首页粒子背景与官能团卡片导航。
  - `DetailView.vue`: 官能团详情展示页，集 3D、历史、汉字解析于一体。

## 🚀 本地开发指南

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 打包生成生产环境文件 (dist)
```bash
npm run build
```

## 🌐 部署说明 (GitHub Pages)

本项目专为静态网页部署设计，您可以直接将 `dist` 文件夹内容部署至 GitHub Pages。建议使用 GitHub Actions 实现自动化构建与发布。
