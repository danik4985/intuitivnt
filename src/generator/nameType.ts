import { CompilerError } from '../compiler_features/CompilerError'

export function nameType(str: string) {
	switch (str) {
		case '𝓲𝓷𝓽':
			return 'int';
		case '𝓼𝓽𝓻𝓲𝓷𝓰':
			return 'string';
		case '𝓬𝓱𝓪𝓻':
			return 'char';
		case '𝓯𝓵𝓸𝓪𝓽':
			return 'float';
		case '𝓫𝓸𝓸𝓵':
			return 'bool';
		default:
			new CompilerError('Unknown type', [ str ]).throw(9)
			return
	}
}