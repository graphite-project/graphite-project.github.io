module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve'
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/styles.css': '_sass/styles.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 versions']})
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },

    watch: {
      sass: {
        files: ['_sass/**/*.scss'],
        tasks: ['sass','postcss']
      }
    },

    concurrent: {
      all: {
        tasks: ['shell:jekyllServe', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    scsslint: {
      allFiles: [
        '_sass/**/*.scss'
      ],
      options: {
        bundleExec: false,
        config: '.scss-lint.yml',
        colorizeOutput: true,
        exclude: [
          '_sass/utils/_functions.scss',
          '_sass/utils/_normalize.scss'
        ]
      }
    },
  });

  grunt.registerTask('build', [
    'sass',
    'postcss',
    'shell:jekyllBuild'
  ]);

  grunt.registerTask('serve', [
    'sass',
    'postcss',
    'concurrent' // jekyllServe and watch
  ]);

  grunt.registerTask('default', 'build');
};
