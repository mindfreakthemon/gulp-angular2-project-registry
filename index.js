const DefaultRegistry = require('undertaker-registry');

const css = require('./tasks/css');
const styles = require('./tasks/styles');
const templates = require('./tasks/templates');
const vendor = require('./tasks/vendor');
const app = require('./tasks/app');
const statics = require('./tasks/statics');
const pages = require('./tasks/pages');
const connect = require('./tasks/connect');
const clean = require('./tasks/clean');
const test = require('./tasks/test');
const tslint = require('./tasks/tslint');
const provision = require('./tasks/provision');

class CustomRegistry extends DefaultRegistry {


	constructor(options) {
		super();

		this.options = Object.assign({
			vendors: [],
			port: 8080,

			indexFile: 'index.pug',
			sourcesDir: 'app',
			testsDir: 'tests',
			cssDir: 'styles',
			staticsDir: 'statics',
			buildDir: 'build',

			tsconfigPath: 'tsconfig.json',

			appBundlePath: 'bundle/app.min.js',
			cssBundlePath: 'bundle/bundle.min.css',
			vendorBundlePath: 'bundle/vendor.min.js',

			addRootSlash: false,

			mainModule: 'main',
			productionModule: 'main-aot',

			map: {}

		}, options);

		this.options.autoprefixer = Object.assign({
			browsers: ['last 2 versions']
		}, this.options.autoprefixer);

		this.options.tslintOptions = Object.assign({
			formatter: 'verbose'
		}, this.options.tslintOptions);
	}

	init(gulp) {
		css(gulp, this.options);
		styles(gulp, this.options);
		templates(gulp, this.options);
		vendor(gulp, this.options);
		app(gulp, this.options);
		connect(gulp, this.options);
		pages(gulp, this.options);
		clean(gulp, this.options);
		statics(gulp, this.options);
		tslint(gulp, this.options);
		test(gulp, this.options);
		provision(gulp, this.options);

		gulp.task('compile', gulp.parallel('statics', 'app', 'templates', 'styles', 'css', 'pages'));
		gulp.task('compile:bundle', gulp.parallel('statics', 'pages:bundle'));

		gulp.task('watch', gulp.parallel(
			'css:watch',
			'templates:watch',
			'css:watch',
			'styles:watch',
			'app:watch',
			'pages:watch',
			'statics:watch',
			'vendor:watch'
		));

		gulp.task('dev', gulp.series('clean', gulp.parallel('vendor', 'compile'), gulp.parallel('watch', 'connect')));
		gulp.task('bundle', gulp.series('clean', gulp.parallel('vendor', 'compile:bundle'), 'connect'));
	}
}

module.exports = CustomRegistry;
