module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/favicon.ico')
            .pipe(gulp.dest('dist'));
        gulp.src('src/img/**')
            .pipe(gulp.dest('dist/img'))
            .on('end', cb);
    };
};
