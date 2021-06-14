export const TokenTypes: {
	IDENTIFIER: 'Identifier'
	NUMBER: 'Number'
	STRING: 'String'
	CHAR: 'Char'
	SPACE: 'Whitespace'
	PUNCTUATOR: 'Punctuator'
	NEWLINE: 'Endline'
} = {
	IDENTIFIER: 'Identifier',
	NUMBER: 'Number',
	STRING: 'String',
	CHAR: 'Char',
	SPACE: 'Whitespace',
	PUNCTUATOR: 'Punctuator',
	NEWLINE: 'Endline'
}

export interface Token {
	type: 'Identifier'|'Number'|'String'|'Char'|'Whitespace'|'Punctuator'|'Endline'
	val : string
}