let pug = require('gulp-pug');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let inject = require('gulp-inject');
let inline = require('gulp-inline-source');
let series = require('stream-series');
let del = require('del');


module.exports = (gulp, options) => {
	const pagesOutDir = options.paths.buildDir;

	gulp.task('pages:clean', () => del([path.join(pagesOutDir, options.paths.entrypointPath)]));

	/**
	 * Injects vendor bundle into js section and all css files into css section.
	 */
	gulp.task('pages', gulp.series('vendor', 'css', () => {
		return gulp.src(options.paths.indexFile)
			.pipe(plumber())
			.pipe(inject(gulp.src(`${pagesOutDir}/${options.paths.vendorBundlePath}`, { read: false })))
			.pipe(inject(gulp.src(`${pagesOutDir}/css/**/*.css`, { read: false })))
			.pipe(pug({
				locals: { main: options.paths.mainModule, ...options },
				pretty: true
			}))
			.pipe(gulp.dest(pagesOutDir))
			.pipe(connect.reload());
	}));

	/**
	 * Injects vendor bundle, app bundle into js section and all css into css section.
	 */
	gulp.task('pages:bundle', gulp.series('vendor', 'app:bundle', 'css:bundle', () => {
		const vendor = gulp.src(`${pagesOutDir}/${options.paths.vendorBundlePath}`, {
			read: false,
			basedir: pagesOutDir
		});
		const app = gulp.src(`${pagesOutDir}/${options.paths.appBundlePath}`, {
			read: false,
			basedir: pagesOutDir
		});

		return gulp.src(options.paths.indexFile)
			.pipe(plumber())
			.pipe(inject(series(vendor, app), {
				// transform: (filepath) => `script(inline, src='${filepath}')`
			}))
			.pipe(inject(gulp.src(`${pagesOutDir}/css/**/*.css`, {
				read: false,
				basedir: pagesOutDir
			}), {
				// transform: (filepath) => `link(inline, rel='stylesheet', href='${filepath}')`
			}))
			.pipe(pug({
				locals: { main: options.paths.productionModule, ...options },
			}))
			.pipe(inline({
				rootpath: '.'
			}))
			.pipe(gulp.dest(pagesOutDir));
	}));

	gulp.task('pages:watch', () => gulp.watch(options.paths.indexFile, gulp.task('pages')));

};
