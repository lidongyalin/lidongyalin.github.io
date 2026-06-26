import { hopeTheme } from "vuepress-theme-hope";
import { navbar } from "./navbar.js";

export default hopeTheme({
  hostname: "https://lidongyalin.github.io",
  author: {
    name: "霒蚀君",
    url: "https://github.com/lidongyalin",
  },
  logo: "/head.png",
  repo: "lidongyalin/lidongyalin.github.io",
  docsDir: "docs",
  docsBranch: "docs",
  breadcrumb: true,
  footer: "白梦泽",
  displayFooter: true,
  copyright: "湘ICP备20014689号-1",
  navbar,
  sidebar: false,
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },
  markdown: {
    align: true,
    attrs: true,
    component: true,
    figure: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    obsidianImgSize: true,
    spoiler: true,
    tasklist: true,
    vPre: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
  },
  plugins: {
    blog: true,
    comment: false,
    components: {
      components: ["Badge", "BiliBili", "PDF", "VidStack"],
    },
    copyright: true,
    feed: false,
    git: false,
    icon: {
      assets: "fontawesome-with-brands",
    },
    photoSwipe: false,
    pwa: false,
    seo: true,
    sitemap: true,
  },
});
