const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const withBuildGradle = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const buildGradlePath = path.join(
        config.modRequest.projectRoot,
        "android",
        "app",
        "build.gradle"
      );

      if (!fs.existsSync(buildGradlePath)) {
        console.warn("⚠️  build.gradle não encontrado");
        return config;
      }

      let buildGradleContent = fs.readFileSync(buildGradlePath, "utf8");

      if (!buildGradleContent.includes("signingConfigs {")) {
        console.warn("⚠️  Seção signingConfigs não encontrada no build.gradle");
        return config;
      }

      if (buildGradleContent.includes("storeFile file('sala-ais.keystore')")) {
        console.log("✅ Keystore já configurado no build.gradle");
        return config;
      }

      const releaseSigningConfig = `
    release {
        storeFile file('sala-ais.keystore')
        storePassword 'salaais'
        keyAlias 'sala-ais'
        keyPassword 'salaais'
    }`;

      buildGradleContent = buildGradleContent.replace(
        /(signingConfigs\s*\{\s*debug\s*\{[\s\S]*?\}\s*)/,
        `$1${releaseSigningConfig}\n`
      );

      buildGradleContent = buildGradleContent.replace(
        /(release\s*\{[\s\S]*?)signingConfig\s+signingConfigs\.debug/,
        "$1signingConfig signingConfigs.release"
      );

      buildGradleContent = buildGradleContent.replace(
        /(debug\s*\{[\s\S]*?)signingConfig\s+signingConfigs\.release/,
        "$1signingConfig signingConfigs.debug"
      );

      buildGradleContent = buildGradleContent.replace(
        /(release\s*\{[\s\S]*?)signingConfig\s+signingConfigs\.debug/,
        "$1signingConfig signingConfigs.release"
      );

      if (
        !buildGradleContent.includes("signingConfig signingConfigs.release")
      ) {
        buildGradleContent = buildGradleContent.replace(
          /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig\s+signingConfigs\.debug/,
          "$1signingConfig signingConfigs.release"
        );
      }

      const lines = buildGradleContent.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (
          lines[i].includes("release") &&
          lines[i].includes("signingConfig signingConfigs.debug")
        ) {
          lines[i] = lines[i].replace(
            "signingConfig signingConfigs.debug",
            "signingConfig signingConfigs.release"
          );
        }
      }
      buildGradleContent = lines.join("\n");

      buildGradleContent = buildGradleContent.replace(
        /signingConfig signingConfigs\.debug/g,
        "signingConfig signingConfigs.release"
      );

      fs.writeFileSync(buildGradlePath, buildGradleContent, "utf8");
      console.log("✅ build.gradle configurado com keystore de release");
      return config;
    },
  ]);
};

module.exports = withBuildGradle;
