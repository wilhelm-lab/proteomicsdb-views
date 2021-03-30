module.exports = {
  // we need this to directly download CSS files for the SVG image exports
  chainWebpack: config => {
    config.module
      .rule('css-for-svgs')
      .test(/\.css.prdb$/)
      .use('file-loader')
        .loader('file-loader')
        .options({name : `css/[name]`})
        .end()
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
    config.module
      .rule('rawsvgs')
      .test(/\.svg$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'ProteomicsDB'
        return args
      })
  },
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue/'
    : '/'
}
