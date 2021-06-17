import { CompilerError } from '../CompilerError'

export class PreprocesorError extends CompilerError {
	constructor(text: string, extra?: string[]) {
		super(text, extra)
		this.name = 'PreprocesorError'
	}
}