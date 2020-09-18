const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const app = process.env.APP || 'intro'

const appMap = {
  timeline: {
    base: path.resolve(__dirname, './example/timeline'),
    entry: path.resolve(__dirname, './example/timeline/index.ts')
  },
  intro: {
    base: path.resolve(__dirname, './example/intro'),
    entry: path.resolve(__dirname, './example/intro/index.ts')
  },
  default: {
    base: __dirname,
    entry: path.resolve(__dirname, './src/index.ts'),
  }
}

const currentApp = appMap[app || 'default']

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'eval-cheap-module-source-map',
  entry: currentApp.entry,
  output: {
    path: path.resolve(currentApp.base, './dist'),
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.prod }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: currentApp.base,
    overlay: true,
    historyApiFallback: true
  }
})