module.exports = function (grunt) {
    return {
        options: {
            shadow: true
        },
        all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    }
};
