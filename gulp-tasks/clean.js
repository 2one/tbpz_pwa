module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('dist')
            .pipe(plugins.clean())
            .on('end', cb);
    };
};
