module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src(['src/.htaccess', 'src/manifest.json'])
            .pipe(gulp.dest('dist'));
        gulp.src(['src/sw.js'])
            .pipe(plugins.processhtml({
                data: {
                    date: new Date().toISOString(),
                    version: options.package.version
                }
            }))
            .pipe(gulp.dest('dist'))
            .on('end', cb);
    };
};
