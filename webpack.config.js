const path = require("path");
const {EnvironmentPlugin} = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  plugins: [
    new EnvironmentPlugin({
      'NODE_ENV': 'development',
      'DEBUG': 'false',
      'GRAPHQL_SERVER': '/query'
    }),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {from: "assets", to: "assets"},
      ],
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname, "assets"),
        publicPath: "/assets",
      },
    ],
    proxy: [
      {
        context: ["/query"],
        target: "http://localhost:8080"
      }
    ],
    port: 3000,
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
};
