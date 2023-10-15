import * as vscode from 'vscode';
import { getDefaultComplitions } from './DefaultComplitions/DefaultComplitions';

interface IDefine {
	name: string
	pos: vscode.Position,
	value?: string
}

let defines: Map<string ,IDefine> = new Map<string, IDefine>;

export function activate(context: vscode.ExtensionContext) {

	console.log('Активация расширения!');
	
	vscode.window.onDidChangeActiveTextEditor((e) => {
		if(!e) return;
		if(e.document.languageId != "pawn") return;
		findDefines(e.document.getText(), defines);
	});	
	vscode.workspace.onDidOpenTextDocument((file) => {
		if(file.languageId != "pawn") return;
		findDefines(file.getText(), defines);
	});

	const provider1 = vscode.languages.registerCompletionItemProvider('pawn', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			let complitions: vscode.CompletionItem[] = getDefaultComplitions();

			// const maxPlayerDefine = new vscode.CompletionItem('MAX_PLAYERS');
			// maxPlayerDefine.documentation = new vscode.MarkdownString('Максимальное число игроков на сервере');
			// maxPlayerDefine.documentation.isTrusted = true;
			// maxPlayerDefine.documentation.appendCodeblock("#define MAX_PLAYERS 200", "pawn");
			// maxPlayerDefine.kind = vscode.CompletionItemKind.Constant;

			// complitions.push(maxPlayerDefine);

			defines.forEach(defineEl => {
				const complition = new vscode.CompletionItem(defineEl.name);
				complition.documentation = new vscode.MarkdownString('');
				complition.documentation.appendCodeblock(`#define ${defineEl.name} ${defineEl.value}`, "pawn");
				complition.kind = vscode.CompletionItemKind.Constant;
				complition.detail = `define constant`;
				
				complitions.push(complition);
			});

			return complitions;
		}
	});
	context.subscriptions.push(provider1);
}

function findDefines(text: string, defines: Map<string, IDefine>): void {
	defines.clear();
	const lines = text.split(/\r\n|\r|\n/);
	// console.log(text);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if(line[0] != "#") continue;
		if(!line.startsWith("#define")) continue;
		let pattern = /^\s*(?:#)\s*define\s*(\w+)(?:\s+([\w]+))*/;
		let m: RegExpExecArray | null;
		m = pattern.exec(line);
		if(m) {
			defines.set(m[1], 
			{
				name: m[1],
				pos: new vscode.Position(i, 0),
				value: m[2] == undefined ? "" : m[2]
			});
		}
		
	}
}