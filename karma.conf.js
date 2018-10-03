const puppeteer = require("puppeteer");
const path = require("path");

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = (config) => {
    config.set({
        browsers: ["ChromeHeadless"],
        frameworks: ["mocha"],
        files: [
            {pattern: "src/**/*.test.tsx", watched: false}
        ],
        // singleRun: true,
        preprocessors: {
            "src/**/*.test.tsx": ["webpack", "sourcemap"],
        },
        webpack: require(path.join(__dirname, "webpack", "test.config.js")),
        webpackMiddleware: {
            stats: false
        },
        client: {
            mocha: {
                reporter: "min"
            }
        }
    })
};
