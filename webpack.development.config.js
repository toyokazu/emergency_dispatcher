const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist/*']
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        title: 'Emergency Dispatcher'
      },
      template: './src/index.ejs'
    }),
    //new WorkboxPlugin.GenerateSW()
    new InjectManifest({
      swSrc: path.join('src', 'sw.js'),
    }),
  ],
};
