//@ts-ignore
import DashboardPlugin from "webpack-dashboard/plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"
import webpack from "webpack"

const mode: webpack.Configuration["mode"] = "production"
const base = path.resolve(__dirname, "noact-page")

// const mode: webpack.Configuration["mode"] = "development"
// const base = path.resolve(__dirname, "out")

const entry = path.resolve(__dirname, "example/index.ts")

const config: webpack.Configuration = {
  mode,
  entry,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-modules-typescript-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
              localsConvention: "camelCaseOnly",
            },
          },
        ],
      },
    ],
  },
  output: {
    path: base,
  },
  plugins: [
    new DashboardPlugin({}),
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      cache: true,
      xhtml: true,
      inject: "head",
      title: "🐳",
      meta: {
        viewport: "width=device-width, initial-scale=1",
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  },
  devServer: {
    disableHostCheck: true,
    contentBase: base,
    hot: true,
    overlay: true,
    compress: true,
    host: "0.0.0.0",
    port: 80,
  },
}

export default config
