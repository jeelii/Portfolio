const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "./scripts/bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json",
  },
  devServer: {
    devMiddleware: {
      index: true,
      mimeTypes: { "text/html": ["phtml"] },
      serverSideRender: true,
      writeToDisk: true,
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./styles/layout.css",
    }),
    new HtmlWebpackPlugin({
      title: "Jenny",
      template: "./src/index.html",
    }),
  ],
};
