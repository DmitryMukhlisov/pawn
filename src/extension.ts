import * as vscode from 'vscode';
import { getDefaultComplitions } from './DefaultComplitions/DefaultComplitions';

export function activate(context: vscode.ExtensionContext) {

	console.log('Активация расширения!');
	
	const provider1 = vscode.languages.registerCompletionItemProvider('pawn', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			let complitions: vscode.CompletionItem[] = getDefaultComplitions();

			// const maxPlayerDefine = new vscode.CompletionItem('MAX_PLAYERS');
			// maxPlayerDefine.documentation = new vscode.MarkdownString('Максимальное число игроков на сервере');
			// maxPlayerDefine.documentation.isTrusted = true;
			// maxPlayerDefine.documentation.appendCodeblock("#define MAX_PLAYERS 200", "pawn");
			// maxPlayerDefine.kind = vscode.CompletionItemKind.Constant;

			// complitions.push(maxPlayerDefine);

			return complitions;
		}
	});
	context.subscriptions.push(provider1);
}
