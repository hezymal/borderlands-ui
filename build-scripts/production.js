const path = require("path");
const baseConfig = require("./base");

module.exports = {
    ...baseConfig,
    mode: "production",
    entry: path.resolve(__dirname, "../src/lib.ts"),
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "borderlands-ui.production.js"
    }
};
