module.exports = function (grunt) {
    return {
        release: {
            options: {
			bump: false, //default: true
			file: 'component.json', //default: package.json
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
