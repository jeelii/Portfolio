const path = require("path");
const Handlebars = require("handlebars");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.hbs$/,
        loader: "html-loader",
        options: {
          preprocessor: (content, loaderContext) => {
            let result;
            try {
              Handlebars.registerPartial(
                "portfolioSection",
                require("./src/partials/portfolio.hbs")
              );
              Handlebars.registerPartial(
                "homeSection",
                require("./src/partials/home.hbs")
              );
              Handlebars.registerPartial(
                "aboutSection",
                require("./src/partials/about.hbs")
              );
              Handlebars.registerPartial(
                "contactSection",
                require("./src/partials/contact.hbs")
              );
              result = Handlebars.compile(content)({
                title: "Jenny Svensson - Full-Stack Developer in Malmö",
                lastname: "Svensson",
                portfolio: require("./src/content/portfolio.json"),
                skills: require("./src/content/skills.json"),
              });
            } catch (error) {
              loaderContext.emitError(error);
              return content;
            }
            return result;
          },
        },
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