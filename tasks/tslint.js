const tslint = require('gulp-tslint');
const plumber = require('gulp-plumber');


module.exports = (gulp, options) => {
	gulp.task('tslint:app', () => {
		return gulp.src([`${options.sourcesDir}/**/*.ts`])
			.pipe(plumber())
			.pipe(tslint(options.tslintOptions))
			.pipe(tslint.report());
	});

	gulp.task('tslint:test', () => {
		return gulp.src([`${options.testsDir}/**/*.ts`])
			.pipe(plumber())
			.pipe(tslint(options.tslintOptions))
			.pipe(tslint.report());
	});

	gulp.task('tslint', gulp.parallel('tslint:app', 'tslint:test'));
};
