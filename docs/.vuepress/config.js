module.exports = {
  title: '白梦泽',
  description: '与其感慨路难行 不如马上出发',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  theme: 'reco',
  themeConfig: {
    logo: '/head.png',
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '分类', link: '/categories/', icon: 'reco-category' },
      { text: '标签', link: '/tag/', icon: 'reco-tag' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' }
    ],
    sidebar: 'auto',
    subSidebar: 'auto',
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      }
    },
    author: '霒蚀君',
    authorAvatar: '/head.png',
    record: '湘ICP备20014689号-1',
    startYear: '2022'
  }
}
