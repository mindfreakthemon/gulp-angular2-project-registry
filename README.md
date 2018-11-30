[![dependencies][deps-image]][deps-url] [![dev-dependencies][dev-deps-image]][dev-deps-url]

[![NPM][npm-image]][npm-url]

# Gulp Angular2 Project Registry

This registry supplies all necessary tasks to build, test and lint angular2 web application.
Supports generating both development and production bundles to be created.

## Configuration

##### `vendors`

Type: `string[]`

Default: `[]`

Array of javascript files optionally to be included into vendors bundle.
Useful if you have third-party libraries that you rely on in your project.
 
##### `port`

Type: `number`

Default: `8080`

##### `indexFile`

Type: `string`
 
Default: `'assets/index.pug'`

##### `sourcesDir`
 
Type: `string`

Default: `'app'`

##### `testsDir`
 
Type: `string`

Default: `'tests'`

##### `cssDir`
 
Type: `string`

Default: `'assets/styles'`

##### `staticsDir`
 
Type: `string`

Default: `'assets/statics'`

Path to the folder that contains all static resources that will be copied over to the `buildDir`.

##### `buildDir`
 
Type: `string`

Default: `'build'`

##### `tsconfigPath`
 
Type: `string`

Default: `'tsconfig.json'`

##### `appBundlePath`
 
Type: `string`

Default: `'bundle/app.min.js'`

##### `cssBundlePath`
 
Type: `string`

Default: `'bundle/bundle.min.css'`

##### `vendorBundlePath`
 
Type: `string`

Default: `'bundle/vendor.min.js'`

##### `mainModule`
 
Type: `string`

Default: `'main'`

##### `productionModule`
 
Type: `string`

Default: `'main-aot'`

##### `addRootSlash`
 
Type: `string`

Default: `false`

Whether to add the root slash to all injected resources (css and js).
Useful if you run your application not from '/'.

##### `map`

Type: `object`

Default: `{}`

Specify additional map for SystemJS configuration in case you want to load third-party modules.

## Use Cases

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
