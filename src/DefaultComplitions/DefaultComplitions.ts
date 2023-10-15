import * as vscode from 'vscode';
import { defaultEvents } from './list';

export interface IDefaultEvent {
	name: string
	description?: string
	wiki?: string
	code?: string
	args?: string
	deprecated?: boolean
}

export function getDefaultComplitions(): vscode.CompletionItem[] {
	let complitions: vscode.CompletionItem[] = [];
	let insertText: string = "";
	defaultEvents.forEach(eventNames => {

		insertText = ` ${eventNames.name}(${eventNames.args != undefined ? eventNames.args : ""})`;

		const event: vscode.CompletionItem = new vscode.CompletionItem(eventNames.name);
		
		event.documentation = new vscode.MarkdownString(eventNames.description);
		event.documentation.isTrusted = true;
		event.documentation.supportThemeIcons = true;
		event.documentation.appendCodeblock("forward" + insertText, "pawn");
		event.documentation.supportHtml = true;
		event.documentation.appendMarkdown(eventNames.wiki != undefined ?  eventNames.wiki : "");
		
		if(eventNames.deprecated)
			event.tags = [vscode.CompletionItemTag.Deprecated];
		event.kind = vscode.CompletionItemKind.Event;
		event.insertText =  new vscode.SnippetString("public" + insertText + " {\n\t$0\n\treturn 1\n}");;
		
		complitions.push(event);
	});
	return complitions;
}