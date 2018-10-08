module.exports = {
    preset: "ts-jest",
    collectCoverage: true,
    modulePaths: ["<rootDir>/src/"],
    "transform": {
        ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform"
    }
};
