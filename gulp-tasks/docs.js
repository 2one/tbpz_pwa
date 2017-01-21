module.exports = function (gulp, plugins, options) {
    return function (cb) {
        gulp.src('src/scss/**/*.scss')
            .pipe(plugins.styledocco({
                out: 'docs',
                name: 'Documentation',
                'no-minify': true
            }));

        plugins.browserSync.init({
            server: "docs"
        });
    };
};
