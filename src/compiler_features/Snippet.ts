import { Snippets } from '../generator/createSource'
import { Pattern } from '../interface/Pattern'

export class Snippet {
	public name: string
	public fnc: (data: any) => string

	constructor(name: string, create: (data: any) => string) {
		this.name = name
		this.fnc = create

		Snippets.set(name, this)
	}

	public generate(data: Pattern) {
		return this.fnc(data.data) + ` /* Type: ${this.name} */`
	}
}