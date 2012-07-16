describe('unit/formatter.delimiters.js', function() {
	var formatter = require('../../src/formatter')
	describe('When using double-quotes', function() {
		it('parses the content correctly', function() {
			var result = formatter('"abc\\nde" "abc\\nde"')
			expect(result).to.equal(
				  '|abc| |abc|\n'
				+ '|de | |de |'
			)
		})
	})

	describe('When using single-quotes', function() {
		it('parses the content correctly', function() {
			var result = formatter("'abc\\nde' 'abc\\nde'")
			expect(result).to.equal(
				  '|abc| |abc|\n'
				+ '|de | |de |'
			)
		})
	})

	describe('When using mixed quotes', function() {
		it('parses the content correctly', function() {
			var result = formatter("\"abc\\nde\" 'abc\\nde'")
			expect(result).to.equal(
				  '|abc| |abc|\n'
				+ '|de | |de |'
			)
		})
	})

	describe('When using the other quotes inside the quotes', function() {
		it('parses the content correctly', function() {
			var result = formatter("\"abc'\\nde\" 'abc\"\\nde'")
			expect(result).to.equal(
				  '|abc\'| |abc"|\n'
				+ '|de  | |de  |'
			)
		})
	})
})
