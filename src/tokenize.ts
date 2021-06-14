import { Token as OriginalToken } from 'js-tokens'
import { CompilerError } from './compiler_features/CompilerError'
import { Token, TokenTypes } from './interface/Token'

const tokens = require('js-tokens')

export function tokenize(data: string) {
	const _arr: OriginalToken[] = Array.from(tokens(data))
	var arr: Token[] = []

	_arr.forEach((i) => {
		switch (i.type) {
			case 'IdentifierName':
				arr.push({ type: TokenTypes.IDENTIFIER, val: i.value })
				break
			case 'NumericLiteral':
				arr.push({
					type: TokenTypes.NUMBER,
					val: (i.value.length > 3)
					? i.value.substring(0, 1) + '_' + i.value.substring(1, i.value.length)
					: i.value
				})
				break
			case 'StringLiteral':
				if (i.value.startsWith('"')) {
					arr.push({ type: TokenTypes.CHAR, val: '\'' + i.value.substring(1, 2) + '\'' })
				} else if (i.value.startsWith('\'')) {
					arr.push({ type: TokenTypes.STRING, val: '"' + i.value.slice(1, -1) + '"' })
				} else {
					new CompilerError('String cant be marked using `', [
						'Your string: ' + i.value
					]).throw(2)
				}
				break
			case 'WhiteSpace':
				arr.push({ type: TokenTypes.SPACE, val: null })
				break
			case 'Punctuator':
				arr.push({ type: TokenTypes.PUNCTUATOR, val: i.value })
				break
			case 'LineTerminatorSequence':
				arr.push({ type: TokenTypes.NEWLINE, val: null })
				break
			default:
				new CompilerError('Unknown sequence', [ JSON.stringify(i, null, '\t') ]).throw(3)
				break
		}
	})

	return arr
}