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
            server: "dist",
            https: {
                key: "openssl/server.key",
                cert: "openssl/server.crt"
            }
        });

        gulp.watch("src/index.html", ['html']);
        gulp.watch("src/templates/**/*.html", ['preScripts']);
        gulp.watch("src/js/**/*.js", ['preScripts']);
        gulp.watch("src/scss/**/*.scss", ['styles']);
        gulp.watch("src/img/**", ['images']);
        gulp.watch("src/fonts/**", ['fonts']);

        cb();
    };
};
