const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
let htmlPageNames = ["main", "sign-up"];

let multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/layout/${name}.html`, // relative path to the HTML files
    filename: `./layout/${name}.html`, // output HTML files
    inject: true,
    chunks: `./script/bundle.js`, // respective JS files
  });
});

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./script/bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    static: [
      {
        directory: path.join(__dirname, "./dist"),
        publicPath: "/",
      },
    ],
    watchFiles: ["./src/"],
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    liveReload: true,
  },
  target: "web",
  plugins: [
    ...[].concat(multipleHtmlPlugins),
    // clear dist folder
    new CleanWebpackPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "./style/[name].[contenthash].css",
      chunkFilename: "./style/[id].[contenthash].css",
    }),
    new SpriteLoaderPlugin(),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // CSS, PostCSS, Sass

      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "sass-loader", 
          {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    // Options
                  },
                ],
              ],
            },
          },
        },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
       },
      //  svg
      {
        test: /\.svg$/,
        use: ["svg-sprite-loader", "svgo-loader"],
      },
    ],
  },
};
