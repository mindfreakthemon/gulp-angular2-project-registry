let connect = require('gulp-connect');
let del = require('del');

const STATICS_SRC_GLOB = 'assets/statics/**/*';
const STATICS_OUT_DIR = 'build/statics';

module.exports = (gulp) =>{
	gulp.task('statics:clear', () => del([STATICS_OUT_DIR]));

	/**
	 * Copies all statics to statics dir.
	 */
	gulp.task('statics', gulp.series('statics:clear', () => {
		return gulp.src(STATICS_SRC_GLOB)
			.pipe(gulp.dest(STATICS_OUT_DIR))
			.pipe(connect.reload());
	}));

	gulp.task('statics:watch', () => gulp.watch(STATICS_SRC_GLOB, gulp.task('statics')));
};
