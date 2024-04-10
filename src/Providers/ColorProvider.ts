import { CancellationToken, Color, ColorInformation, ColorPresentation, DocumentColorProvider, Position, ProviderResult, Range, TextDocument, TextEdit } from "vscode";

export class ColorProvider implements DocumentColorProvider
{
	provideDocumentColors(document: TextDocument, token: CancellationToken): ProviderResult<ColorInformation[]> {
		let colors: ColorInformation[] = [];
		
		let text = document.getText();     
		let reg = /{([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})}/gi;
		let match, range: Range, pos: Position;
		while((match = reg.exec(text))) {
			pos = document.positionAt(match.index);
			range = new Range(pos.line, pos.character, pos.line, pos.character + match[0].length);
			let color = new Color(parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255, 1);
			colors.push(new ColorInformation(range, color));
			
		}
		return colors;
	}
	provideColorPresentations(color: Color, context: { readonly document: TextDocument; readonly range: Range; }, token: CancellationToken): ProviderResult<ColorPresentation[]> {
		let hex = this.rgbToHex(color);
		if(/^[a-f\d]{6}/i.test(hex)) {
			let val = new ColorPresentation(hex)
			val.textEdit = new TextEdit(context.range, "{" + hex + "}");
			return [val];

		}      
		else return [];
	}
	private componentToHex(color: number): string {
		return color.toString(16).padStart(2, '0');
	}
	private rgbToHex(color: Color) {
		let red = Math.round(color.red * 255);
		return this.componentToHex(red) + this.componentToHex(Math.round(color.green * 255)) +  this.componentToHex(Math.round(color.blue * 255));
	}
	  
}