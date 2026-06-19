import * as Updates from "expo-updates";

function getManifestUpdateId(): string | null {
  const manifest = Updates.manifest;

  if (!manifest || typeof manifest !== "object") {
    return null;
  }

  if ("id" in manifest && typeof manifest.id === "string") {
    return manifest.id;
  }

  return null;
}

export function getExpoUpdateId(): string {
  if (Updates.updateId) {
    return Updates.updateId;
  }

  const manifestId = getManifestUpdateId();
  if (manifestId) {
    return manifestId;
  }

  if (Updates.isEmbeddedLaunch) {
    return "embarcado";
  }

  if (!Updates.isEnabled) {
    return "local";
  }

  return "desconhecido";
}
