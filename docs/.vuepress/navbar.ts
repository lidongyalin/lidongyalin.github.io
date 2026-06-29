export const navbar = [
  { text: "首页", link: "/" },
  { text: "文章", link: "/posts.html" },
  { text: "分类", link: "/categories.html" },
  { text: "标签", link: "/tags.html" },
  { text: "时间线", link: "/timeline.html" },
  {
    text: "关于",
    children: [
      { text: "GitHub", link: "https://github.com/lidongyalin" },
    ],
  },
];

export default navbar;
