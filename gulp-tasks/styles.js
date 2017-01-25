module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/scss/style.scss')
            .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass())
                .pipe(plugins.autoprefixer())
                .pipe(plugins.if(options.minify, plugins.cssnano({
                    discardComments: {
                        removeAll: true
                    }
                })))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css'))
            .on('end', cb);
    };
};
