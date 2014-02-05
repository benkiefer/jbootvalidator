module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            javascript: {
                join: true,
                src: 'src/js/jBootValidator.js',
                dest: 'build/js/jBootValidator.min.js'
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
                cwd: 'build/js/',
                src: '*.js',
                dest: 'dist/',
                flatten: true,
                expand: true
            },
            fullJs: {
                cwd: 'src/js/',
                src: '*.js',
                dest: 'dist/',
                flatten: true,
                expand: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'karma:continuous', 'uglify', 'copy']);
};