import { Snippet } from '../../compiler_features/Snippet'

new Snippet('Label', (str: string) => {
	return `${str}:`
})