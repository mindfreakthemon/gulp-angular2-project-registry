const pug = require('gulp-pug');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const inject = require('gulp-inject');
const inline = require('gulp-inline-source');
const series = require('stream-series');
const del = require('del');
const path = require('path');

module.exports = (gulp, options) => {
	const pagesOutDir = options.buildDir;
	const entryPoint = `${path.basename(options.indexFile, '.pug')}.html`;

	gulp.task('pages:clean', () => del([path.join(pagesOutDir, entryPoint)]));

	/**
	 * Injects vendor bundle into js section and all css files into css section.
	 */
	gulp.task('pages', gulp.series('vendor', 'css', () => {
		return gulp.src(options.indexFile)
			.pipe(plumber())
			.pipe(inject(gulp.src(`${pagesOutDir}/${options.vendorBundlePath}`, { read: false }), {
				addRootSlash: options.addRootSlash,
				ignorePath: pagesOutDir
			}))
			.pipe(inject(gulp.src(`${pagesOutDir}/css/**/*.css`, { read: false }), {
				addRootSlash: options.addRootSlash,
				ignorePath: pagesOutDir
			}))
			.pipe(pug({
				locals: { main: options.mainModule, ...options },
				pretty: true
			}))
			.pipe(gulp.dest(pagesOutDir))
			.pipe(connect.reload());
	}));

	/**
	 * Injects vendor bundle, app bundle into js section and all css into css section.
	 */
	gulp.task('pages:bundle', gulp.series('vendor', 'app:bundle', 'css:bundle', () => {
		const vendor = gulp.src(`${pagesOutDir}/${options.vendorBundlePath}`, {
			read: false
		});
		const app = gulp.src(`${pagesOutDir}/${options.appBundlePath}`, {
			read: false
		});

		return gulp.src(options.indexFile)
			.pipe(plumber())
			.pipe(inject(series(vendor, app), {
				addRootSlash: options.addRootSlash,
				ignorePath: pagesOutDir
				// TODO make optional the ability to inline into the page
				// transform: (filepath) => `script(inline, src='${filepath}')`
			}))
			.pipe(inject(gulp.src(`${pagesOutDir}/${options.cssBundlePath}`, {
				read: false
			}), {
				addRootSlash: options.addRootSlash,
				ignorePath: pagesOutDir
				// TODO make optional the ability to inline into the page
				// transform: (filepath) => `link(inline, rel='stylesheet', href='${filepath}')`
			}))
			.pipe(pug({
				locals: { main: options.productionModule, ...options }
			}))
			.pipe(inline({
				rootpath: '.'
			}))
			.pipe(gulp.dest(pagesOutDir));
	}));

	gulp.task('pages:watch', () => gulp.watch(options.indexFile, gulp.task('pages')));

};
