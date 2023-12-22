// Note: ONLY USED BY JEST
// For Babel config for production code, refer to webpack.common.js

module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
