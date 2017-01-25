module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('dist/index.html')
            .pipe(plugins.inlineSource({
                compress: false
            }))
            .pipe(gulp.dest('dist'))
            .on('end', cb);

        gulp.src(['dist/css', 'dist/js'])
            .pipe(plugins.clean())
            .on('end', cb);
    };
};
