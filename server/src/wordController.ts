function test(word: string, answer: string): object[] | void {
	if(!!!word  || !!!answer) return console.error("no word input")
	if(word.length != 5 || answer.length != 5) return console.error("words should be 5 char long")

	const a: string[] = word.split('')
	const b: string[] = answer.split('')
	let result: object[] = []

	for (let i = 0; i < a.length; i++) {
		if(a.includes(b[i])) {
			if(b[i] === a[i]) {
				result.push({
					match: true,
					contains: true
				})
				continue
			}
			result.push({
				match: false,
				contains: true
			})
		} else {
			result.push({
				match: false,
				contains: false
			})
		}
	}

	return result
}

export default test