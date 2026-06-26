module.exports = {
  type: 'blog',
  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: '分类'
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: '标签'
    }
  },
  // 最后更新时间
  lastUpdated: '最后更新', // string | boolean
  // 作者
  author: '霒蚀君',
  // 备案号
  cyberSecurityRecord: '湘ICP备20014689号-1',
  cyberSecurityLink: "https://beian.miit.gov.cn/",
  // 项目开始时间
  startYear: '2022'
}