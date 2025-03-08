import * as vscode from "vscode";
import { ChatViewProvider } from "./panel";

export function activate(context: vscode.ExtensionContext) {
    const myWebviewProvider = new ChatViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "gptTeacherChatView",
            myWebviewProvider
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("gpt-teacher.startChat", () => {
            vscode.commands.executeCommand("gptTeacherChatView.focus");
        })
    );
}

export function deactivate() { }
