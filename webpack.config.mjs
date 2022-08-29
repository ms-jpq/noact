import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { dirname, join, basename } from "node:path"
import { fileURLToPath } from "node:url"

export const top_level = dirname(fileURLToPath(new URL(import.meta.url)))

export default {
  mode: "production",
  stats: { errorDetails: true },
  entry: join(top_level, "example", "js", "entry.ts"),
  resolve: {
    extensions: [".ts", ".js"],
    extensionAlias: { ".js": [".js", ".ts"] },
  },
  module: {
    rules: [
      { test: /\.ts$/i, loader: "ts-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      runtime: false,
    }),
    new HtmlWebpackPlugin({
      publicPath: "/noact-page",
      title: basename(top_level),
      xhtml: true,
    }),
  ],
}
