export function caller(message = '') {
	let e = new Error()
	let frame = e.stack.split('\n')[2] // change to 3 for grandparent func
	let lineNumber = frame.split(':').reverse()[1]
	let functionName = frame.split(' ')[5]
	return functionName // + ':' + lineNumber + ' ' + message
}