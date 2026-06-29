import { recoTheme } from "vuepress-theme-reco";
import { navbar } from "./navbar.js";

export default recoTheme({
  colorMode: "light",
  colorModeSwitch: true,
  logo: "/head.png",
  repo: "lidongyalin/lidongyalin.github.io",
  docsRepo: "lidongyalin/lidongyalin.github.io",
  docsDir: "docs",
  docsBranch: "docs",
  editLink: true,
  editLinkText: "在 GitHub 上编辑此页",
  lastUpdated: true,
  author: "霒蚀君",
  authorAvatar: "/head.png",
  navbar,
  series: {},
  autoSetBlogCategories: true,
  autoAddCategoryToNavbar: false,
  catalogTitle: "目录",
  categoriesText: "分类",
  tagsText: "标签",
  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/lidongyalin",
    },
  ],
  primaryColor: "#3eaf7c",
});
