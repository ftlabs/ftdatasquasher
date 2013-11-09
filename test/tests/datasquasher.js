var buster = require('buster');
var squasher = require('../../lib/ftdatasquasher');
var assert = buster.assertions.assert;

buster.testCase('datasquasher', {

	"A known string should compress and decompress to expected values": function () {

		// A base 64 encoded version of 'The quick brown fox jumps over the lazy dog'
		var sample = "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==";
		var expected = "噇桬䥈䘱慗乲䥇䩹戳摵䥇婶敃䉱摗ㅷ捹䉶摭噹䥈副婓䉳奘瀵䥇剶婷㴽";
		var actual = squasher.compress(sample);

		assert.equals(expected, actual);

		// And decompress again...
		var actual = squasher.decompress(actual);
		assert.equals(sample, actual);
	},

	"Edge case - check when string not even number of characters": function () {
		var sample = "abc";
		var expected = "慢挠";
		var actual = squasher.compress(sample);

		assert.equals(expected, actual);

		// And decompress again...
		var actual = squasher.decompress(actual);

		// Not quite the same - has a space at the end.
		assert.equals(sample + ' ', actual);
	}

});
