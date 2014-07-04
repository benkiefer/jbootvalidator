module.exports = function (grunt) {
    'use strict';
    require('load-grunt-config')(grunt, {
        data: {
            bower: grunt.file.readJSON('./bower.json')
        }
    });
};