const path = require('path');


module.exports = (gulp, options) => {
	const baseDir = path.resolve(__dirname, '..');

	/**
	 * Provisions default project structure.
	 */
	gulp.task('provision', () => {
		return gulp.src([
			`${baseDir}/app/**/*`,
			`${baseDir}/assets/**/*`,
			`${baseDir}/tsconfig.json`,
			`${baseDir}/tslint.json`
		], { base: baseDir })
			.pipe(gulp.dest('.', { overwrite: false }));
	});
};
