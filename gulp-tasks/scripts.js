module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/js/script.js')
            .pipe(plugins.browserify({
                insertGlobals : true,
                transform: plugins.babelify
            }))
            .pipe(plugins.sourcemaps.init({ loadMaps: true }))
                .pipe(plugins.if(options.minify, plugins.uglify({ mangle: false })))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest('dist/js'))
            .on('end', cb);
        //gulp.start('inline');
    };
};
