# 🎓 有机官能团 · 说文解字可视化教学系统
## Organic Functional Groups × Chinese Etymology Visualization Lab

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r158-black.svg)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🧠 项目定位

本项目是一个面向高中化学教学与教研展示的沉浸式交互网页系统。它独特地结合了**有机化学结构**与**汉字说文解字**，通过可视化手段还原中文化学命名的学术渊源与演进逻辑。

### 核心亮点
- **🧪 3D 分子可视化**：基于 Three.js 的 3D 球棍模型，支持旋转缩放，官能团关键部位脉冲高亮。
- **📜 学术考据级演进**：深度整合何涓老师关于“1908–1932 年间中文化学命名演进”的研究成果，精准还原从虞和钦意译方案到郑贞文标准方案的历史脉络。
- **✍️ 汉字构形解析**：遵循学术文献（形声/会意/象形），拆解“烷、烯、炔、醇、醛、酮、醚、酯”等核心汉字的构字逻辑。
- **🎨 极光美学视觉**：采用“玻璃拟态 2.0”与深色理性美学风格，配合极光渐变背景，达到教研展示级的视觉质感。

---

## 🧪 核心模块与学术背景

### 1️⃣ 汉字构形考据（部分示例）
- **烷 (wán)**：火 + 完。“完”意为“完足、饱足”，指碳原子的四个价键完全被氢原子饱和（饱和烃）。
- **醚 (mí)**：酉 + 迷。因其早期作为麻醉剂（使人昏迷）的特性而由留欧中华化学会命名。
- **苯 (běn)**：草字头（表芳香族/源于植物）+ 本（Benzene 首音节音译）。

### 2️⃣ 命名演进时间轴
系统记录了从 19 世纪末（徐寿、丁韪良）到 1932 年《化学命名原则》确立期间，中国化学名词从“音译派”、“意译派”到“象形派”的激烈博弈与最终融合。

---

## 🛠️ 技术栈

- **框架**: [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **构建工具**: [Vite](https://vitejs.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **3D 引擎**: [Three.js](https://threejs.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **样式**: SCSS + [Glassmorphism](https://glassmorphism.com/)

---

## 📂 项目结构

```text
.
├── web-app/              # 核心网页应用源代码
│   ├── src/
│   │   ├── components/   # UI 组件 (3D 查看器, 演进动画等)
│   │   ├── data/         # 核心学术数据库 (官能团演进史)
│   │   ├── views/        # 页面视图 (首页, 详情页)
│   │   └── assets/       # 静态资源与样式
│   ├── public/           # 公共资源
│   └── package.json      # 项目配置与依赖
├── README.md             # 本说明文件
└── ...                   # 学术文献参考 (PDF)
```

---

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/您的用户名/organic-chinese-etymology.git
cd organic-chinese-etymology/web-app
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
npm run dev
```

### 4. 生产打包
```bash
npm run build
```

---

## 📖 学术参考与致谢

本项目数据主要参考以下学术成果：
1. 何涓，《有机化合物中文命名的演进：1908～1932》。
2. 何涓，《中文化学名词醇醛酮醚酯之由来》。
3. 何涓，《中文化学名词烷、烯、炔之由来》。
4. 何涓，《轮、困还是苯？——有机化合物命名用字音译原则之由来》。

在此向致力于中国近现代化学名词研究的学者们致以崇高的敬意。

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源。
