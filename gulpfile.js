var gulp = require('gulp');
var md5 = require('gulp-md5-plus');
gulp.task('md5:js', function (done) {
    gulp.src('dist/js/main/*.js')
        .pipe(md5(10, 'dist/**/*.html'))
        .pipe(gulp.dest('dist/js/main'))
        .on('end', done);
});

gulp.task('default', function (done) {
    gulp.run('md5:js');
});