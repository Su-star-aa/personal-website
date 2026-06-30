# 个人网站 — 吴苏圆

> **成果见证努力** · Effort Makes Results

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-brightgreen)](https://su-star-aa.github.io/personal-website/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

🔗 **在线访问：https://su-star-aa.github.io/personal-website/**

---

## 简介

这是我的个人展示网站，用于向同学朋友展示个人介绍、技能、项目作品和联系方式。

### 功能

- ☀🌙 深色/浅色主题切换（自动记住选择）
- 🇨🇳/🇬🇧 中英双语切换
- ⌨️ Hero 区域打字机动画
- ✨ 滚动淡入动画
- 🔍 项目按技术栈筛选
- ⬆️ 回到顶部按钮
- 📱 响应式设计（手机 / 平板 / 桌面）
- 🚀 零依赖，纯 HTML + CSS + JavaScript

---

## 技术栈

| 层 | 技术 |
|----|------|
| 结构 | HTML5 语义化标签 |
| 样式 | CSS3（自定义属性 + Flexbox + Grid） |
| 交互 | 原生 JavaScript（ES6+） |
| 字体 | Google Fonts（Archivo + Space Grotesk） |
| 部署 | GitHub Pages |

---

## 文件结构

```
personal-website/
├── index.html      # 主页面（6 个区块）
├── css/
│   └── style.css   # 样式文件
├── js/
│   └── main.js     # 交互脚本
├── .nojekyll       # GitHub Pages 配置
└── README.md       # 本文件
```

---

## 本地运行

直接双击 `index.html` 在浏览器中打开即可，无需安装任何依赖。

或者使用任意 HTTP 服务器：

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .
```

然后访问 `http://localhost:8000`。

---

## 页面结构

```
┌─────────────────────────┐
│      固定导航栏          │
├─────────────────────────┤
│  ① Hero（首页）          │
│     - 头像 + 姓名        │
│     - 打字机标语          │
│     - 社交链接           │
├─────────────────────────┤
│  ② 关于我（About）       │
│     - 个人介绍           │
│     - 教育背景           │
├─────────────────────────┤
│  ③ 技能（Skills）        │
│     - 前端 / 后端 / 工具  │
├─────────────────────────┤
│  ④ 项目（Projects）      │
│     - 项目卡片 + 筛选     │
├─────────────────────────┤
│  ⑤ 联系方式（Contact）   │
│     - GitHub / Email     │
├─────────────────────────┤
│  ⑥ 页脚（Footer）        │
└─────────────────────────┘
```

---

## 设计参考

本项目使用 [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) 设计系统生成：

| 维度 | 值 |
|------|-----|
| 设计风格 | Exaggerated Minimalism（极简主义） |
| 配色方案 | 黑白灰 + 蓝色强调 (#2563EB) |
| 字体配对 | Archivo（标题）+ Space Grotesk（正文） |
| 布局模式 | Portfolio Grid（单列居中，大量留白） |

---

## 许可

MIT License © 2026 吴苏圆
