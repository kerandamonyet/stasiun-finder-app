/* eslint-disable no-undef */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: "[path][base].gz",
    }),

  ],
};
