module.exports = function (grunt) {
    return {
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
    }
};
