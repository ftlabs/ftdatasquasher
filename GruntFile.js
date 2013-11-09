module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    buster: {
      test: {}
    },

    browserify: {
      src: 'lib/ftdatasquasher.js',
      dest: 'build/ftdatasquasher.js',
      options: {
        standalone: 'DataSquasher'
      },
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
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task.
  grunt.registerTask('default', ['browserify:build']);
  grunt.registerTask('test', ['buster:test']);
};
