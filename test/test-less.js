/*global describe, before, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('XH Generator Less', function () {
  before(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp', 'less'), function (err) {
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
      'grunt/contrib-connect.js',
      'grunt/contrib-copy.js',
      'grunt/contrib-jshint.js',
      'grunt/contrib-less.js',
      'grunt/contrib-uglify.js',
      'grunt/contrib-watch.js',
      'grunt/cssbeautifier.js',
      'grunt/html-validation.js',
      'grunt/include-replace.js',
      'grunt/jsbeautifier.js',
      'grunt/remfallback.js',
      'grunt/search.js',
      'grunt/spritesmith.js',
      'grunt/text-replace.js',
      'grunt/usemin.js',
      'grunt/build-helpers.js',
      'index.html',
      'src/fonts/.keep',
      'src/img/.keep',
      'src/img/sprites/1x/.keep',
      'src/img/sprites/2x/.keep',
      'src/media/.keep',
      'src/designs/.keep',
      'src/template.html',
      'src/includes/head.html',
      'src/includes/header.html',
      'src/includes/sidebar.html',
      'src/includes/scripts.html',
      'src/includes/footer.html',
      'src/less/main.less',
      'src/less/setup/variables.less',
      'src/less/setup/mixins.less',
      'src/less/common.less',
      'src/less/setup/sprites.less',
      'src/js/main.js'
    ];

    helpers.mockPrompt(this.app, {
      projectName: 'Test Project',
      useBranding: false,
      reloader: 'LiveReload',
      server: true,
      cssPreprocessor: 'LESS',
      ignoreDist: true,
      isWP: false,
      features: [ 'useSprites' ]
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

