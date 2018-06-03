const stylus = require('gulp-stylus');
const connect = require('gulp-connect');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const del = require('del');
const autoprefixer = require('autoprefixer');


module.exports = (gulp, options) => {
	const stylesSrcGlob = `${options.paths.sourceDir}/**/*.styl`;
	const stylesOutDir = `${options.paths.buildDir}/app`;

	gulp.task('styles:clean', () => del([`${stylesOutDir}/**/*.styl`]));

	/**
	 * Compiles templates.
	 */
	gulp.task('styles', () => {
		return gulp.src(stylesSrcGlob, { base: options.paths.sourceDir })
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
