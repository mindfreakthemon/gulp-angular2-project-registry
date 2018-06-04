# Gulp Angular2 Project Registry

This registry supplies all necessary tasks to build, test and lint angular2 web application.
Supports generating both development and production bundles to be created.

## Configuration

##### `vendors`

Type: `string[]`

Default: `[]`
 
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

Default: `'main-aot`

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
