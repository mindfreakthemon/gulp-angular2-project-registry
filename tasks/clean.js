let del = require('del');

module.exports = (gulp) => {
	gulp.task('clean', () => del(['build']));
};
