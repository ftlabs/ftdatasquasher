var config = module.exports;

config.datasquasher = {
	rootPath: '../',
  sources: [
    "lib/*.js"
  ],
	environment: 'node',
  "buster-istanbul": {
    outputDirectory: "coverage",
    format: ["lcov", "html"]
  },
	tests: [
		'test/tests/*.js'
	],
  extensions: [
    require('buster-istanbul')
  ]
};
