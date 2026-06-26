import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "文章",
    icon: "article",
    link: "/article/",
  },
  {
    text: "分类",
    icon: "category",
    link: "/category/",
  },
  {
    text: "标签",
    icon: "tag",
    link: "/tag/",
  },
  {
    text: "时间线",
    icon: "clock",
    link: "/timeline/",
  },
  {
    text: "关于",
    icon: "circle-info",
    children: [
      {
        text: "GitHub",
        icon: "fab fa-github",
        link: "https://github.com/lidongyalin",
      },
    ],
  },
]);

export const navbarConfig = zhNavbar;
export default navbarConfig;
export { zhNavbar as navbar };
