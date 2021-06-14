import * as chalk from 'chalk'

import { exit } from '../system/exit'

export class CompilerError extends Error {
	public extendedData: string[]

	constructor(text: string, extendedData?: string[]) {
		super(text)
		this.name = 'CompilerError'
		this.extendedData = extendedData || []
	}

	public throw(exitCode?: number) {
		// console.log(this)
		global.anyErrorLogged = true

		console.error(chalk`{rgb(249,38,114) ${this.name}}
\t{rgb(255,255,255) Info:} {rgb(253,151,31) ${this.message}}`)

		this.extendedData.forEach((i) => {
			console.error(chalk`\t {rgb(117,113,94) ->} {rgb(230,219,116) ${i}}`)
		})

		console.error(chalk`\n{rgb(248,248,242) Fix your code and resubmit!}`)

		exit(exitCode || 1)
	}
}