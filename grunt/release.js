module.exports = function (grunt) {
    return {
        release: {
            options: {
			bump: false, 
			file: 'bower.json', 
			npm: false, 
			npmtag: false, 
			github: { 
				repo: 'benkiefer/jBootValidator', 
				usernameVar: 'GITHUB_USERNAME', 
				passwordVar: 'GITHUB_PASSWORD'
			}
    }
        }
    }
};
