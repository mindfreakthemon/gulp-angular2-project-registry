const connect = require('gulp-connect');
const del = require('del');


module.exports = (gulp, options) => {
	const staticsSrcGlob = `${options.staticsDir}/**/*`;
	const staticsOutDir = `${options.buildDir}/statics`;

	gulp.task('statics:clean', () => del([staticsSrcGlob]));

	/**
	 * Copies all statics to statics dir.
	 */
	gulp.task('statics', () => {
		return gulp.src(staticsSrcGlob)
			.pipe(gulp.dest(staticsOutDir))
			.pipe(connect.reload());
	});

	gulp.task('statics:watch', () => gulp.watch(staticsSrcGlob, gulp.task('statics')));
};
