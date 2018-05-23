let typescript = require('gulp-tsc');
let plumber = require('gulp-plumber');
let mocha = require('gulp-spawn-mocha');
let del = require('del');

const TEST_SRC_GLOB = 'test/**/*.ts';
const TEST_OUT_DIR = 'build/test';

module.exports = (gulp) => {

	gulp.task('test:clean', () => del([TEST_OUT_DIR]));

	/**
	 * Compiles typescript application and copies it to app dir.
	 */
	gulp.task('test:compile', gulp.series('test:clean', () => {
		let compilerOptions = require('../tsconfig.json').compilerOptions;

		return gulp.src(['typings/index.d.ts', TEST_SRC_GLOB])
			.pipe(plumber())
			.pipe(typescript(compilerOptions))
			.pipe(gulp.dest(TEST_OUT_DIR));
	}));

	gulp.task('test', gulp.series('test:compile', () => {
		return gulp.src(['typings/index.d.ts', `${TEST_OUT_DIR}/**/*.js`], { read: false })
			.pipe(mocha({
				// debugBrk: DEBUG,
				// r: 'node_modules/chai/chai.js',
				R: 'nyan',
				// istanbul: !DEBUG
			}));
	}));

	gulp.task('test:watch', () => gulp.watch(TEST_SRC_GLOB, gulp.task('test')));
};
