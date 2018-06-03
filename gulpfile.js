const gulp = require('gulp');
const CustomRegistry = require('./index');

gulp.registry(new CustomRegistry());
