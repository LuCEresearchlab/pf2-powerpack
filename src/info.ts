import process from "process";
import * as os from "os";
import * as vscode from "vscode";

import { getJShellStatus, getJShellInfo } from "./jshell";
import { getGradleStatus } from "./gradle";

export function populateInfoChannel(chan: vscode.OutputChannel) {
  chan.appendLine("# PF2 PowerPack info");
  chan.appendLine("");
  chan.appendLine("## Environment");
  chan.appendLine(`• Host:      ${os.platform} ${os.release} ${os.arch}`);
  chan.appendLine(`• Editor:    ${vscode.env.appName} ${process.version} (${vscode.env.appHost})`);
  chan.appendLine(`• JAVA_HOME: ${process.env.JAVA_HOME}`);

  // Gradle integration
  const gradleStatus = getGradleStatus();
  chan.appendLine("## Gradle integration");
  chan.appendLine(`• Extension available: ${gradleStatus.extension.available}`);
  chan.appendLine(`• Extension version:   ${gradleStatus.extension.version}`);
  chan.appendLine(`• Project found:       ${gradleStatus.project}`);

  // Gradle integration
  chan.appendLine("## JShell integration");
  getJShellStatus().then(vsJShellStatus => {
    chan.appendLine(`• Extension available: ${vsJShellStatus.available}`);
    chan.appendLine(`• Extension version:   ${vsJShellStatus.version}`);
    return getJShellInfo();
  }).then(vsJShellInfo => {
    chan.appendLine(`• Executable:          ${vsJShellInfo.binPath}`);
    chan.appendLine(`• Configuration:       ${vsJShellInfo.configArgs.join(" ")}`);
  });
}
