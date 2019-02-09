const concat = require('gulp-concat');
const terser = require('gulp-terser');
const path = require('path');


const STATIC_VENDOR_LIST = [
	'node_modules/systemjs/dist/system.js',
	path.resolve(__dirname, '..', 'systemjs.base-config.js')
];

module.exports = (gulp, options) => {
	/**
	 * Copies vendors that are statically linked in html page.
	 */
	gulp.task('vendor', () => {
		let vendors = STATIC_VENDOR_LIST;

		if (options.systemConfig) {
			vendors = vendors.concat(options.systemConfig);
		}

		return gulp.src(vendors.concat(options.vendors), { base: 'node_modules' })
			.pipe(concat(options.vendorBundlePath))
			.pipe(terser())
			.pipe(gulp.dest(options.buildDir));
	});

	gulp.task('vendor:watch', () => gulp.watch(STATIC_VENDOR_LIST.concat(options.vendors), gulp.task('vendor')));
};
