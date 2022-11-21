(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{502:function(s,a,t){"use strict";t.r(a);var n=t(2),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[s._v("最近在给公司架构一个新的项目，要求同时写出一个完整的文档，由于正好在浏览vue的GitHub浏览相关项目时，看到了 "),a("code",[s._v("Vuepress")]),s._v("，所以尝试了一把，所以把开发中的积累写下来。")])]),s._v(" "),a("h2",{attrs:{id:"gitlab-pages-原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-pages-原理"}},[s._v("#")]),s._v(" GitLab Pages 原理")]),s._v(" "),a("p",[s._v("首先了解一下GitLab Pages运行的原理。与GitHub不同的是，GitLab需要上传一个 "),a("code",[s._v(".gitlab-ci.yml")]),s._v(" 的文件，同时生成的项目文件必须要到 "),a("code",[s._v("/public")]),s._v(" 目录中，见"),a("a",{attrs:{href:"https://about.gitlab.com/features/pages/",target:"_blank",rel:"noopener noreferrer"}},[s._v("详情"),a("OutboundLink")],1),s._v("。")]),s._v(" "),a("div",{staticClass:"language-yml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## .gitlab-ci.yml")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("9.11.1\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("pages")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("cache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" node_modules/\n\n "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" npm install\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" npm run docs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("build\n "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("artifacts")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" public\n "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("only")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" master\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br")])]),a("h2",{attrs:{id:"vuepress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress"}},[s._v("#")]),s._v(" Vuepress")]),s._v(" "),a("p",[s._v("你可以将vuepress安装到全局，也可以将其安装到项目中，我建议选择第二种，后面介绍一下原因")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建并进入工程")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" project-name\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" project-name\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("创建"),a("code",[s._v("package.json")])]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"docs:dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress dev docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"docs:build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress build docs"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"devDependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"vuepress"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^0.14.2"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装依赖")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或 npm install")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建并进入docs目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" docs\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" docs\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建一个 markdown 文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'# Hello VuePress'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" README.md\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动项目")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" docs:dev "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或 npm run docs:dev")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 编译项目至 '/project-name/public' 中")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" docs:dev "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或 npm run docs:dev")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("h2",{attrs:{id:"遇到的坑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#遇到的坑"}},[s._v("#")]),s._v(" 遇到的坑")]),s._v(" "),a("p",[s._v("其实到这里只是简单的启动了一个vuepress项目，但是你还应该花点时间去仔细阅读一下官网的主题配置，去配置你自己的各种导航，并注意下的页面的设置（主要是主页）。")]),s._v(" "),a("ul",[a("li",[s._v("valine 的引用必须放到mounted中，否则无法编译，报错，window is undefined")])]),s._v(" "),a("h2",{attrs:{id:"修改主题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改主题"}},[s._v("#")]),s._v(" 修改主题")]),s._v(" "),a("p",[s._v("另外vuepress适合撸项目文档，至于你要用它来写博客，它并没有分类、标签这样的配置，需要你去修改主题，有两种方式：")]),s._v(" "),a("ol",[a("li",[s._v("将主题文件放到 "),a("code",[s._v("project-name/docs/.vuepress/theme")]),s._v(" 中，然后创建一个 "),a("code",[s._v("Layout.vue")]),s._v(" 文件：")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v(".\n└─ .vuepress\n   └─ theme\n      └─ Layout.vue\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("这儿和开发一个正常的 Vue 应用程序是一样的。完全取决于你如何组织你的主题。")]),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[s._v("从依赖中引用主题，要使用 npm 依赖项的主题，请在 "),a("code",[s._v(".vuepress/config.js")]),s._v(" 中提供一个 theme 选项：")])]),s._v(" "),a("div",{staticClass:"language-javscript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("module.exports = {\n  theme: 'reco'\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("郑重推荐 "),a("strong",[s._v("vuepress-theme-reco")]),s._v(" ，查看 "),a("a",{attrs:{href:"http://recoluan.gitlab.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("展示"),a("OutboundLink")],1),s._v(" 既没有脱离默认主题的简洁，又增加了分类、分页、标签等功能。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" vuepress-theme-reco "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# npm install vuepress-theme-reco")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h4",{attrs:{id:"持续更新中。。。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#持续更新中。。。"}},[s._v("#")]),s._v(" 持续更新中。。。")]),s._v(" "),a("p",[s._v("个人博客："),a("a",{attrs:{href:"http://recoluan.gitlab.io",target:"_blank",rel:"noopener noreferrer"}},[a("strong",[s._v("白梦泽")]),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);