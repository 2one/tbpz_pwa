module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/**/*.html')
            .pipe(plugins.processhtml())
            .pipe(plugins.if(options.minify, plugins.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: false,
                minifyJS: false
            })))
            .pipe(gulp.dest('dist'))
            .on('end', cb);
    };
};
