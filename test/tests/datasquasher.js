var buster = require('buster');

buster.testCase('datasquasher', {

	"A known string should compress and decompress to expected values": function () {

		// A base 64 encoded version of 'The quick brown fox jumps over the lazy dog'
		var sample = "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==";

		var expected = "噇桬䥈䘱慗乲䥇䩹戳摵䥇婶敃䉱摗ㅷ捹䉶摭噹䥈副婓䉳奘瀵䥇剶婷㴽";
		var squasher = require('../../coverage/lib/ftdatasquasher');
		var actual = squasher.compress(sample);

		assert.equals(expected, actual);

		// And decompress again...
		var actual = squasher.decompress(actual);
		assert.equals(sample, actual);
	}

});
