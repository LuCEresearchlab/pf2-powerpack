import * as vscode from "vscode";

const requiredExtensions = [
  "luceresearchlab.vs-jshell",
  "vscjava.vscode-gradle",
];

function checkForRequiredExtension(extensionId: string) {
  const extension = vscode.extensions.getExtension(extensionId);
  if (!extension) {
    vscode.window.showErrorMessage(
      `Missing required extension: ${extensionId}!\nPlease make sure that it is installed and enabled.`,
      { modal: true },
    );
  }
}

const unwantedExtensions = [
  "vscjava.vscode-java-dependency",
];

function checkForUnwantedExtension(extensionId: string) {
  const extension = vscode.extensions.getExtension(extensionId);
  if (!extension) {
    // Not installed
    return;
  }

  if (extension.isActive) {
    const { displayName } = extension.packageJSON;
    vscode.window.showErrorMessage(
      `Incompatible extension detected: "${displayName}"\n(id: ${extensionId}).\nPlease uninstall or deactivate it.`,
      { modal: true },
    );
  }
}

export function checkEnvironment() {
  for (const extensionId of requiredExtensions) {
    checkForRequiredExtension(extensionId);
  }

  for (const extensionId of unwantedExtensions) {
    checkForUnwantedExtension(extensionId);
  }
}
