
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var env = grunt.option('env') || "dev";

    var timestamp = Date.now();
    var assetsPath = (env == 'dev') ? './' : '/tbpz_pwa/';

    console.log(" ");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            before: ['dist/*'],
            after: ['dist/css/**', 'dist/js/**']
        },

        copy: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**', '**/*', '!js/**', '!app/**', '!css/**'],
                    dest: 'dist',
                    filter: 'isFile'
                },
                {
                    expand: true,
                    cwd: 'src',
                    src: ['.htaccess'],
                    dest: 'dist'
                }]
            },
            bowerCSS: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: [
                        'font-awesome/css/**.min.css'
                    ],
                    dest: 'dist/css',
                    flatten: true,
                    filter: 'isFile'
                }]
            },
            bowerFonts: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: [
                        'font-awesome/fonts/**'
                    ],
                    dest: 'dist/fonts',
                    flatten: true,
                    filter: 'isFile'
                }]
            }
        },

        sass: {
            options: {
                sourcemap: "inline"
            },
            default: {
                files: [{
                    expand: true,
                    cwd: 'src/css/scss',
                    src: ['*.scss', '**/*.scss'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                diff: true,
                map: true
            },
            default: {
                src: 'dist/css/style.min.css'
            }
        },

        concat: {
            options: {
                separator: ';\n'
            },
            js: {
                files: [{
                    src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery-migrate/jquery-migrate.min.js','bower_components/angular/angular.min.js', 'bower_components/angular-i18n/angular-locale_fr-fr.js','bower_components/angular-*/*.min.js'],
                    dest: 'dist/js/vendors.min.js'
                },
                {
                    src: ['src/js/*.js'],
                    dest: 'dist/js/scripts.js'
                },
                {
                    src: ['src/app/config.js','src/app/app.js','src/app/services/*.js','src/app/directives/*.js','src/app/filters/*.js','src/app/controllers/*.js'],
                    dest: 'dist/js/app.js'
                }]
            }
        },

        processhtml: {
            default: {
                options: {
                    data: {
                        assetsPath: assetsPath,
                        timestamp: timestamp,
                        env: env
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['index.html'],
                    dest: 'dist'
                }]
            }
        },

        'string-replace': {
            default: {
                files: {
                    'dist/index.html': 'dist/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /..\/fonts\//ig,
                        replacement: '.\/fonts\/'
                    }]
                }
            }
        },

        ngtemplates:  {
            app: {
                files: [{
                    cwd: 'src',
                    src: './app/views/**/*.html',
                    dest: 'dist/js/app.templates.js'
                }]
            }
        },

        watch: {
            options: {
                livereload: false,
            },
            css: {
                files: ['src/**/*.scss'],
                tasks: ['css', 'processhtml']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['js', 'processhtml']
            },
            json: {
                files: ['src/**/*.json'],
                tasks: ['html']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['html']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/**/*.css',
                        'dist/**/*.js',
                        'dist/**/*.json',
                        'dist/**/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist',
                    https: true,
                }
            }
        },

        'ftp-deploy': {
            default: {
                auth: {
                    host: '172.22.49.162',
                    port: 21,
                    authKey: env
                },
                src: 'dist/',
                dest: '/special/timeline/'
            }
        },

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },

        htmlhint: {
            default: {
                options: {
                    force: false,
                    htmlhintrc: '.htmlhintrc'
                },
                src: ['src/**/*.html']
            }
        },

        csslint: {
            default: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: ['src/css/**/*.scss']
            }
        },

        jshint: {
            default: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['dist/js/*.js', '!dist/js/vendors.min.js']
            }
        },

        lintspaces: {
            default: {
                options: {
                    newline: false,
                    newlineMaximum: 2,
                    trailingspaces: true,
                    indentation: 'spaces',
                    spaces: 4
                },
                src: ['src/**/*.html', 'src/css/**/*.scss', '!src/css/scss/base/_normalize.scss', 'src/app/**/*.js', 'src/js/**/*.js']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    minifyJS: {
                        mangle: false,
                        beautify:false
                    },
                    minifyCSS: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        }

    });

    grunt.registerTask('html', ['copy', 'ngtemplates', 'processhtml', 'string-replace']);
    grunt.registerTask('css', ['sass', 'autoprefixer']);
    grunt.registerTask('js', ['concat']);

    grunt.registerTask('serve', ['browserSync', 'watch']);
    grunt.registerTask('compile', ['clean:before', 'css', 'js', 'html']);
    grunt.registerTask('test', ['htmlhint', /*'csslint',*/ /*'jshint',*/ /*'lintspaces'*/]);
    grunt.registerTask('publish', ['compile', 'test', 'clean:after', 'htmlmin']);
    grunt.registerTask('deploy', ['publish', 'ftp-deploy']);
    grunt.registerTask('gh-deploy', ['publish', 'gh-pages']);
    grunt.registerTask('default', ['compile', 'serve']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

};
