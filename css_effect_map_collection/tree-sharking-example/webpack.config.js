const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function resolvePath(dir) {
  return path.join(__dirname, dir);
}
// npm i -D webpack webpack-cli webpack-dev-server babel @babel/core babel-loader clean-webpack-plugin html-webpack-plugin
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  devServer: {
    port: 8099,
  },
  resolve: {
    alias: {
      '@': resolvePath('src')
    },
    extensions: ['js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: 'babel-loader'
      },
      {
         test: /\.css$/,
         use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};