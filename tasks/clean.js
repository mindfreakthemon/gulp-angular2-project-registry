const del = require('del');

module.exports = (gulp, options) => {
	gulp.task('clean', () => del([options.paths.buildDir]));
};
