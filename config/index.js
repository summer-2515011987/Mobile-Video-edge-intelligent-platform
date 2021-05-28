"use strict";
// Template version: 1.3.1
const path = require("path");
const ip = require("./ip");
module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      // '/adminApi': {
      //       // target: 'http://172.25.78.172:8300',//后端接口地址
      //       target: 'http://101.201.126.223:9300',//部署版本,线上
      //       // target: 'http://172.25.75.71:8300',//潘航
      //       // target: 'http://192.168.1.143:5000',//移动部署

      // 			changeOrigin: true,//是否允许跨越
      // 			pathRewrite: {
      // 				'^/adminApi': '/',//重写,
      // 			}
      // },

      "/smartedge": {
        // target: "http://172.24.4.181:5000", //移动部署
        // `${ipAddr}:10081`
        // target: window.ipConfig.ipAddr,
        target: ip.defaultIp, //客户部署
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          "^/smartedge": "/smartedge", //重写,
        },
        logLevel: "debug",
      },
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 5000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Map
     */

    // https://webpack.js.org/configuration/devtool/#development
    //devtool: 'cheap-module-eval-source-map',
    devtool: "source-map",
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
