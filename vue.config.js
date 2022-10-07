/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },

  devServer: {
    clientLogLevel: 'warning',
    hot: true,

    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8000,
    https: true,
    hotOnly: false,

    contentBase: 'dist',
    compress: true,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    },
    disableHostCheck: true
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('~app', path.resolve('./src/app'));

    // /**
    //  * disable cssnano calc buggy optimization
    //  * @see https://github.com/cssnano/cssnano/issues/742
    //  */
    // if (!isDev) {
    //   config.plugin('optimize-css').tap(([options]) => {
    //     options.cssnanoOptions.preset[1].calc = false;
    //     return [options];
    //   });
    // }

    config
      .plugin('circular-dependency')
      .use(CircularDependencyPlugin, [{ exclude: /node_modules/ }]);

    if (process.argv.some((arg) => arg.includes('report'))) {
      config.optimization.concatenateModules(false);
    }
  },
  lintOnSave: false,
  transpileDependencies: ['vuetify']
};
