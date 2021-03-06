/*global describe, before, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('XH Generator SCSS', function () {
  before(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp', 'scss'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('xh:app', [
        '../../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.yo-rc.json',
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.jshintrc',
      '.gitignore',
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'grunt/autoprefixer.js',
      'grunt/contrib-clean.js',
      'grunt/contrib-concat.js',
      'grunt/contrib-copy.js',
      'grunt/contrib-jshint.js',
      'grunt/contrib-sass.js',
      'grunt/contrib-uglify.js',
      'grunt/contrib-watch.js',
      'grunt/cssbeautifier.js',
      'grunt/html-validation.js',
      'grunt/include-replace.js',
      'grunt/jsbeautifier.js',
      'grunt/remfallback.js',
      'grunt/search.js',
      'grunt/text-replace.js',
      'grunt/usemin.js',
      'grunt/build-helpers.js',
      'index.html',
      'src/fonts/.keep',
      'src/img/.keep',
      'src/media/.keep',
      'src/designs/.keep',
      'src/template.html',
      'src/includes/head.html',
      'src/includes/header.html',
      'src/includes/sidebar.html',
      'src/includes/scripts.html',
      'src/includes/footer.html',
      'src/scss/main.scss',
      'src/scss/setup/_variables.scss',
      'src/scss/setup/_mixins.scss',
      'src/scss/_common.scss',
      'src/js/main.js',
      'Gemfile'
    ];

    helpers.mockPrompt(this.app, {
      projectName: 'Test Project',
      useBranding: true,
      reloader: 'None',
      server: false,
      cssPreprocessor: 'SCSS',
      isWP: false,
      features: []
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

