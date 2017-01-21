module.exports = function (gulp, plugins, options) {
    return function (cb) {
        plugins.browserSync.init({
            files: [
                "dist/**/*.html",
                "dist/js/*.js",
                "dist/css/*.css",
                "dist/img/**",
                "dist/fonts/**"
            ],
            server: "dist"
        });

        gulp.watch("src/**/*.html", ['html']);
        gulp.watch("src/**/*.js", ['inlineScripts']);
        gulp.watch("src/**/*.scss", ['inlineStyles']);
        gulp.watch("src/img/**", ['images']);
        gulp.watch("src/fonts/**", ['fonts']);

        cb();
    };
};
