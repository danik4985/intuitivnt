import { CompilerError } from '../../compiler_features/CompilerError'
import { Snippet } from '../../compiler_features/Snippet'
import { modules } from '../../main'

interface FncData {
	name: string
	args: string[]
}

export function makeFunction(data: FncData) {
	if (data.name === undefined) {
		data = (data as any).data
	}

	/* !LEGAL_FUNCTION_NAMES.includes(data.name) */ 
	if (!modules.VALID_FUNCTIONS.includes(data.name)) {
		new CompilerError('Unknown function', [ data.name ]).throw(7)
	}

	return `${data.name}(${data.args.join(', ')});`
}

new Snippet('Function', makeFunction)