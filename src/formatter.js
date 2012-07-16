module.exports = format

function format(input) {
	if(/\\n/.test(input)) {
		return fixNewline(input)
	}
	return input
}

function fixNewline(input) {
	var idxS = input.indexOf('"')
	  , idxE = input.indexOf('"', idxS+1)
	  , idx
	  , expect = getDetails(input)
	  , actual
	  , lines = []

	input = input.substring(0, expect.idxS) + '|'
	      + padStr(expect.lines[0], expect.length)
	      + '|' + input.substr(expect.idxE + 1)

	actual = getDetails(input, expect.idxS + expect.length + 2)

	input = input.substring(0, actual.idxS) + '|'
	      + padStr(actual.lines[0], actual.length)
	      + '|' + input.substr(actual.idxE + 1)

	for(idx = 0; idx < Math.max(expect.lines.length, actual.lines.length); idx++) {
		lines.push([ expect.lines[idx], actual.lines[idx] ])
	}

	return lines.slice(1).reduce(addLines, input)

	function addLines(memo, line) {
		memo += '\n'
		if(line[0]) {
			memo = memo
			     + padStr('', expect.idxS)
			     + '|'
			     + padStr(line[0], expect.length)
			     + '|'
		}

		if(line[1]) {
			memo = memo
			     + padStr('', actual.idxS - (line[0] ? expect.lineLength : 0))
			     + '|'
			     + padStr(line[1], actual.length)
			     + '|'
		}

		return memo.replace(/\s+$/, '')
	}
}

function getDetails(input, start) {
	var idxS = input.indexOf('"', start)
	  , idxE = input.indexOf('"', idxS+1)
	  , str = input.substring(idxS+1, idxE)
	  , lines = str.split(/\\n/g)
	  , length = lines.reduce(getLength, 0)

	return (
		{ str: str
		, idxS: idxS
		, idxE: idxE
		, lines: lines
		, length: length
		, lineLength: idxS + length + 2
		}
	)
}

function padStr(str, length) {
	return str + new Array(1 + length - str.length).join(' ')
}

function getLength(currentMax, line) {
	return Math.max(currentMax, line.length)
}
