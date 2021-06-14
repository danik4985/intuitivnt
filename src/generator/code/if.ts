import { Snippet } from '../../compiler_features/Snippet'

new Snippet('if', (str: string) => {
	return `if (${str}) {`
})