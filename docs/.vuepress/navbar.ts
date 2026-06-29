export const navbar = [
  { text: "首页", link: "/" },
  { text: "文章", link: "/views/" },
  { text: "分类", link: "/categories/" },
  { text: "标签", link: "/tags/" },
  { text: "时间线", link: "/timeline/" },
  {
    text: "关于",
    children: [
      { text: "GitHub", link: "https://github.com/lidongyalin" },
    ],
  },
];

export default navbar;
