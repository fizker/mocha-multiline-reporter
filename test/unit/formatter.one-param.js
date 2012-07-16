describe('unit/formatter.one-param.js', function() {
	var formatter = require('../../src/formatter')

	describe('When formatting a single-line string', function() {
		it('should return it as-is', function() {
			var result = formatter('expected "abc" to "def"')

			expect(result).to.equal('expected "abc" to "def"')
		})
	})

	describe('When formatting a multi-line actual', function() {
		it('should return the actual on two lines', function() {
			var result = formatter('expected "abc" to equal "abc\\ndef"')

			expect(result).to.equal(
				  'expected |abc| to equal |abc|\n'
				+ '                        |def|'
			)
		})
		it('should return the expect on three lines', function() {
			var result = formatter('expected "abc" to equal "abc\\ndef\\nghi"')

			expect(result).to.equal(
				  'expected |abc| to equal |abc|\n'
				+ '                        |def|\n'
				+ '                        |ghi|'
			)
		})
		it('should make expect the same length on all lines', function() {
			var result = formatter(
			      'expected "abc" to equal "abc\\ndefg\\nghi"')

			expect(result).to.equal(
				  'expected |abc| to equal |abc |\n'
				+ '                        |defg|\n'
				+ '                        |ghi |'
			)
		})
	})

	describe('When formatting a multi-line expect', function() {
		it('should return the expect on two lines', function() {
			var result = formatter('expected "abc\\ndef" to equal "def"')

			expect(result).to.equal(
				  'expected |abc| to equal |def|\n'
				+ '         |def|'
			)
		})
		it('should return the expect on three lines', function() {
			var result = formatter('expected "abc\\ndef\\nghi" to equal "def"')

			expect(result).to.equal(
				  'expected |abc| to equal |def|\n'
				+ '         |def|\n'
				+ '         |ghi|'
			)
		})
		it('should make expect the same length on all lines', function() {
			var result = formatter(
			      'expected "abc\\n'
			    + 'defg\\n'
			    + 'ghi" to equal "def"')

			expect(result).to.equal(
				  'expected |abc | to equal |def|\n'
				+ '         |defg|\n'
				+ '         |ghi |'
			)
		})
	})
})
