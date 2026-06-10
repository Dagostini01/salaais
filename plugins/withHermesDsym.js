const { withXcodeProject } = require("@expo/config-plugins");

const BUILD_PHASE_NAME = "[Expo] Generate Hermes dSYM";

const HERMES_DSYM_SHELL_SCRIPT = `set -e

if [[ "$CONFIGURATION" != "Release" ]]; then
  exit 0
fi

HERMES_FRAMEWORK="$TARGET_BUILD_DIR/$FRAMEWORKS_FOLDER_PATH/hermes.framework"

if [[ ! -f "$HERMES_FRAMEWORK/hermes" ]]; then
  echo "warning: Hermes binary not found at $HERMES_FRAMEWORK — skipping dSYM generation"
  exit 0
fi

mkdir -p "$DWARF_DSYM_FOLDER_PATH"
/usr/bin/dsymutil "$HERMES_FRAMEWORK/hermes" -o "$DWARF_DSYM_FOLDER_PATH/hermes.framework.dSYM"
echo "Generated Hermes dSYM at $DWARF_DSYM_FOLDER_PATH/hermes.framework.dSYM"`;

const withHermesDsym = (config) => {
  return withXcodeProject(config, (config) => {
    const project = config.modResults;
    const shellScriptSection =
      project.hash.project.objects.PBXShellScriptBuildPhase ?? {};

    const alreadyExists = Object.values(shellScriptSection).some(
      (phase) =>
        typeof phase === "object" &&
        phase.name === `"${BUILD_PHASE_NAME}"`
    );

    if (alreadyExists) {
      return config;
    }

    const targetUuid = project.getFirstTarget().uuid;
    const { buildPhase } = project.addBuildPhase(
      [],
      "PBXShellScriptBuildPhase",
      BUILD_PHASE_NAME,
      targetUuid,
      {
        shellPath: "/bin/sh",
        shellScript: HERMES_DSYM_SHELL_SCRIPT,
      }
    );

    buildPhase.alwaysOutOfDate = 1;
    buildPhase.runOnlyForDeploymentPostprocessing = 0;

    return config;
  });
};

module.exports = withHermesDsym;
