const withKeystore = require("./withKeystore");
const withBuildGradle = require("./withBuildGradle");
const withHermesDsym = require("./withHermesDsym");

const withKeystorePlugin = (config) => {
  config = withKeystore(config);
  config = withBuildGradle(config);
  config = withHermesDsym(config);
  return config;
};

module.exports = withKeystorePlugin;
