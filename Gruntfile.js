var browserSync = require("browser-sync");

module.exports = function(grunt) {

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var settings = grunt.file.readJSON('settings.json');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        settings: grunt.file.readJSON('settings.json'),
        banner: [
            '/*!',
            '<%= pkg.name %>',
            '@version <%= pkg.version %>',
            '@date <%= grunt.template.today("yyyy-mm-dd, HH:MM") %>',
            '*/'
        ].join("\n"),

        sass: {
            options: {
                sourceMap: true
            },
            main: {
                files: {
                    '<%= settings.css.main.dist %>': '<%= settings.css.main.src %>',
                    '<%= settings.css.fixture.dist %>': '<%= settings.css.fixture.src %>',
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            all: {
                expand: true,
                flatten: true,
                src: 'dist/template/public/css/*.css',
                dest: 'dist/template/public/css'
            }
        },

        cssmin: {
            css: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/'
                }]
            }
        },

        jshint: {
            files: [
                'Gruntfile.js',
                '<%= settings.js.modules.src %>',
                '<%= settings.js.main.src %>'
            ]
        },

        uglify: {
            js: {
                options: {
                    banner: "<%= banner %>\n"
                },
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js'
                }]
            }
        },

        copy: {
            webroot: {
                expand: true,
                cwd: 'src/html',
                src: '**',
                dest: 'dist/template',
                dot: true
            },
            vendor: {
                src: 'bower_components/prism/prism.js',
                dest: 'dist/template/public/js/prism.js'
            }
        },

        clean: {
            dist: 'dist',
            build: [
                'dist/tmp',
                'dist/css/*.map',
                'dist/css/*.css',
                '!dist/css/*.min.css',
                '!dist/css/*.fonts.css',
                'dist/js/*.js',
                '!dist/js/*.min.js',
                '!dist/**/*.custom.*'
            ]
        },

        browserify: {
            dist: {
                files: {
                    '<%= settings.js.all.dist %>': ['<%= settings.js.modules.src %>', '<%= settings.js.main.src %>'],
                },
                options: {}
            }
        },

        shell: {
            kss: {
                command: './node_modules/kss/bin/kss-node --config kss-config.json'
            }
        },

        watch: {

            options: {
                spawn: false // Very important, don't miss this
            },

            js: {
                files: '<%= jshint.files %>',
                tasks: ['jshint', 'browserify', 'bs-inject-js']
            },

            scss: {
                files: '<%= settings.css.scss.src %>',
                tasks: ['sass', 'autoprefixer', 'shell', 'bs-inject-css']
            },

            html: {
                files: 'src/html/**',
                tasks: ['copy', 'shell', 'bs-inject-html']
            }
        }

    });

    grunt.registerTask('bs-init', function () {
        var done = this.async();
        browserSync({
            port: 8000,
            server: './dist'
        }, function (err, bs) {
            done();
        });
    });

    grunt.registerTask('bs-inject-css', function () {
        browserSync.reload(settings.css.main.dist);
    });

    grunt.registerTask('bs-inject-js', function () {
        console.log(settings.js.all.dist);
        browserSync.reload(settings.js.all.dist);
    });

    grunt.registerTask('bs-inject-html', function () {
        browserSync.reload();
    });

    grunt.registerTask('build', ['clean', 'jshint', 'browserify', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'copy', 'clean:build', 'shell']);
    grunt.registerTask('compile', ['browserify', 'sass', 'autoprefixer', 'copy', 'shell']);
    grunt.registerTask('default', ['compile' ,'bs-init', 'watch']);
};
