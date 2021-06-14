import { CompilerError } from '../compiler_features/CompilerError'
import { Token, TokenTypes } from '../interface/Token'

export function makeConditionString(arr: Token[]) {
	var str = ''

	arr.forEach((i) => {
		if (i.type === TokenTypes.IDENTIFIER) {
			str += i.val
		} else if (i.type === TokenTypes.PUNCTUATOR) {
			if (i.val === '=') {
				str += '=='
			} else if ((['+', '-', '*', ':']).includes(i.val)) {
				str += i.val.split(':').join('/')
			} else if (i.val === '&&') {
				str += '||'
			} else if (i.val === '||') {
				str += '&&'
			} else if (i.val === '%') {
				str += '('
			} else if (i.val === '&') {
				str += ')'
			} else if (i.val === '<') {
				str += '>'
			} else if (i.val === '>') {
				str += '<'
			}
		} else if ((([
			TokenTypes.STRING,
			TokenTypes.CHAR,
			TokenTypes.NUMBER
		]) as string[]).includes(i.type)) {
			str += '/* literal */ ' + i.val
		} else if (i.type === TokenTypes.SPACE) {
			str += ' '
		} else {
			new CompilerError('You cant have this token here', [ JSON.stringify(i) ])
				.throw(4)
		}

		str += ' '
	})

	return str
}