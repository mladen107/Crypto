const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const SassLintPlugin = require("sass-lint-webpack");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        publicPath: "/",
        filename: "[name].[contenthash].js",
        path: path.join(__dirname, "..", "dist")
    },


    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: [path.join(__dirname, "..", "src"), "node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",

            },
            {
                test: /\.tsx?$/,
                enforce: "pre",
                use: [
                    {
                        loader: "tslint-loader",
                        options: {/* Loader options go here */}
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new SassLintPlugin({
            configPath: path.join(__dirname, "..", ".sasslintrc"),
            files: "src/**/*.scss"
        })
    ]
};
