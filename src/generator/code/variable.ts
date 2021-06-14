import { CompilerError } from '../../compiler_features/CompilerError'
import { Snippet } from '../../compiler_features/Snippet'
import { makeFunction } from './function'

interface VarData {
	type:  string
	name:  string
	value: any
}

var vars: string[] = []

new Snippet('Variable', ({ type, name, value }: VarData) => {
	if (type != '') {
		if (vars.includes(name)) {
			new CompilerError('Variable is already declared', [ name ]).throw(11)
		} else {
			vars.push(name)
		}
	} else {
		if (!vars.includes(name)) {
			new CompilerError('Variable not delcared (yet)', [ name ]).throw(12)
		}
	}

	return `${type} ${name} = ${
		(value.type === 'String') ? value.data : 
		(value.type === 'Number') ? value.data :
		(value.type === 'Identifier') ? value.data :
		(value.type === 'CondString') ? '(' + value.data + ')' : makeFunction(value)
	};`
})