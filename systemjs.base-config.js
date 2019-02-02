System.config({
	map: {
		'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
		'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
		'@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
		'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
		'@angular/platform-browser': 'npm:@angular/platform-browser',
		'@angular/animations': 'npm:@angular/animations',
		'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
		'@angular/router': 'npm:@angular/router/bundles/router.umd.js',
		'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

		'rxjs': 'npm:rxjs',
		'rxjs-compat': 'npm:rxjs-compat',
		'zone.js': 'npm:zone.js/dist/zone.min.js',
		'reflect-metadata': 'npm:reflect-metadata/Reflect.js'
	},
	paths: {
		'npm:': 'node_modules/'
	},
	packages: {
		'@angular/platform-browser': {
			main: 'bundles/platform-browser.umd.js',
			map: {
				'./animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js'
			},
			defaultExtension: 'js'
		},
		'@angular/animations': {
			main: 'bundles/animations.umd.js',
			map: {
				'./browser': 'npm:@angular/animations/bundles/animations-browser.umd.js'
			},
			defaultExtension: 'js'
		},
		'rxjs': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'rxjs-compat': {
			defaultExtension: 'js'
		},
		'rxjs/operators': {
			main: 'index.js',
			defaultExtension: 'js'
		}
	}
});

