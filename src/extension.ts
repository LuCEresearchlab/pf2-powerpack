import * as vscode from "vscode";
import { gradleAssembleAndOpenJShellTerminal } from "./commands";
import { checkEnvironment } from "./env";
import { populateInfoChannel } from "./info";

export function activate(context: vscode.ExtensionContext) {
  // Information channel
  const chan = vscode.window.createOutputChannel("PF2 PowerPack");
  populateInfoChannel(chan);

  checkEnvironment();

  vscode.commands.registerCommand(
    "pf2-powerpack:cmd-gradle-assemble-open-term",
    gradleAssembleAndOpenJShellTerminal,
  );
}

export function deactivate() {
}


