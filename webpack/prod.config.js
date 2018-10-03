const baseConfig = require("./base.config.js");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

let rootPath = path.join(__dirname, "..");

module.exports = merge(baseConfig, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true,
                        modules: true,
                        importLoaders: 2
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                        modules: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: rootPath
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]
});
