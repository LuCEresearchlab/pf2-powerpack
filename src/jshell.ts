import * as vscode from "vscode";

async function getExtension(): Promise<vscode.Extension<any> | undefined> {
  const extension = vscode.extensions.getExtension("luceresearchlab.vs-jshell");
  if (extension && !extension.isActive) {
    await extension.activate();
  }
  return extension;
}

export async function getJShellStatus(): Promise<{
  available: boolean,
  version: string,
}> {
  const extension = await getExtension();
  return {
    available: extension?.isActive || false,
    version: extension?.packageJSON["version"] || "N/A",
  };
}

export async function getJShellInfo(): Promise<{
  binPath: string,
  configArgs: string[],
}> {
  const extension = await getExtension();
  if (!extension || !extension.isActive) {
    return {
      binPath: "N/A",
      configArgs: ["N/A"],
    };
  }

  const vsJShellApi = extension!.exports as VsJShellApi;
  return {
    binPath: vsJShellApi.getBinPath() || "???",
    configArgs: vsJShellApi.getConfigArgs(),
  };
}

export function openTerminal() {
  getExtension().then(extension => {
    if (extension && extension.isActive) {
      const vsJShellApi = extension!.exports as VsJShellApi;
      vsJShellApi.openTerminal();
    } else {
      vscode.window.showErrorMessage(
        "Failed to open terminal. Couldn't find the VS-JShell extension.",
      );
    }
  });
}

interface VsJShellApi {
  getBinPath(): string | undefined,
  getConfigArgs(): string[],
  openTerminal(): void,
};
