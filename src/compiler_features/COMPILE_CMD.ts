export const COMPILE_CMD =
	`dmd out.d headers/base.d -of="${process.argv[3] || 'build'}" -color=auto 2>&1;`