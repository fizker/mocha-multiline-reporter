multiline-reporter
==================

A multi-line reporter for mocha, based on the dot-reporter from mocha.

The purpose of this reporter is to make error-messages containing significant
whitespace more readable.

If given a string such as `Expected "abc\ndefgh\ni" to equal "abc\ndefgh\nij"`,
it will print something like this:

	Expected | abc   | to equal | abc   |
	         | defgh |          | defgh |
	         | i     |          | ij    |
