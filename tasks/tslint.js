let tslint = require('gulp-tslint');
let plumber = require('gulp-plumber');

const TEST_SRC_GLOB = 'test/**/*.ts';
const APP_SRC_GLOB = 'app/**/*.ts';

const TSLINT_OPTIONS = {
	formatter: 'verbose'
};

module.exports = (gulp) => {
	gulp.task('tslint:app', () => {
		return gulp.src([APP_SRC_GLOB])
			.pipe(plumber())
			.pipe(tslint(TSLINT_OPTIONS))
			.pipe(tslint.report());
	});

	gulp.task('tslint:test', () => {
		return gulp.src([TEST_SRC_GLOB])
			.pipe(plumber())
			.pipe(tslint(TSLINT_OPTIONS))
			.pipe(tslint.report());
	});

	gulp.task('tslint', gulp.parallel('tslint:app', 'tslint:test'));
};
