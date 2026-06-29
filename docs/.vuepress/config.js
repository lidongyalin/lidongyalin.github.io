module.exports = {
  title: "云梦泽",
  description: "与其感慨路难行 不如马上出发",
  head: [
    ["link", { rel: "icon", href: "/head.png" }],
  ],
  theme: "reco",
  themeConfig: {
    type: "blog",
    logo: "/head.png",
    author: "霒蚀君",
    authorAvatar: "/head.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "最后更新时间",
    repo: "lidongyalin/lidongyalin.github.io",
    docsRepo: "lidongyalin/lidongyalin.github.io",
    docsDir: "docs",
    docsBranch: "docs",
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    nav: [
      { text: "首页", link: "/", icon: "reco-home" },
      { text: "时间线", link: "/timeline/", icon: "reco-date" },
      {
        text: "关于",
        items: [
          { text: "GitHub", link: "https://github.com/lidongyalin", icon: "reco-github" },
        ],
      },
    ],
    sidebar: "auto",
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
    },
  },
  plugins: [],
};
