const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },

  ]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development,',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.join(__dirname, 'dist'),
    publicPath: '/src/',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  // devtool: isDev ? 'source-map' : false,
  devtool: 'inline-source-map',
  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Hot Module Replacement',
      template: '../index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },

      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),

  ],
  devServer: {
    contentBase: '/src',
    //  compress: true,
    //  historyApiFallback: true,
    port: 3000,
    // hot: true,
    // hotOnly: true,
    open: true,
    watchOptions: {
      poll: true,
    },
    disableHostCheck: true,
    inline: true,
    stats: {
      normal: true,
    },

  },

  module: {
    rules: [
      {

        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hmr: isDev,
              // reloadAll: true
            },

          },
          // 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),


      },
    ],
  },
}
