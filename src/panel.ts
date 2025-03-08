// import * as vscode from "vscode";
// import * as path from "path";
// import * as fs from "fs";

// export class ChatPanel {
//     public static currentPanel: ChatPanel | undefined;
//     private readonly panel: vscode.WebviewPanel;
//     private readonly extensionUri: vscode.Uri;
//     private disposables: vscode.Disposable[] = [];

//     public static createOrShow(extensionUri: vscode.Uri) {
//         if (ChatPanel.currentPanel) {
//             ChatPanel.currentPanel.panel.reveal(vscode.ViewColumn.One);
//             return;
//         }

        // const panel = vscode.window.createWebviewPanel(
        //     "gptTeacherChat",
        //     "GPT Teacher",
        //     vscode.ViewColumn.One,
        //     {
        //         enableScripts: true,
        //         localResourceRoots: [vscode.Uri.joinPath(extensionUri, "webview")],
        //     }
        // );

//         ChatPanel.currentPanel = new ChatPanel(panel, extensionUri);
//     }

//     private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
//         this.panel = panel;
//         this.extensionUri = extensionUri;

//         this.panel.webview.html = this.getHtmlForWebview();
//         this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
//     }

//     private getHtmlForWebview(): string {
//         const htmlPath = path.join(this.extensionUri.fsPath, "webview", "index.html");
//         return fs.readFileSync(htmlPath, "utf8");
//     }

//     public dispose() {
//         ChatPanel.currentPanel = undefined;
//         this.panel.dispose();
//         while (this.disposables.length) {
//             const disposable = this.disposables.pop();
//             if (disposable) {
//                 disposable.dispose();
//             }
//         }
//     }
// }


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
