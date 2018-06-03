const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const path = require('path');


const STATIC_VENDOR_LIST = [
	'node_modules/systemjs/dist/system.js',
	path.resolve(__dirname, '..', 'config/systemjs.base-config.js')
];

module.exports = (gulp, options) => {
	/**
	 * Copies vendors that are statically linked in html page.
	 */
	gulp.task('vendor', () => {
		return gulp.src(STATIC_VENDOR_LIST.concat(options.vendors), { base: 'node_modules' })
			.pipe(concat(options.paths.vendorBundlePath))
			.pipe(uglify())
			.pipe(gulp.dest(options.paths.buildDir));
	});
};
