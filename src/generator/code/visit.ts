import { Snippet } from '../../compiler_features/Snippet'

new Snippet('Visit', (str: string) => {
	return `goto ${str};`
})