var config = module.exports;

config.datasquasher = {
	rootPath: '../',
	environment: 'node',
	sources: [
		'build/ftdatasquasher.js'
	],
	tests: [
		'test/tests/*.js'
	],
	extensions: [
		require('buster-istanbul')
	],
	"buster-istanbul": {
		instrument: false,
		outputDirectory: "coverage"
	}
};
