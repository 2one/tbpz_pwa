module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/index.html')
            .pipe(plugins.processhtml())
            .pipe(gulp.dest('dist'))
            .on('end', cb);
    };
};
