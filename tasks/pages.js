let pug = require('gulp-pug');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let inject = require('gulp-inject');
let inline = require('gulp-inline-source');
let series = require('stream-series');
let del = require('del');

const PAGES_SRC_GLOB = 'assets/index.pug';
const PAGES_OUT_DIR = '.';

module.exports = (gulp) => {
	gulp.task('pages:clean', () => del([path.join(PAGES_OUT_DIR, 'index.html')]));

	/**
	 * Injects vendor bundle into js section and all css files into css section.
	 */
	gulp.task('pages', gulp.series('vendor', 'css', () => {
		return gulp.src(PAGES_SRC_GLOB)
			.pipe(plumber())
			.pipe(inject(gulp.src('build/bundle/vendor.min.js', { read: false })))
			.pipe(inject(gulp.src('build/css/*.css', { read: false })))
			.pipe(pug({ pretty: true }))
			.pipe(gulp.dest(PAGES_OUT_DIR))
			.pipe(connect.reload());
	}));

	/**
	 * Injects vendor bundle, app bundle into js section and all css into css section.
	 */
	gulp.task('pages:prod', gulp.series('vendor', 'app:bundle', 'css:bundle', () => {
		let vendor = gulp.src('build/bundle/vendor.min.js', { read: false });
		let app = gulp.src('build/bundle/app.min.js', { read: false });

		return gulp.src(PAGES_SRC_GLOB)
			.pipe(plumber())
			.pipe(inject(series(vendor, app), {
				// transform: (filepath) => `script(inline, src='${filepath}')`
			}))
			.pipe(inject(gulp.src('build/css/*.css', { read: false }), {
				// transform: (filepath) => `link(inline, rel='stylesheet', href='${filepath}')`
			}))
			.pipe(pug())
			.pipe(inline({
				rootpath: '.'
			}))
			.pipe(gulp.dest(PAGES_OUT_DIR))
			.pipe(connect.reload());
	}));

	gulp.task('pages:watch', () => gulp.watch(PAGES_SRC_GLOB, gulp.task('pages')));

};
