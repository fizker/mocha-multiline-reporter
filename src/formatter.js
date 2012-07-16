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
	  , idxN = input.indexOf('\\n')

	if(idxN < idxE) {
		return addMultipleLines(input, 0)
	} else {
		return addMultipleLines(input, idxE+2)
	}
}

function addMultipleLines(input, start) {
	var idxS = input.indexOf('"', start)
	  , idxE = input.indexOf('"', idxS+1)
	  , str = input.substring(idxS+1, idxE)
	  , lines = str.split(/\\n/g)
	  , length = lines.reduce(getLength, 0)

	input = input.substring(0, idxS+1) + padStr(lines[0], length) + input.substring(idxE)

	return lines.slice(1).reduce(indentExpect, input)

	function indentExpect(memo, line) {
		return memo + '\n'
		     + padStr('', idxS)
		     + '"'
		     + padStr(line, length)
		     + '"'
	}
}

function padStr(str, length) {
	return str + new Array(1 + length - str.length).join(' ')
}

function getLength(currentMax, line) {
	return Math.max(currentMax, line.length)
}
