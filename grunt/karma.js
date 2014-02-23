module.exports = function (grunt) {
    return {
        options: {
            configFile: 'karma.conf.js',
            singleRun: true
        },
        continuous: {
            singleRun: true,
            browsers: ['PhantomJS']
        }
    }
};
