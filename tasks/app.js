const typescript = require('gulp-typescript');
const connect = require('gulp-connect');
const plumber = require('gulp-plumber');
const embed = require('gulp-inline-ng2-template');
const del = require('del');
const path = require('path');
const Builder = require('systemjs-builder');
const ngc = require('@angular/compiler-cli');

module.exports = (gulp, options) => {
	const appSrcGlob = `${options.sourcesDir}/**/*.ts`;
	const appOutDir = `${options.buildDir}/app`;
	const bundlePath = `${options.buildDir}/${options.appBundlePath}`;

	const project = typescript.createProject(options.tsconfigPath);

	gulp.task('app:clean', () => del([`${appOutDir}/**/*.js`]));

	/**
	 * Compiles typescript application and copies it to app dir.
	 */
	gulp.task('app', () => {
		return gulp.src([appSrcGlob, `!${options.sourcesDir}/${options.productionModule}.ts`])
			.pipe(plumber())
			.pipe(project())
			.pipe(gulp.dest(appOutDir))
			.pipe(connect.reload());
	});

	/**
	 * Embeds compiled templates & styles into compiled application.
	 */
	gulp.task('app:embed', gulp.series('app', 'styles', 'templates', () => {
		return gulp.src(`${appOutDir}/**/*.js`, { base: appOutDir })
			.pipe(embed({
				target: 'es5',
				useRelativePaths: true
			}))
			.pipe(gulp.dest(appOutDir));
	}));

	gulp.task('app:compile', gulp.series('styles', 'templates', () => {
		return gulp.src([appSrcGlob])
			.pipe(gulp.dest(appOutDir))
			.pipe(embed({
				target: 'es6',
				useRelativePaths: true
			}))
			.pipe(gulp.dest(appOutDir));
	}));

	gulp.task('app:ngc', gulp.series('app:compile', (done) => {
		const config = ngc.readConfiguration('tsconfig.json');

		config.rootNames = [`${options.buildDir}/app/${options.productionModule}.ts`];
		config.options.genDir = options.buildDir;
		config.options.basePath = '.';

		const result = ngc.performCompilation(config);

		result.program.emit();

		done();
	}));

	/**
	 * Bundles application into one file, along with RxJS and Angular2.
	 */
	gulp.task('app:bundle', gulp.series('app:ngc', 'vendor', () => {
		const builder = new Builder('.', path.resolve(__dirname, '..', 'systemjs.base-config.js'));

		if (options.systemConfig) {
			builder.loadConfigSync(options.systemConfig, true, true);
		}

		builder.config({
			map: {
				app: appOutDir
			},
			packages: {
				app: {
					main: options.productionModule,
					defaultExtension: 'js'
				}
			}
		});

		return builder.bundle('app', bundlePath, {
			minify: true,

			// TODO fix the issue with spaces in paths
			fetch: (load, fetch) => {
				load.name = load.name.replace('%20', ' ');
				load.address = load.address.replace('%20', ' ');

				return fetch(load);
			}
		});
	}));

	gulp.task('app:watch', () => gulp.watch(appSrcGlob, { ignored: '**/.gulp-tsc-tmp*.ts' }, gulp.task('app')));
};
