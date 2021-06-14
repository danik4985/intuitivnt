import { CompilerError } from '../../compiler_features/CompilerError'
import { Snippet } from '../../compiler_features/Snippet'

interface FncData {
	name: string
	args: string[]
}

const LEGAL_FUNCTION_NAMES: string[] = [
	'writeln',
	'join',
	'input',
	'goodThingsAboutPython',
	'boolMaker',
	'intMaker',
	'mod'
]

export function makeFunction(data: FncData) {
	if (data.name === undefined) {
		data = (data as any).data
	}

	if (!LEGAL_FUNCTION_NAMES.includes(data.name)) {
		new CompilerError('Unknown function', [ data.name ]).throw(7)
	}

	return `${data.name}(${data.args.join(', ')});`
}

new Snippet('Function', makeFunction)