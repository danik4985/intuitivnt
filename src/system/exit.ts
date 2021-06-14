import * as chalk from 'chalk'
import * as fs from 'fs'
import { KEEP_D_CODE } from '../main'

export function exit(code?: number) {
	if (!KEEP_D_CODE && fs.existsSync('out.d'))
		fs.rmSync('out.d')

	if (global.anyErrorLogged) console.log()
	console.log(chalk`{dim > [{bold ${code || 0}}]}`)

	process.exit(code || 0)
}