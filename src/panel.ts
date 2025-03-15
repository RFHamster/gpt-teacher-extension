import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class ChatViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = "gptTeacherChatView";
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

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

        this._view = webviewView;

        this.sendCodeToWebview();
        vscode.workspace.onDidChangeTextDocument(() => this.sendCodeToWebview());
        vscode.workspace.onDidSaveTextDocument(() => this.sendCodeToWebview());
        vscode.window.onDidChangeActiveTextEditor(() => this.sendCodeToWebview());
    }

    private getCode(): string {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const code = document.getText();
            return code;
        }
        return "No Code Provided";
    }

    private sendCodeToWebview() {
        if (this._view) {
            this._view.webview.postMessage({
                command: "showCode",
                code: this.getCode()
            });
        }
    }

    private getHtmlForWebview(): string {
        const htmlPath = path.join(this._extensionUri.fsPath, "webview", "index.html");
        return fs.readFileSync(htmlPath, "utf8");
    }
}
