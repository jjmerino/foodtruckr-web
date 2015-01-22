'use strict';

module.exports = function (grunt) {


  grunt.initConfig({

    useminPrepare: {
      html: 'index.html',
      options:{
        dest:'dist'
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        assetsDirs: ['dist']
      }
    },
    copy:{
      dist:{
        files:[{
          dest: 'dist/',
          src:['index.html']
        }]
      }

    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            'dist/.git*',
            'dist/Procfile'
          ]
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build',['clean:dist','useminPrepare','concat','uglify','cssmin','copy','usemin']);
};