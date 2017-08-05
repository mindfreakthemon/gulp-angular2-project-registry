let connect = require('gulp-connect');

module.exports = (gulp) => {

	gulp.task('connect', () => {
		return connect.server({
			root: '.',
			port: 8080,
			livereload: true
		});
	});

};
