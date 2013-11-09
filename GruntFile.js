module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    buster: {
      test: {}
    },

    browserify: {
      build: {
        src: 'lib/ftdatasquasher.js',
        dest: 'build/ftdatasquasher.js'
      },
      test: {
        src: 'coverage/lib/ftdatasquasher.js',
        dest: 'coverage/build/ftdatasquasher.js'
      },
      options: {
        standalone: 'DataSquasher'
      },
    },

    instrument: {
      files: 'lib/**/*.js',
      options: {
        basePath: 'coverage/'
      }
    },

    jsdoc: {
      dist: {
        src: ['lib/*.js', 'README.md'],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task.
  grunt.registerTask('default', ['browserify:build']);
  grunt.registerTask('test', ['instrument', 'browserify:test', 'buster:test']);
};
