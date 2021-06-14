import { CompilerError } from '../compiler_features/CompilerError'
import { Token, TokenTypes } from '../interface/Token'
import { makeConditionString } from './makeConditionString'
import { nameType } from './nameType'

export function findPattern(arr: Token[], fixTokens = true) {
	if (arr.length === 1 && arr[0].type === TokenTypes.NEWLINE) return

	const l = arr.length - 1

	if (fixTokens) arr.forEach((i, n) => {
		if (i.type === TokenTypes.PUNCTUATOR && (i.val === '+' || i.val === '-')) {
			new CompilerError('Invalid punctuator', [
				i.val,
				'At: ' + Array.from(arr, (i: any) => i = (i.val || ' ')).join('')
			]).throw(8)
		}

		if (i.type === TokenTypes.PUNCTUATOR && (i.val === '++' || i.val === '--')) {
			arr[n].val = i.val.slice(0, -1)
		}
	})

	// console.log(arr, l)

	if (arr[0].type === TokenTypes.IDENTIFIER
	 && arr[1].type === TokenTypes.SPACE
	 && arr[2].type === TokenTypes.PUNCTUATOR && arr[2].val === '('
	 && arr[l - 1].type === TokenTypes.PUNCTUATOR && arr[l - 1].val === ')'
	 && arr[l].type === TokenTypes.PUNCTUATOR && arr[l].val === ';') {
		// Function
		// console.log('function')

		var args = []

		for (let i = 3; i < (l - 1); i++) {
			if (arr[i].type != TokenTypes.SPACE)
				args.push(arr[i].val)
		}

		return {
			type: 'Function',
			data: { args: args, name: arr[0].val }
		}

	} else if (arr[0].type === TokenTypes.IDENTIFIER && arr[0].val === 'if'
	        && arr[1].type === TokenTypes.PUNCTUATOR && arr[1].val === '('
					&& arr[l].type === TokenTypes.PUNCTUATOR && arr[l].val === '{'
					&& arr[l - 2].type === TokenTypes.PUNCTUATOR && arr[l - 2].val === '='
					&& arr[l - 4].type === TokenTypes.PUNCTUATOR && arr[l - 4].val === ')') {
		// if
		// console.log('if')

		let holder = []

		for (let i = 2; i < l - 4; i++) {
			holder.push(arr[i])
		}

		return {
			type: 'if',
			data: makeConditionString(holder)
		}
		
	} else if (arr[l].type === TokenTypes.PUNCTUATOR && arr[l].val === ';'
	        && arr[0].type === TokenTypes.IDENTIFIER
					&& (
						arr[2] && arr[2].type === TokenTypes.IDENTIFIER
						&& arr[4].type === TokenTypes.PUNCTUATOR && arr[4].val === '=='
					) || (
						arr[2] &&
						arr[2].type === TokenTypes.PUNCTUATOR && arr[2].val === '=='
					)) {
		 // variable declaration
		// console.log('variable declaration')

		var data: { [key: string]: any } = {}
		var start: number

		if (arr[2].type === TokenTypes.IDENTIFIER
		 && arr[4].type === TokenTypes.PUNCTUATOR && arr[4].val === '==') {
			data.type = nameType(arr[2].val)
			start = 5
		} else {
			data.type = ''
			start = 3
		}

		let holder: Token[] = []

		for (let i = (start + 1); i < arr.length; i++) {
			holder.push(arr[i])
		}

		data.name = arr[0].val
		data.value = findPattern(holder, false)

		return {
			type: 'Variable',
			data: data
		}
	} else if (l === 0
		     || (l === 1 && arr[l].type === TokenTypes.PUNCTUATOR && arr[l].val === ';')) {
		// console.log('0 length')
		const item = arr[0]

		switch (item.type) {
			case TokenTypes.PUNCTUATOR:
				return {
					type: 'Punctuator',
					data: item.val
				}
			case TokenTypes.STRING:
				return {
					type: 'String',
					data: item.val
				}
			case TokenTypes.NUMBER:
				return {
					type: 'Number',
					data: item.val
				}
			case TokenTypes.IDENTIFIER:
				if (!([
					'true', 'false', 'null'
				]).includes(item.val)) {
					return {
						type: 'Identifier',
						data: item.val
					}
				}
			default:
				break
		}
	} else if (arr[0].type === TokenTypes.PUNCTUATOR && arr[0].val === ','
					&& arr[2].type === TokenTypes.IDENTIFIER && arr[2].val === 'else'
					&& arr[3].type === TokenTypes.PUNCTUATOR && arr[3].val === ':'
					&& arr[5].type === TokenTypes.PUNCTUATOR && arr[5].val === '{'
					
					&& arr[1].type === TokenTypes.SPACE && arr[4].type === TokenTypes.SPACE) {
		// else
		// console.log('else')
		return {
			type: 'else',
			data: null
		}
	} else if ( (arr[0] && arr[1] && arr[2]) &&
		         arr[0].type === TokenTypes.PUNCTUATOR && arr[0].val === '['
	        && arr[2].type === TokenTypes.PUNCTUATOR && arr[2].val === ']'
					
					&& arr[1].type === TokenTypes.IDENTIFIER) {
		// console.log('label')
		
		return {
			type: 'Label',
			data: arr[1].val
		}
	} else if ((arr[0] && arr[1] && arr[2] && arr[3] && arr[4] && arr[5])
	        && arr[0].type === TokenTypes.IDENTIFIER && arr[0].val === 'visit'
					&& arr[1].type === TokenTypes.PUNCTUATOR && arr[1].val === '['
	        && arr[5].type === TokenTypes.PUNCTUATOR && arr[5].val === ']'
					&& arr[3].type === TokenTypes.IDENTIFIER
					&& arr[2].type === TokenTypes.SPACE
					&& arr[4].type === TokenTypes.SPACE) {
		// visit

		return {
			type: 'Visit',
			data: arr[3].val
		}
	} else if (arr[0] && arr[l] && (
		arr[0].type === TokenTypes.PUNCTUATOR && arr[0].val === '[' &&
		arr[l-1].type === TokenTypes.PUNCTUATOR && arr[l-1].val === ')'
	)) {
		var holder: Token[] = []

		for (let i = 1; i < (l - 1); i++) {
			holder.push(arr[i])
		}

		return {
			type: 'CondString',
			data: makeConditionString(holder)
		}
	}

	// We are still in the function
	new CompilerError('The provided pattern wasnt recognized by the compiler', [
		Array.from(arr, (i: any) => i = (i.val || ' ')).join('')
	]).throw(10)
}