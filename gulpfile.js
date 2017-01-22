var fs = require('fs');
var gulp = require('gulp');
var options = require('yargs').argv;
options.package = JSON.parse(fs.readFileSync('./package.json'));
var plugins = require('gulp-load-plugins')({
    scope: ['devDependencies'],
    pattern: '*'
});

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, options);
}

gulp.task('clean', getTask('clean'));
gulp.task('html', getTask('html'));
gulp.task('other', getTask('other'));
gulp.task('scripts', getTask('scripts'));
gulp.task('styles', getTask('styles'));
gulp.task('images', getTask('images'));
gulp.task('fonts', getTask('fonts'));
gulp.task('watch', getTask('watch'));
gulp.task('docs', getTask('docs'));

gulp.task('inline', getTask('inline'));
gulp.task('inlineScripts', ['scripts'], function() {
    gulp.start('inline');
});
gulp.task('inlineStyles', ['styles'], function() {
    gulp.start('inline');
});

gulp.task('build', ['html', 'other', 'inlineScripts', 'inlineStyles', 'images', 'fonts']);
gulp.task('serve', ['build'], function() {
    gulp.start('watch');
});
gulp.task('default', ['serve']);
