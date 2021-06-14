import { CompilerError } from '../compiler_features/CompilerError'
import { Snippet } from '../compiler_features/Snippet'
import { Pattern } from '../interface/Pattern'

export const Snippets = new Map<string, Snippet>()

export function createSource(pattern: Pattern) {
	// console.log(Snippets)
	// console.log(pattern)

	if (Snippets.has(pattern.type)) {
		return Snippets.get(pattern.type).generate(pattern)
	} else {
		new CompilerError('There is no code for ' + pattern.type + ' yet').throw(6)
	}
}