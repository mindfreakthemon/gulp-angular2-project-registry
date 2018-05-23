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

class CustomRegistry extends DefaultRegistry {

	constructor(options) {
		super();

		this.options = options || {};
	}

	init(gulp) {
		css(gulp);
		styles(gulp);
		templates(gulp);
		vendor(gulp, this.options.vendor);
		app(gulp);
		statics(gulp);
		pages(gulp);
		connect(gulp);
		clean(gulp);
		test(gulp);
		tslint(gulp);


		gulp.task('compile', gulp.parallel('statics', 'app', 'templates', 'styles', 'css', 'pages'));
		gulp.task('compile:prod', gulp.parallel('statics', 'pages:prod'));

		gulp.task('watch', gulp.parallel('css:watch', 'templates:watch', 'css:watch', 'styles:watch', 'app:watch', 'pages:watch', 'statics:watch'));

		gulp.task('dev', gulp.series('clean', gulp.parallel('vendor', 'compile', 'connect')));
		gulp.task('prod', gulp.series('clean', gulp.parallel('vendor', 'compile:prod', 'connect')));
	}
}

module.exports = CustomRegistry;
