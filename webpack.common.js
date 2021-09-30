const path = require("path");
const Handlebars = require("handlebars");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(png|svg|jpe?g|gif)$/i,
      type: "asset",
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
              "nav",
              require("./src/partials/nav.hbs")
            );
            Handlebars.registerPartial(
              "skillsSection",
              require("./src/partials/skills.hbs")
            );
            Handlebars.registerPartial(
              "contactSection",
              require("./src/partials/contact.hbs")
            );
            result = Handlebars.compile(content)({
              title: "Jenny Svensson - Full-Stack Developer in Malmö",
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
    ],
  },
  // resolve: {
  //   roots: [path.resolve(__dirname, "src/images")],
  // },
};