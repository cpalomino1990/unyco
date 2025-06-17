const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/widget.js",
  output: {
    filename: "widget.js",
    path: path.resolve(__dirname, "dist"),
    library: "MyWidget",
    libraryTarget: "umd",
    clean: true, // Borra la carpeta dist antes de cada build (opcional y útil)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(  |jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "public/[name][ext]", // Exporta las imágenes a dist/public
        },
      },
      {
        test: /\.json$/,
        type: "json",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "public" }, // Copia imágenes estáticas si no son importadas desde JS
      ],
    }),
    new Dotenv(),
  ],
  mode: "production",
};
