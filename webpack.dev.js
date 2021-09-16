const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.hbs",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devtool: "source-map",
  // module: {
  //   rules: [
  //     {
  //       test: /\.(scss|css)$/,
  //       use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  //     },
  //     {
  //       test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  //       use: [
  //         {
  //           loader: "file-loader",
  //           options: {
  //             name: "[name].[ext]",
  //             outputPath: "fonts/",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
});
