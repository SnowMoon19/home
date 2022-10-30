const { defineConfig } = require('@vue/cli-service')
const dev_ip = "localhost:8007"
// const prop_ip = ""
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/snowMoon": {
        target: dev_ip,
        changeOrigin: true, // 是否改变域名
        ws: true
      }
    },
    port: 9009
  },
  // vant的自动化导包
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
})
