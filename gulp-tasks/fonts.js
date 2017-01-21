module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('node_modules/font-awesome/fonts/**')
            .pipe(gulp.dest('dist/fonts'));
        gulp.src('src/fonts/**')
            .pipe(gulp.dest('dist/fonts'))
            .on('end', cb);
    };
};
