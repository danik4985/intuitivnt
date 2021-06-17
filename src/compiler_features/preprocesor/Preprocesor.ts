import { PreprocesorError } from './PreprocesorError'

export class Preprocesor {
	modulesRequired: string[]

	constructor() {
		this.modulesRequired = []
	}

	public preprocess(data: string[]) {
		var lines: string[] = []

		data.forEach((i) => {
			if (i.startsWith('--- ')) {
				this.do(i.substring(4, i.length))
			} else lines.push(i)
		})

		return lines
	}

	private do(raw: string) {
		if (!/^[a-z]+\,/gm.test(raw)) {
			new PreprocesorError('Not a valid command', [ raw ]).throw(2)
		}

		const _x = raw.split(',')
		const cmd = _x[0]
		_x.shift()
		const args = JSON.parse(`[${_x.join(',')}]`)

		this.getCommand(cmd)(args)
	}

	private getCommand(name: string) {
		switch (name) {
			case 'use':
				return (args: string[]) => {
					args.forEach(i => this.modulesRequired.push(i))
				}
			default:
				new PreprocesorError('Unknown command', [ name ]).throw(3)
				return () => {}
		}
	} 
}