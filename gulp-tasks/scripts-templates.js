module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/templates/**/*.html')
            .pipe(plugins.angularTemplatecache('templates.js', {
                moduleSystem: 'Browserify',
                module: 'app',
                transformUrl: function(url) {
                    return './templates/' + url
                }
            }))
            .pipe(gulp.dest('dist/js'))
            .on('end', cb);
    };
};
