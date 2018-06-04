const stylus = require('gulp-stylus');
const connect = require('gulp-connect');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const del = require('del');
const autoprefixer = require('autoprefixer');


module.exports = (gulp, options) => {
	const stylesSrcGlob = `${options.sourcesDir}/**/*.styl`;
	const stylesOutDir = `${options.buildDir}/app`;

	gulp.task('styles:clean', () => del([`${stylesOutDir}/**/*.styl`]));

	/**
	 * Compiles templates.
	 */
	gulp.task('styles', () => {
		return gulp.src(stylesSrcGlob, { base: options.sourcesDir })
			.pipe(plumber())
			.pipe(stylus({ pretty: true }))
			.pipe(postcss([
				autoprefixer(options.autoprefixer)
			]))
			.pipe(gulp.dest(stylesOutDir))
			.pipe(connect.reload());
	});

	gulp.task('styles:watch', () => gulp.watch(stylesSrcGlob, gulp.task('styles')));
};
