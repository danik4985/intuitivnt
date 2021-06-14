import { Token, TokenTypes } from '../interface/Token'
import { createSource } from './createSource'
import { findPattern } from './findPattern'

const ENDERS = [
	';',
	'}',
	'\n',
	'{'
]

const ENDERS_T: string[] = [
	TokenTypes.NEWLINE
]

export function generate(tokens: Token[]) {
	var holder: Token[] = []
	var source: string[] = []

	tokens.forEach((i) => {
		holder.push(i)

		if (ENDERS.includes(i.val) || ENDERS_T.includes(i.type)) {
			const pattern = findPattern(holder)
			holder = []

			if (pattern != undefined) {
				source.push(createSource(pattern))
			}
		}
	})

	return source.join('\n')
}