var path = require('path');
var r = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: { main: './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      //   {
      //     test: /\.s[c|a]ss$/,
      //     use: [
      //       'style-loader',
      //       MiniCssExtractPlugin.loader,
      //       'css-loader',
      //       'postcss-loader',
      //       'sass-loader',
      //     ],
      //   },
    ],
  },
  plugins: [
    new r.CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      //inject: false,
      hash: true,
      template: './src/index.development.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
  ],
};
