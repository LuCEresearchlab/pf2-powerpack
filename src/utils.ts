import fs from "fs";
import * as vscode from "vscode";

export function getMainWorkspaceUri(): vscode.Uri | undefined {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return undefined;
  }

  for (const wsFolder of workspaceFolders) {
    const wsUri = wsFolder.uri;
    try {
      if (fs.existsSync(wsUri.fsPath)) {
        return wsUri;
      }
    } catch {
      // Ignore
    }
  }

  return undefined;
}
