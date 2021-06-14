function removeDoubleSC(x: string) {
	const split = x.split('/* Type: ')
	const suffix = split[split.length - 1]
	const fixed = split[split.length - 2].slice(0, -2)

	split[split.length - 1] = suffix
	split[split.length - 2] = fixed

	return split.join('/* Type: ')
}

export const formatCode = (x: string) =>
	Array.from(
		Array.from(x.split('\n'), i => i = i.trimStart()),
		i => i = (/^.+;; \/\* Type: (Variable|if|Function|Visit|Label) \*\//gm.test(i))
			? removeDoubleSC(i)
			: i
	).join('\n')
	