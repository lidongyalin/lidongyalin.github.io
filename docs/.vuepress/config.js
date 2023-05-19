const themeConfig = require('./config/theme/')

module.exports = {
  title: "白梦泽",
  description: '与其感慨路难行 不如马上触发',
  dest: 'docs/.vuepress/dist',
  base:'/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom', 'flowchart']
}