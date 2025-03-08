import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class ChatViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = "gptTeacherChatView";
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this._extensionUri, "webview")
            ]
        };

        webviewView.webview.html = this.getHtmlForWebview();
    }

    private getHtmlForWebview(): string {
        const htmlPath = path.join(this._extensionUri.fsPath, "webview", "index.html");
        return fs.readFileSync(htmlPath, "utf8");
    }
}
