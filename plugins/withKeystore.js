const {
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const withKeystore = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const keystorePath = path.join(__dirname, "..", "sala-ais.keystore");
      const androidPath = path.join(
        config.modRequest.projectRoot,
        "android",
        "app"
      );

      if (!fs.existsSync(keystorePath)) {
        console.warn("⚠️  sala-ais.keystore não encontrado na raiz do projeto");
        return config;
      }

      if (!fs.existsSync(androidPath)) {
        fs.mkdirSync(androidPath, { recursive: true });
      }

      const destPath = path.join(androidPath, "sala-ais.keystore");
      fs.copyFileSync(keystorePath, destPath);

      console.log("✅ sala-ais.keystore copiado para android/app/");

      return config;
    },
  ]);
};

module.exports = withKeystore;
