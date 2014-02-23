module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                  banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= pkg.repository.url %> */'
            },
            javascript: {
                join: true,
                src: 'src/jBootValidator.js',
                dest: 'build/jBootValidator.min.js'
            }
        },
        clean: {
            build: {
                src: ['build', 'dist']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        copy: {
            minifiedJs: {
                cwd: 'build/',
                src: '*.js',
                dest: 'dist/',
                flatten: true,
                expand: true
            },
            fullJs: {
                cwd: 'src/',
                src: '*.js',
                dest: 'dist/',
                flatten: true,
                expand: true
            }
        },
        jshint: {
            options: {
                shadow: true
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        }
    });

    grunt.registerTask('default', ['clean', 'jshint', 'karma:continuous', 'uglify', 'copy']);
};