const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack')

const resolve = (dir) => path.resolve(__dirname, dir)


module.exports = function (env) {
  const isDevelopment = env ==='development'
  const baseConfig = {
    mode: env,
    // stats: 'errors-only',  // webpack-cli中 const statsPresetToOptions = require("webpack").Stats.presetToOptions;
    context: __dirname,
    devtool: 'inline-source-map',
    // 入口文件
    entry: {
      index: './src/index.tsx'
    },
    // 输出文件名称
    output: {
      filename: '[name].[contenthash].js',
      path: resolve('./dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        src: resolve('./src'),
        components: resolve('./src/components'),
        pages: resolve('./src/pages'),
        utils: resolve('./src/utils'),
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: [
            'babel-loader',
            'ts-loader'
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(css|less)?$/,
          use: [
            
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: resolve('./dist'),
              },
            },
            'css-loader',
            'less-loader'
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('./public/index.html'),
        title: 'Web Design'
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MiniCssExtractPlugin({
        filename: '[name][contenthash].css',
        chunkFilename: '[name][chunkHash].chunk.css',
      })
    ],
  }

  if (isDevelopment) {
    baseConfig.devServer = {
      contentBase: resolve('./dist'),
      compress: true,
      port: 9000,
      open: true,
      hot: true,
      stats: 'errors-warnings',
    }
    baseConfig.plugins.push(
      new FriendlyErrorsWebpackPlugin(),
    )
  } else {
    baseConfig.plugins.push(
      new CleanWebpackPlugin(),
    ),
    baseConfig.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  }


  return baseConfig
}