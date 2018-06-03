let connect = require('gulp-connect');

module.exports = (gulp, options) => {

	gulp.task('connect', () => {
		return connect.server({
			root: [options.paths.buildDir, '.'],
			port: options.port,
			livereload: true
		});
	});

};
