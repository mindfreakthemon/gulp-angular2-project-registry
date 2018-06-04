const typescript = require('gulp-typescript');
const plumber = require('gulp-plumber');
const mocha = require('gulp-spawn-mocha');
const del = require('del');


module.exports = (gulp, options) => {
	const testsSrcGlob = `${options.testsDir}/**/*.ts`;
	const testsOutDir = `${options.buildDir}/tests`;

	const project = typescript.createProject(options.tsconfigPath);

	gulp.task('test:clean', () => del([testsOutDir]));

	/**
	 * Compiles typescript application and copies it to app dir.
	 */
	gulp.task('test:compile', () => {
		return gulp.src([testsSrcGlob])
			.pipe(plumber())
			.pipe(project())
			.pipe(gulp.dest(testsOutDir));
	});

	gulp.task('test', gulp.series('test:compile', () => {
		return gulp.src([`${testsOutDir}/**/*.js`], { read: false })
			.pipe(mocha({
				// debugBrk: DEBUG,
				// r: 'node_modules/chai/chai.js',
				R: 'nyan',
				// istanbul: !DEBUG
			}));
	}));

	gulp.task('test:watch', () => gulp.watch(testsSrcGlob, gulp.task('test')));
};
