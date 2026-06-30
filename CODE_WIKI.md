# 云梦泽博客项目 - Code Wiki

## 目录

1. [项目概述](#项目概述)
2. [项目架构](#项目架构)
3. [技术栈与依赖](#技术栈与依赖)
4. [目录结构](#目录结构)
5. [核心模块说明](#核心模块说明)
6. [配置文件详解](#配置文件详解)
7. [项目运行方式](#项目运行方式)
8. [部署流程](#部署流程)
9. [内容管理指南](#内容管理指南)
10. [开发工具脚本](#开发工具脚本)
11. [常见问题与解决方案](#常见问题与解决方案)

---

## 项目概述

**项目名称**：云梦泽博客（PerBlog）
**项目版本**：2.0.0
**项目作者**：lidongyalin (霒蚀君)
**项目类型**：基于 VuePress 的个人博客系统

**项目描述**：
云梦泽是一个基于 VuePress 构建的个人博客系统，采用 vuepress-theme-reco 主题，支持多分类、标签管理、时间线展示等功能。项目托管在 GitHub Pages，通过 GitHub Actions 实现自动化部署。

**访问地址**：[https://lidongyalin.github.io](https://lidongyalin.github.io)

**核心特性**：
- 📝 Markdown 写作，专注于内容创作
- 🏷️ 支持多分类、标签系统
- 📅 时间线功能展示文章历程
- 🎨 美观的博客主题界面
- 🚀 自动化 CI/CD 部署流程
- 📱 响应式设计，支持移动端访问

---

## 项目架构

### 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Pages                            │
│                   (静态网站托管服务)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   GitHub Actions                              │
│              (自动化构建与部署流程)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  1. Checkout → 2. Node Setup → 3. Install → 4. Build │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    VuePress 核心                             │
│              (静态网站生成器引擎)                            │
│  ┌────────────────┐  ┌────────────────────────────────┐   │
│  │  Markdown文件  │  │  vuepress-theme-reco主题系统   │   │
│  └────────────────┘  └────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    内容层                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 科技博客 │  │ 商业思维 │  │ 文化历史 │  │ 其他分类 │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 技术架构层次

**静态网站生成层**：VuePress 1.9.10
- 基于 Vue.js 的静态网站生成器
- 支持 Markdown 扩展语法
- 内置 Webpack 配置

**主题层**：vuepress-theme-reco 1.6.17
- 博客专用主题
- 支持分类、标签、时间线
- 响应式设计

**内容层**：Markdown 文档
- Frontmatter 元数据管理
- 分类与标签系统
- 文章时间线组织

**部署层**：GitHub Actions + GitHub Pages
- 自动化构建流程
- 持续集成/持续部署
- 静态资源托管

---

## 技术栈与依赖

### 核心依赖

| 依赖名称 | 版本 | 用途 |
|---------|------|------|
| vuepress | 1.9.10 | Vue 驱动的静态网站生成器 |
| vuepress-theme-reco | 1.6.17 | 博客主题系统 |

### 运行环境要求

- **Node.js**: 推荐 v20.x 或更高版本
- **包管理器**: npm 或 yarn
- **操作系统**: 跨平台支持（Windows/macOS/Linux）

---

## 目录结构

```
/workspace
├── .github/                    # GitHub 配置目录
│   └── workflows/             # GitHub Actions 工作流
│       └── deploy.yml         # 自动化部署配置
│
├── docs/                      # VuePress 文档根目录
│   ├── .vuepress/            # VuePress 配置目录
│   │   ├── config.js        # 主配置文件
│   │   ├── public/          # 静态资源目录
│   │   │   ├── banner.jpg   # 横幅图片
│   │   │   ├── favicon.ico  # 网站图标
│   │   │   ├── head.jpg     # 头像图片
│   │   │   ├── head.png     # 头像图片（PNG格式）
│   │   │   ├── hero_*.png   # 首页英雄图片
│   │   │   └── ...          # 其他图片资源
│   │   └── styles/          # 样式文件
│   │       ├── index.scss   # 主样式文件
│   │       └── palette.scss # 样式变量配置
│   │
│   ├── blogs/               # 博客文章目录
│   │   ├── business/        # 商业思维分类
│   │   │   └── 2026/       # 按年份组织
│   │   ├── culture/         # 文化历史分类
│   │   │   └── 2026/
│   │   ├── education/       # 教育学习分类
│   │   │   └── 2026/
│   │   ├── emotion/         # 情感心理分类
│   │   │   └── 2026/
│   │   ├── game/            # 游戏娱乐分类
│   │   │   └── 2026/
│   │   ├── growth/          # 个人成长分类
│   │   │   └── 2026/
│   │   ├── health/          # 健康生活分类
│   │   │   └── 2026/
│   │   ├── media/           # 影视媒体分类
│   │   │   └── 2026/
│   │   ├── opinion/         # 观点评论分类
│   │   │   └── 2026/
│   │   ├── other/           # 其他分类
│   │   │   └── 2026/
│   │   ├── tech/            # 科技趋势分类
│   │   │   └── 2026/
│   │   └── travel/          # 旅行见闻分类
│   │       └── 2026/
│   │
│   ├── timeline/             # 时间线页面
│   │   └── README.md        # 时间线配置
│   │
│   └── README.md            # 博客首页配置
│
├── .gitignore               # Git 忽略配置
├── .travis.yml              # Travis CI 配置（备用）
├── deploy.sh                # 手动部署脚本
├── fix-images.mjs           # 图片修复工具脚本
├── package.json             # NPM 配置文件
├── package-lock.json        # 依赖锁定文件
└── README.md                # 项目说明文档
```

---

## 核心模块说明

### 1. 配置模块 (docs/.vuepress/config.js)

**主要职责**：
- 定义网站基本信息（标题、描述）
- 配置主题和主题参数
- 设置导航栏和侧边栏
- 配置博客功能（分类、标签）

**关键配置项**：

```javascript
module.exports = {
  title: "云梦泽",                    // 网站标题
  description: "与其感慨路难行 不如马上出发",  // 网站描述
  theme: "reco",                     // 主题选择
  themeConfig: {
    type: "blog",                    // 博客类型
    author: "霒蚀君",                // 作者信息
    search: true,                    // 启用搜索
    lastUpdated: "最后更新时间",      // 最后更新时间
    repo: "lidongyalin/lidongyalin.github.io",  // GitHub 仓库
    docsBranch: "docs",              // 文档分支
    nav: [...],                      // 导航栏配置
    blogConfig: {...}                // 博客配置
  }
}
```

**导航栏结构**：
- 首页：链接到博客首页
- 时间线：展示文章时间线
- 关于：包含 GitHub 链接等

### 2. 内容管理模块 (docs/blogs/)

**目录组织结构**：
```
blogs/
├── [分类名称]/
│   └── [年份]/
│       └── [日期].md
```

**文章 Frontmatter 格式**：

```yaml
---
title: 文章标题
date: 2026-06-26
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
article: true
author: 霒蚀君
---
```

**支持的文章分类**：
1. **business** - 商业思维
2. **culture** - 文化历史
3. **education** - 教育学习
4. **emotion** - 情感心理
5. **game** - 游戏娱乐
6. **growth** - 个人成长
7. **health** - 健康生活
8. **media** - 影视媒体
9. **opinion** - 观点评论
10. **other** - 其他
11. **tech** - 科技趋势
12. **travel** - 旅行见闻

### 3. 首页模块 (docs/README.md)

**功能**：定义博客首页布局

**配置示例**：

```yaml
---
home: true
title: 首页
heroImage: /head.png
heroText: 云梦泽
tagline: 与其感慨路难行 不如马上出发
footer: 云梦泽 | 湘ICP备20014689号-1
---
```

### 4. 时间线模块 (docs/timeline/)

**功能**：展示文章发布时间线

**配置**：

```yaml
---
layout: Timeline
icon: clock
title: 时间线
article: false
sidebar: false
---
```

### 5. 样式模块 (docs/.vuepress/styles/)

**文件说明**：
- `index.scss`: 主样式文件，定义全局样式
- `palette.scss`: 样式变量配置文件，定义主题颜色、字体等

---

## 配置文件详解

### 1. package.json

**位置**：`/workspace/package.json`

**主要脚本命令**：

| 命令 | 功能描述 |
|------|---------|
| `npm run docs:dev` | 启动本地开发服务器 |
| `npm run docs:build` | 构建生产环境静态文件 |
| `npm run dev` | 同 docs:dev，快捷命令 |
| `npm run build` | 同 docs:build，快捷命令 |

**依赖说明**：

```json
{
  "dependencies": {
    "vuepress": "1.9.10",           // VuePress 核心
    "vuepress-theme-reco": "1.6.17"  // 博客主题
  }
}
```

### 2. GitHub Actions 配置 (.github/workflows/deploy.yml)

**触发条件**：
- 推送到 `docs` 分支时自动触发
- 支持手动触发（workflow_dispatch）

**构建流程**：

```yaml
jobs:
  build:
    steps:
      - Checkout        # 检出代码
      - Setup Node.js   # 设置 Node.js 环境
      - Install deps    # 安装依赖
      - Build site      # 构建网站
      - Upload artifact # 上传构建产物

  deploy:
    needs: build
    steps:
      - Deploy to GitHub Pages  # 部署到 GitHub Pages
```

**关键配置**：
- Node.js 版本：20
- 构建输出路径：`docs/.vuepress/dist`
- 部署目标：GitHub Pages

### 3. VuePress 配置 (docs/.vuepress/config.js)

**详细配置说明**：

```javascript
module.exports = {
  // 网站元信息
  title: "云梦泽",
  description: "与其感慨路难行 不如马上出发",
  head: [
    ["link", { rel: "icon", href: "/head.png" }]  // 网站图标
  ],

  // 主题配置
  theme: "reco",
  themeConfig: {
    type: "blog",
    logo: "/head.png",
    author: "霒蚀君",
    authorAvatar: "/head.png",

    // 搜索功能
    search: true,
    searchMaxSuggestions: 10,

    // 最后更新时间
    lastUpdated: "最后更新时间",

    // 仓库信息
    repo: "lidongyalin/lidongyalin.github.io",
    docsRepo: "lidongyalin/lidongyalin.github.io",
    docsDir: "docs",
    docsBranch: "docs",
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",

    // 导航栏
    nav: [
      { text: "首页", link: "/", icon: "reco-home" },
      { text: "时间线", link: "/timeline/", icon: "reco-date" },
      {
        text: "关于",
        items: [
          { text: "GitHub", link: "https://github.com/lidongyalin", icon: "reco-github" }
        ]
      }
    ],

    // 自动侧边栏
    sidebar: "auto",

    // 博客配置
    blogConfig: {
      category: {
        location: 2,
        text: "分类"
      },
      tag: {
        location: 3,
        text: "标签"
      }
    }
  },

  // 插件
  plugins: []
}
```

---

## 项目运行方式

### 本地开发

**步骤 1：安装依赖**

```bash
npm install
```

**步骤 2：启动开发服务器**

```bash
npm run docs:dev
# 或
npm run dev
```

**步骤 3：访问本地网站**

浏览器打开：`http://localhost:8080`

**开发服务器特性**：
- 支持热重载（修改文件自动刷新）
- 实时预览 Markdown 渲染效果
- 提供详细的构建错误提示

### 生产构建

**构建命令**：

```bash
npm run docs:build
# 或
npm run build
```

**构建输出**：
- 输出目录：`docs/.vuepress/dist`
- 内容：静态 HTML、CSS、JavaScript 文件
- 可直接部署到任何静态文件服务器

**构建流程说明**：

```
Markdown 文件 → Markdown 解析 → Vue 组件渲染 → Webpack 构建 → 静态 HTML 文件
```

### 手动部署脚本 (deploy.sh)

**脚本功能**：手动部署到 GitHub Pages

**使用方法**：

```bash
sh deploy.sh
```

**部署流程**：

1. 执行 `npm run build` 生成静态文件
2. 进入 `public` 目录（注意：脚本中目录名可能需要修改为 `docs/.vuepress/dist`）
3. 初始化 Git 仓库
4. 推送到 GitHub Pages 仓库

**注意事项**：
- 需要配置 SSH 密钥
- 使用 force push (`-f`) 覆盖远程分支
- 建议使用 GitHub Actions 自动化部署代替手动脚本

---

## 部署流程

### 自动化部署流程（推荐）

```
代码提交到 docs 分支
        ↓
GitHub Actions 自动触发
        ↓
检出代码 → 安装依赖 → 构建项目
        ↓
上传构建产物到 GitHub Pages
        ↓
网站自动更新
```

**部署检查清单**：

- [ ] 代码已提交到 `docs` 分支
- [ ] GitHub Actions 权限已正确配置
- [ ] GitHub Pages 已启用，源设置为 GitHub Actions
- [ ] 构建产物路径正确（`docs/.vuepress/dist`）

### 手动部署流程

**适用场景**：
- GitHub Actions 故障时的备用方案
- 需要快速验证部署效果

**步骤**：

1. 本地构建：
   ```bash
   npm run build
   ```

2. 进入构建目录：
   ```bash
   cd docs/.vuepress/dist
   ```

3. 初始化 Git 并推送：
   ```bash
   git init
   git add -A
   git commit -m 'deploy'
   git push -f git@github.com:lidongyalin/lidongyalin.github.io.git main
   ```

---

## 内容管理指南

### 新增文章

**步骤 1：创建 Markdown 文件**

在对应分类目录下创建文件：

```
docs/blogs/[分类]/2026/[MMDDXX].md
```

**命名规范**：
- 格式：`MMDDXX.md`
- MM：月份（06 表示 6 月）
- DD：日期（26 表示 26 日）
- XX：序号（01、02、03...）

**示例**：
```
docs/blogs/tech/2026/062601.md   # 6月26日第01篇文章
docs/blogs/tech/2026/062602.md   # 6月26日第02篇文章
```

**步骤 2：编写 Frontmatter**

```yaml
---
title: 文章标题
date: 2026-06-26
categories:
  - 科技趋势
tags:
  - AI
  - 工具
article: true
author: 霒蚀君
---
```

**步骤 3：编写正文**

使用 Markdown 语法编写文章内容。

**步骤 4：提交并推送**

```bash
git add docs/blogs/[分类]/2026/[文件名].md
git commit -m "添加文章：文章标题"
git push origin docs
```

### 文章分类规范

| 分类目录 | 分类名称 | 内容范围 |
|---------|---------|---------|
| business | 商业思维 | 商业模式、创业、投资理财、思维模式 |
| culture | 文化历史 | 历史、传统文化、艺术、文学 |
| education | 教育学习 | 学习方法、教育理念、知识分享 |
| emotion | 情感心理 | 心理健康、人际关系、情感故事 |
| game | 游戏娱乐 | 游戏评测、游戏攻略、娱乐资讯 |
| growth | 个人成长 | 自我提升、职业发展、人生感悟 |
| health | 健康生活 | 健康知识、养生、运动健身 |
| media | 影视媒体 | 电影评论、书籍推荐、媒体观察 |
| opinion | 观点评论 | 时事评论、观点分析、思考感悟 |
| other | 其他 | 不属于以上分类的内容 |
| tech | 科技趋势 | 技术分享、AI、互联网、数码产品 |
| travel | 旅行见闻 | 旅行游记、风景摄影、文化体验 |

### 图片管理

**图片存放位置**：
```
docs/.vuepress/public/
```

**引用方式**：

```markdown
![图片描述](/图片文件名.jpg)
```

**示例**：

```markdown
![头像](/head.png)
![横幅](/banner.jpg)
```

**注意**：
- 图片路径以 `/` 开头，表示从 `public` 目录开始
- 建议使用 WebP 或压缩后的图片格式，提高加载速度
- 图片命名使用小写字母和连字符，如 `my-photo.jpg`

### 文章摘要

**设置摘要分隔符**：

在文章中添加 `<!-- more -->` 注释，前面的内容将作为摘要显示在文章列表中。

**示例**：

```markdown
---
title: 文章标题
date: 2026-06-26
---

这里是文章摘要内容，会显示在列表中。

<!-- more -->

这里是正文内容，点击"阅读全文"后显示。
```

---

## 开发工具脚本

### 图片修复工具 (fix-images.mjs)

**功能**：批量替换文章中的图片链接

**位置**：`/workspace/fix-images.mjs`

**使用方法**：

```bash
node fix-images.mjs
```

**工作原理**：

1. 读取 `docs/views/game/2026/` 目录下的 Markdown 文件
2. 匹配特定格式的图片 URL
3. 替换为 Picsum 随机图片服务
4. 保持原有的 alt 文本不变

**配置说明**：

脚本中定义了文件名与图片种子值的映射：

```javascript
const seedMaps = {
  '062601.md': ['blackmyth-cover', 'blackmyth-battle', ...],
  '062602.md': ['azurlane-cover', 'azurlane-battle', ...],
  // ...
};
```

**扩展使用**：

可修改脚本中的以下变量适配不同需求：

```javascript
const gameDir = path.join(__dirname, 'docs', 'views', 'game', '2026');
// 修改为目标目录

const oldPattern = /!\[(.*?)\]\(https:\/\/trae-api-cn\.mchost\.guru\/api\/ide\/v1\/text_to_image\?prompt=.*?&image_size=landscape_16_9\)/g;
// 修改为需要替换的 URL 模式
```

---

## 常见问题与解决方案

### 1. 本地开发服务器启动失败

**问题**：执行 `npm run dev` 报错

**可能原因**：
- Node.js 版本过低
- 依赖未安装或损坏

**解决方案**：

```bash
# 检查 Node.js 版本（需要 >= 18）
node -v

# 清除缓存并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新启动
npm run dev
```

### 2. 构建失败

**问题**：`npm run build` 报错

**排查步骤**：

1. 检查 Markdown 语法是否正确
2. 检查 Frontmatter 格式是否正确
3. 检查文件路径是否存在空格或特殊字符
4. 查看详细错误日志

**解决方案**：

```bash
# 使用调试模式构建
npm run build -- --debug

# 检查 Markdown 语法
npx markdownlint docs/
```

### 3. GitHub Actions 部署失败

**问题**：自动化部署流程失败

**常见原因**：
- GitHub Pages 未启用
- 权限配置不正确
- 构建产物路径错误

**解决方案**：

1. 检查仓库设置：
   - Settings → Pages → Source → 选择 "GitHub Actions"

2. 检查 Actions 权限：
   - Settings → Actions → General → Workflow permissions → 选择 "Read and write permissions"

3. 检查 YAML 配置中的路径：
   - `path: docs/.vuepress/dist` 是否正确

### 4. 图片无法显示

**问题**：文章中的图片加载失败

**排查步骤**：

1. 检查图片文件是否存在于 `docs/.vuepress/public/` 目录
2. 检查图片引用路径是否正确（应以 `/` 开头）
3. 检查文件名大小写是否匹配（Linux 系统区分大小写）

**解决方案**：

```markdown
<!-- 正确的引用方式 -->
![描述](/image.jpg)

<!-- 错误的引用方式 -->
![描述](image.jpg)
![描述](./image.jpg)
```

### 5. 样式不生效

**问题**：自定义样式未应用

**解决方案**：

1. 确认样式文件位置正确：
   - `docs/.vuepress/styles/index.scss`
   - `docs/.vuepress/styles/palette.scss`

2. 重启开发服务器：
   ```bash
   npm run dev
   ```

3. 清除缓存：
   ```bash
   rm -rf docs/.vuepress/.cache
   rm -rf docs/.vuepress/.temp
   ```

### 6. 搜索功能不工作

**问题**：网站搜索功能无法使用

**解决方案**：

检查 `docs/.vuepress/config.js` 中的搜索配置：

```javascript
themeConfig: {
  search: true,
  searchMaxSuggestions: 10
}
```

确保：
- `search` 设置为 `true`
- 文章有正确的标题和内容
- 重新构建项目

---

## 项目维护建议

### 日常维护

1. **定期更新依赖**：
   ```bash
   npm outdated           # 检查过时的依赖
   npm update             # 更新依赖
   npm audit fix          # 修复安全漏洞
   ```

2. **备份重要内容**：
   - 定期备份 `docs/blogs/` 目录
   - 使用 Git 进行版本控制

3. **监控构建状态**：
   - 关注 GitHub Actions 构建结果
   - 及时处理构建失败通知

### 内容管理建议

1. **建立文章发布流程**：
   - 本地编写 → 本地预览 → 提交代码 → 自动部署
   - 使用 Pull Request 进行内容审核

2. **优化图片资源**：
   - 压缩图片大小
   - 使用 WebP 格式
   - 设置图片懒加载

3. **SEO 优化**：
   - 为每篇文章设置合适的标题和描述
   - 合理使用标签和分类
   - 优化文章 URL 结构

### 性能优化建议

1. **减少构建时间**：
   - 避免过大的图片文件
   - 精简不必要的插件

2. **提升访问速度**：
   - 启用 CDN 加速
   - 优化资源加载顺序
   - 启用浏览器缓存

---

## 相关资源链接

- **VuePress 官方文档**：https://vuepress.vuejs.org/
- **vuepress-theme-reco 文档**：https://vuepress-theme-reco.recoluan.com/
- **GitHub Pages 文档**：https://docs.github.com/pages
- **Markdown 语法指南**：https://www.markdownguide.org/

---

## 更新日志

- **v2.0.0** (当前版本)
  - 迁移至 VuePress 1.9.10
  - 采用 vuepress-theme-reco 主题
  - 配置 GitHub Actions 自动化部署
  - 优化目录结构，按年份组织文章
  - 新增多个内容分类

---

**文档维护者**：云梦泽项目团队
**最后更新时间**：2026-06-29