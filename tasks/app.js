const typescript = require('gulp-typescript');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const embed = require('gulp-inline-ng2-template');
const del = require('del');
const Builder = require('systemjs-builder');
const path = require('path');

const APP_SRC_GLOB = 'app/**/*.ts';
const APP_OUT_DIR = 'build/app';

module.exports = (gulp) => {

	gulp.task('app:clean', () => del([`${APP_OUT_DIR}/**/*.js`]));

	/**
	 * Compiles typescript application and copies it to app dir.
	 */
	gulp.task('app', gulp.series('app:clean', () => {
		let project = typescript.createProject(path.join(process.cwd(), 'tsconfig.json'))

		return gulp.src([APP_SRC_GLOB])
			.pipe(plumber())
			.pipe(project())
			.pipe(gulp.dest(APP_OUT_DIR))
			.pipe(connect.reload());
	}));

	/**
	 * Embeds compiled templates & styles into compiled application.
	 */
	gulp.task('app:embed', gulp.series('app', 'styles', 'templates', () => {
		return gulp.src(`${APP_OUT_DIR}/**/*.js`, { base: APP_OUT_DIR })
			.pipe(embed({
				target: 'es5',
				useRelativePaths: true
			}))
			.pipe(gulp.dest(APP_OUT_DIR));
	}));

	/**
	 * Bundles application into one file, along with RxJS and Angular2.
	 */
	gulp.task('app:prod', gulp.series('app:embed', 'vendor', () => {
		var builder = new Builder('.', './systemjs.config.js');

		return builder.bundle('app', 'build/bundle/app.min.js', { minify: true });
	}));

	gulp.task('app:watch', () => gulp.watch(APP_SRC_GLOB, { ignored: '**/.gulp-tsc-tmp*.ts' }, gulp.task('app')));
};
