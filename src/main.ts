import * as fs from 'fs'
import * as cp from 'child_process'

import { HEADERS } from './compiler_features/HEADERS'
import { formatCode } from './formatCode'
import { generate } from './generator/generate'
import { loadCode } from './system/loadCode'
import { tokenize } from './tokenize'
import { exit } from './system/exit'
import { COMPILE_CMD } from './compiler_features/COMPILE_CMD'

export const KEEP_D_CODE = true
global.anyErrorLogged = false

if (KEEP_D_CODE) console.time('Compilation to D')

loadCode()

const raw = String(fs.readFileSync(process.argv[2]))
const fixed = Array.from(raw.split('\n'), i => i = i.trimStart()).join('\n')
const tokens = tokenize(fixed)
const source = generate(tokens)

fs.writeFileSync('out.d', formatCode(HEADERS + source + '\n}'))
// console.log(`dmd out.d headers/base.d -of=build -color; rm -rf build.o`)

if (KEEP_D_CODE) console.timeEnd('Compilation to D')

try {
	const data = String(cp.execSync(COMPILE_CMD))
	// console.log(JSON.stringify(data))
	if (data != '') throw data.trimEnd()
	exit(0)
} catch (data) {
	console.error(data)
	global.anyErrorLogged = true
	exit(255)
}