import * as fs from 'fs'

export function loadCode() {
	const DIR = process.cwd() + '/out/generator/code'

	fs.readdirSync(DIR).forEach((_i) => {
		const i = DIR + '/' + _i

		require(i)
	})
}