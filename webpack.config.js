const path = require("path");
const HtmlWebpckPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Adds PostCSS Normalize as the reset css with default options,
// so that it honors browserslist config in package.json
// which in turn let's users customize the target behavior as per their needs.
// @remove-on-eject-end
const postcssNormalize = require("postcss-normalize");

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  const getStyleLoaders = () => {
    const loaders = [
      isEnvDevelopment && require.resolve("style-loader"),
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1
        }
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          ident: "postcss",
          sourceMap: true,
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
              autoprefixer: {
                flexbox: "no-2009"
              },
              stage: 3
            }),
            postcssNormalize()
          ]
        }
      }
    ].filter(Boolean);
    return loaders;
  };

  return {
    mode: isEnvProduction ? "production" : "development",
    entry: __dirname + "/src/main.js",
    output: {
      filename: "static/js/[name].[contenthash:8].js",
      chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: getStyleLoaders()
        },
        {
          test: /\.(eot|ttf|woff|svg)$/,
          use: "file-loader"
        },
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          loader: "eslint-loader",
          enforce: "pre",
          include: [path.join(__dirname, "src")],
          options: {
            fix: true
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpckPlugin({
        template: "./public/index.html"
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      })
    ],
    devServer: {
      contentBase: "./dist"
      // open: true
    }
  };
};
