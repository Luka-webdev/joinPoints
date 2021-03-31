module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dist: {
          files: {
            'css/style.css': 'scss/style.scss'
          }
        }
      },
      autoprefixer: {
        dist: {
          src:'css/style.css',
          dest:'css/styleprefixer.css'
        },
      },
      cssmin: {
        target: {
          files: {
            'css/styleprefixer.min.css': ['css/styleprefixer.css']
          }
        }
      },
      uglify: {
        my_target: {
          files: {
            'js/script.min.js': ['js/script.js']
          }
        }
      },
      watch: {
          files: ['scss/style.scss'],
          tasks: ['sass'],
      },
    })
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
}