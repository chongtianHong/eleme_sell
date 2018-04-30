'use strict'
// 开发环境中webpack的配置入口。
const utils = require('./utils') // 工具函数集合
const webpack = require('webpack') // 核心编译工具
const config = require('../config') // 配置文件
const merge = require('webpack-merge') // 配置合并插件
const path = require('path') // nodejs提供的一个api，表示提供一些文件、路径、操作一些方法
const baseWebpackConfig = require('./webpack.base.conf') // webpack基础配置文件，被开发和线上的webpack配置文件所共享
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 并且注入到 .html 文件中的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // webpack错误信息提示插件
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


// 通过express导入路由
const express = require('express');
// 请求server
const app = express();
// 加载本地数据文件
var appData = require('../data.json');
// json卖家数据
var seller = appData.seller;
// json商品数据
var goods = appData.goods;
// json评论数据
var ratings = appData.ratings;
// 编写路由
var apiRouter = express.Router();
// 所有通过接口相关的api都会通过api这个路由导向到具体的路由
app.use('/api',apiRouter);// 通过路由请求数据

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.get('/api/seller', function (req, res) {
        // 服务端收到请求后返回给客户端一个json数据
        res.json({
          // 当我们数据正常时，我们通过传递errno字符为0表示数据正常
          errno: 0,
          // 返回json中的卖家数据
          data: seller
        });
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({ // 通过配置了DefinePlugin，这里面的标识就相当于全局变量，业务代码就可以直接使用配置的标识。
      'process.env': require('../config/dev.env') // 插入适当的环境
    }),
    // HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成文件
      template: 'index.html', // 入口文件
      inject: true // 输出的一些js和css会自动的注入到index.html里面
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
