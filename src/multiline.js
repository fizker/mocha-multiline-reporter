exports = module.exports = multiline

var color = require('mocha').reporters.Base.color
  , write = process.stdout.write.bind(process.stdout)

function multiline(runner) {
	var fails = []

	runner.on('start', function() {
		write('\n')
	})
	runner.on('pending', function() {
		write(color('pending', '.'))
	})
	runner.on('pass', function(test) {
		if(test.speed == 'slow') {
			write(color('bright yellow', '.'))
		} else {
			write('.')
		}
	})
	runner.on('fail', function(test, err) {
		test.err = err
		fails.push(test)

		write(color('fail', '.'))
	})

	runner.on('end', function() {
		write('\n\n')
		fails.forEach(function(test) {
			write(color('fail', test.err.toString()))
		})
		write('\n')
	})
}
