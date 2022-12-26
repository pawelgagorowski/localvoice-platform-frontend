/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  publicPath: '/',

  devServer: {
    hot: true,
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 8000,
    https: true,
    compress: true
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('~app', path.resolve('./src/app'));

    if (process.argv.some((arg) => arg.includes('report'))) {
      config.optimization.concatenateModules(false);
    }
  },
  lintOnSave: false,
  transpileDependencies: ['vuetify']
});
