let pug = require('gulp-pug');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let del = require('del');


module.exports = (gulp, options) => {
	const templatesSrcGlob = `${options.paths.sourceDir}/**/*.pug`;
	const templatesOutDir = `${options.paths.buildDir}/app`;

	gulp.task('templates:clean', () => del([`${templatesOutDir}/**/*.html`]));

	/**
	 * Compiles templates.
	 */
	gulp.task('templates', gulp.series('templates:clean', () => {
		return gulp.src(templatesSrcGlob, { base: options.paths.sourceDir })
			.pipe(plumber())
			.pipe(pug({ pretty: true }))
			.pipe(gulp.dest(templatesOutDir))
			.pipe(connect.reload());
	}));

	gulp.task('templates:watch', () => gulp.watch(templatesSrcGlob, gulp.task('templates')));
};
