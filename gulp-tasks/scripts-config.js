module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/js/config.js')
            .pipe(plugins.preprocess({
                context: {
                    NODE_ENV: options.env
                }
            }))
            .pipe(gulp.dest('dist/js'))
            .on('end', cb);
    };
};
