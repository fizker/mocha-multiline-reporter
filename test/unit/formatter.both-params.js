describe('unit/formatter.both.params.js', function() {
	var formatter = require('../../src/formatter')
	describe('When both expect and actual are on two lines', function() {
		it('should still format correctly', function() {
			var result = formatter('expected "abc\\nde" to equal "ab\\ncde"')
			expect(result).to.equal(
				  'expected |abc| to equal |ab |\n'
				+ '         |de |          |cde|'
			)
		})
	})

	describe('When both expect and actual are on multiple lines', function() {
		describe('but expect is on more lines', function() {
			it('should still format correctly', function() {
				var result = formatter('expected "abc\\nde\\nf" to equal "ab\\ncde"')
				expect(result).to.equal(
					  'expected |abc| to equal |ab |\n'
					+ '         |de |          |cde|\n'
					+ '         |f  |'
				)
			})
		})
		describe('but actual is on more lines', function() {
			it('should still format correctly', function() {
				var result = formatter('expected "abc\\nde" to equal "ab\\ncde\\nf"')
				expect(result).to.equal(
					  'expected |abc| to equal |ab |\n'
					+ '         |de |          |cde|\n'
					+ '                        |f  |'
				)
			})
		})
	})
})
