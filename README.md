[![dependencies][deps-image]][deps-url] [![dev-dependencies][dev-deps-image]][dev-deps-url]

[![NPM][npm-image]][npm-url]

# Gulp Angular2 Project Registry

This registry supplies all necessary tasks to build, test and lint angular 6 web application.
Supports generating both development and production bundles to be created.


## How to start

```npm install gulp-angular2-project-registry```

Then create a `gulpfile.js` in project root and put the following contents there:

```js
const gulp = require('gulp');
const CustomRegistry = require('gulp-angular2-project-registry');

gulp.registry(new CustomRegistry());
```

Run `npx gulp provision` and registry task will create a default directory structure for the application.

Run `npx dev` for running a development environment. See task list below to see what else is available in the registry.

## Configuration

All configuration is relative to the project root unless otherwise mentioned.

##### `port`

Type: `number`

Default: `8080`

Port for `dev` and `bundle` tasks server.

##### `indexFile`

Type: `string`
 
Default: `'index.pug'`

SPA entry point file, processed by [pug](https://pugjs.org/api/getting-started.html).

##### `sourcesDir`
 
Type: `string`

Default: `'app'`

Directory that contains application sources, as well as `mainModule` and `productionModule` files.

##### `mainModule`
 
Type: `string`

Default: `'main'`

Bootstrap file for Angular SPA in development mode. Path is relative to `sourcesDir`.

##### `productionModule`
 
Type: `string`

Default: `'main-aot'`

Bootstrap file for Angular SPA in production mode. Path is relative to `sourcesDir`.

##### `testsDir`
 
Type: `string`

Default: `'tests'`

##### `cssDir`
 
Type: `string`

Default: `'styles'`

Path that contains styles processed by [stylus](http://stylus-lang.com) that will be included in `indexFile`.

##### `staticsDir`
 
Type: `string`

Default: `'statics'`

Path to the folder that contains all static resources that will be copied over to the `buildDir`.

##### `vendors`

Type: `string[]`

Default: `[]`

Array of javascript files optionally to be included into vendors bundle.
Useful if you have third-party libraries that you rely on in your project.

##### `map`

Type: `object`

Default: `{}`

Specify additional map for SystemJS configuration in case you want to load third-party modules.

##### `buildDir`
 
Type: `string`

Default: `'build'`

##### `tsconfigPath`
 
Type: `string`

Default: `'tsconfig.json'`

##### `appBundlePath`
 
Type: `string`

Default: `'bundle/app.min.js'`

Path is relative to `buildDir`.

##### `cssBundlePath`
 
Type: `string`

Default: `'bundle/bundle.min.css'`

Path is relative to `buildDir`.

##### `vendorBundlePath`
 
Type: `string`

Default: `'bundle/vendor.min.js'`

Path is relative to `buildDir`.

##### `addRootSlash`
 
Type: `string`

Default: `false`

Whether to add the root slash to all injected resources (css and js).
Useful if you run your application not from '/'.

## Tasks

| Task | Description |
| --- | --- |
| clean | Cleans build directory |
| app:clean | Cleans only application part from build directory. |
| styles:clean | Cleans only styles (angular component styles) part from build directory. |
| css:clean | Cleans only css (page styles) part from build directory. |
| pages:clean | Cleans created html file from build directory. |
| templates:clean | Cleans only angular templates part from build directory. |
| statics:clean | Cleans only static files from build directory. |
| test:clean | Cleans only test files from build directory. |
| connect | Starts web server in build directory. |
| app | Compiles app files. |
| styles | Compiles angular component styles files. |
| templates | Compiles angular templates files. |
| css | Compiles page styles. |
| pages | Compiles main page injecting all js and css. |
| app:bundle | Creates app bundle containing all dependencies, styles and templates. |
| css:bundle | Compiles all css into a single bundle. |
| pages:bundle | Compiles production page with inlining marked assets. |
| compile:bundle | Compiles everything to a production bundle. |
| vendor | Creates vendors bundle. |
| statics | Copies all statics to build directory. |
| compile | Compiles everything except tests. |
| test | Compiles and runs tests. |
| test:watch | Watches for test changes. |
| tslint:app | Lints application. |
| tslint:test | Lints tests. |
| tslint | Lints everything. |
| dev | Runs `clean`, `compile`, `connect` and `watch`. |
| bundle | Runs `clean`, `compile:bundle` and `connect`. |
| provision | Copies default structure to the current directory (without overwrite). |

[deps-image]: https://img.shields.io/david/mindfreakthemon/gulp-angular2-project-registry.svg?style=flat-square
[deps-url]: https://david-dm.org/mindfreakthemon/gulp-angular2-project-registry
[dev-deps-image]: https://img.shields.io/david/dev/mindfreakthemon/gulp-angular2-project-registry.svg?style=flat-square
[dev-deps-url]: https://david-dm.org/mindfreakthemon/gulp-angular2-project-registry?type=dev
[npm-image]: https://nodei.co/npm/gulp-angular2-project-registry.png?downloads=true
[npm-url]: https://npmjs.org/package/gulp-angular2-project-registry
