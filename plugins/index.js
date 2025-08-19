const withKeystore = require("./withKeystore");
const withBuildGradle = require("./withBuildGradle");

const withKeystorePlugin = (config) => {
  config = withKeystore(config);
  config = withBuildGradle(config);
  return config;
};

module.exports = withKeystorePlugin;
