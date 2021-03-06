import { CompilerError } from '../compiler_features/CompilerError'

export function nameType(str: string) {
	switch (str) {
		case 'π²π·π½':
			return 'int';
		case 'πΌπ½π»π²π·π°':
			return 'string';
		case 'π¬π±πͺπ»':
			return 'char';
		case 'π―π΅πΈπͺπ½':
			return 'float';
		case 'π«πΈπΈπ΅':
			return 'bool';
		default:
			new CompilerError('Unknown type', [ str ]).throw(9)
			return
	}
}