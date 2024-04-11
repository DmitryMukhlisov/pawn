import { CancellationToken, Color, ColorInformation, ColorPresentation, DocumentColorProvider, Position, ProviderResult, Range, TextDocument, TextEdit } from "vscode";

export class ColorProvider implements DocumentColorProvider
{
	provideDocumentColors(document: TextDocument, token: CancellationToken): ProviderResult<ColorInformation[]> {
		let colors: ColorInformation[] = [];
		
		let text = document.getText();     
		let match, range: Range, pos: Position;
		let reg = /{([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})}/gi;
		while((match = reg.exec(text))) {
			pos = document.positionAt(match.index);
			range = new Range(pos.line, pos.character, pos.line, pos.character + match[0].length);
			let color = new Color(parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255, 1);
			colors.push(new ColorInformation(range, color));
			
		}
		reg = /0x([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/gi;
		while((match = reg.exec(text))) {
			pos = document.positionAt(match.index);
			range = new Range(pos.line, pos.character, pos.line, pos.character + match[0].length);
			let color = new Color(parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255, parseInt(match[4], 16) / 255);
			colors.push(new ColorInformation(range, color));
			
		}
		return colors;
	}
	provideColorPresentations(color: Color, context: { readonly document: TextDocument; readonly range: Range; }, token: CancellationToken): ProviderResult<ColorPresentation[]> {
		let text = context.document.getText(context.range);
		if(text[0] == "{") {
			let hex = this.rgbToHex(color);
			if(/^[a-f\d]{6}/i.test(hex)) {
				let val = new ColorPresentation(hex)
				val.textEdit = new TextEdit(context.range, "{" + hex.toUpperCase() + "}");
				return [val];
			}      
		}
		else {
			let hex = this.rgbToHex(color, color.alpha);
			if(/^[a-f\d]{8}/i.test(hex)) {
				let val = new ColorPresentation(hex)
				val.textEdit = new TextEdit(context.range, "0x" + hex.toUpperCase());
				return [val];

			}      
		}
		return [];
	}
	private componentToHex(color: number): string {
		return color.toString(16).padStart(2, '0');
	}
	private rgbToHex(color: Color, alpha: number | undefined = undefined) {
		return this.componentToHex(Math.round(color.red * 255)) 
		+ this.componentToHex(Math.round(color.green * 255)) 
		+  this.componentToHex(Math.round(color.blue * 255)) 
		+ (alpha !== undefined ? this.componentToHex(Math.round(alpha * 255)) : "");
	}
	  
}