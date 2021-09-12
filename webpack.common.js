const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "./styles/layout.css",
  //   }),
  //   new HtmlWebpackPlugin({
  //     title: "Jenny",
  //     template: "./src/index.html",
  //   }),
  // ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {},
      },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //   type: "asset/resource",
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // {
      //   test: /\.(jpg|png|gif)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[hash:6].[ext]", // can add other settings like compression
      //         outputPath: "images",
      //         esModule: false,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[hash:6].[ext]",
      //         outputPath: "fonts",
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    roots: [path.resolve(__dirname, "src/images")],
  },
};
