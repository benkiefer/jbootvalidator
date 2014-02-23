module.exports = function (grunt) {
    return {
        options: {
            banner: '/*! <%= package.name %> - v<%= package.version %> - ' +
                '<%= package.repository.url %> */'
        },
        javascript: {
            join: true,
            src: 'src/jBootValidator.js',
            dest: 'build/jBootValidator.min.js'
        }
    }
};
