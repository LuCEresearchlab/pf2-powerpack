import * as vscode from "vscode";

import {
  buildGradleProject,
  getGradleProjectRoot,
} from "./gradle";
import { openTerminal } from "./jshell";

export function gradleAssembleAndOpenJShellTerminal() {
  const gradleProject = getGradleProjectRoot();
  if (gradleProject) {
    buildGradleProject(gradleProject)
      .then((res) => {
        if (res.success) {
          openTerminal();
        } else {
          throw res.reason;
        }
      })
      .catch(e => vscode.window.showErrorMessage(
        `Failed to assemble Gradle project: ${e}`
      ));
  } else {
    vscode.window.showErrorMessage("Couldn\"t locate the Gradle project root");
  }
}
