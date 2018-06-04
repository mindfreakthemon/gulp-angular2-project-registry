const stylus = require('gulp-stylus');
const connect = require('gulp-connect');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const del = require('del');
const autoprefixer = require('autoprefixer');


module.exports = (gulp, options) => {
	const cssSrcGlob = `${options.cssDir}/**/*.styl`;
	const cssOutDir = `${options.buildDir}/css`;

	gulp.task('css:clean', () => del([cssOutDir]));

	/**
	 * Compiles each styl file and places it in css dir.
	 */
	gulp.task('css', () => {
		return gulp.src(cssSrcGlob)
			.pipe(plumber())
			.pipe(stylus({
				pretty: true
			}))
			.pipe(postcss([
				autoprefixer(options.autoprefixer)
			]))
			.pipe(gulp.dest(cssOutDir))
			.pipe(connect.reload());
	});

	/**
	 * Compiles each styl file into one bundle and places it in css dir.
	 * Inlines all the images via base64 data URI.
	 */
	gulp.task('css:bundle', () => {
		return gulp.src(cssSrcGlob)
			.pipe(plumber())
			.pipe(stylus({
				compress: true,
				rawDefine: {
					url: stylus.stylus.url({
						limit: false
					})
				}
			}))
			.pipe(postcss([
				autoprefixer(options.autoprefixer)
			]))
			.pipe(concat(options.cssBundlePath))
			.pipe(gulp.dest(options.buildDir));
	});

	gulp.task('css:watch', () => gulp.watch(cssSrcGlob, gulp.task('css')));
};
