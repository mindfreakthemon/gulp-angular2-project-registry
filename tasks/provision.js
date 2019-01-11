const path = require('path');


module.exports = (gulp) => {
	const baseDir = path.resolve(__dirname, '..');

	/**
	 * Provisions default project structure.
	 */
	gulp.task('provision', () => {
		return gulp.src([
			`${baseDir}/app/**/*`,
			`${baseDir}/styles/**/*`,
			`${baseDir}/statics/**/*`,
			`${baseDir}/index.pug`,
			`${baseDir}/tsconfig.json`,
			`${baseDir}/tslint.json`
		], { base: baseDir })
			.pipe(gulp.dest('.', { overwrite: false }));
	});
};
