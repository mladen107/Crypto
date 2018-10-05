const baseConfig = require("./base.config.js");
const merge = require("webpack-merge");

module.exports = merge(baseConfig, {
    mode: "development",
    devServer: {
        compress: true,
        port: 9000,
        historyApiFallback: true,
        stats: {
            all: false,
            wds: true,
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            errors: true,
            errorDetails: true,
            warnings: true,
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader",
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true,
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                        modules: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                        modules: true
                    }
                }]
            }
        ]
    }
});
