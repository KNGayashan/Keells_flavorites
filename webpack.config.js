const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      constants: "./src/js/constants.js",
      main: "./src/js/index.js",
      indian: "./src/js/indian.js",
      italian: "./src/js/italian.js",
      thai: "./src/js/thai.js",
      korean: "./src/js/korean.js",
      cheese: "./src/js/cheese.js",
      moredeli: "./src/js/moredeli.js",
      contenthub: "./src/js/contenthub.js",
      delights: "./src/js/delights.js",
      styles: "./src/styles/main.scss"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: isProduction,
      publicPath: isProduction ? "./" : "/"
    },
    optimization: {
      minimize: isProduction,
      minimizer: isProduction ? [new TerserPlugin()] : [],
      splitChunks: {
        chunks: "all",
        minSize: 20000,
        minChunks: 1,
        cacheGroups: {
          vendor: {
            test: /[\/]node_modules[\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
		    {
      test: /\.css$/,   
      use: [
        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
        "css-loader",
      ],
    },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  quietDeps: true
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[path][name][ext]"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]"
          }
        }
      ]
    },
    plugins: [
      ...(isProduction ? [new CompressionPlugin()] : []),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        chunks: ["main", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/cheese.html",
        filename: "cheese.html",
        chunks: ["cheese", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/indian.html",
        filename: "indian.html",
        chunks: ["indian", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/contenthub.html",
        filename: "contenthub.html",
        chunks: ["contenthub", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/korean.html",
        filename: "korean.html",
        chunks: ["korean", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/moredeli.html",
        filename: "moredeli.html",
        chunks: ["moredeli", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/thai.html",
        filename: "thai.html",
        chunks: ["thai", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/italian.html",
        filename: "italian.html",
        chunks: ["italian", "styles"],
        inject: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/delights.html",
        filename: "delights.html",
        chunks: ["delights", "styles"],
        inject: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/assets",
            to: "assets"
          }
        ]
      }),
      ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css"
            })
          ]
        : [])
    ],
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      static: [
        {
          directory: path.join(__dirname, "dist"),
          publicPath: "/"
        }
      ],
      compress: true,
      port: 3006,
      hot: true,
      liveReload: true,
      open: true,
      watchFiles: {
        paths: ["src/**/*"],
        options: {
          usePolling: false
        }
      },
      historyApiFallback: true,
      client: {
        logging: "info",
        overlay: {
          errors: true,
          warnings: false
        },
        progress: true
      }
    },
    performance: {
      hints: isProduction ? "warning" : false
    }
  };
};
