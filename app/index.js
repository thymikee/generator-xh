'use strict';

var yeoman = require('yeoman-generator');
var utils = require('./utils/index');

var XhGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install']
      });
    });
  },

  askForUpdate: function () {
    var update = require('./update');
    update.apply(this);
  },

  checkForConfig: function () {
    var checkConfig = require('./configcheck');

    checkConfig.fileContent.bind(this)()
      .then(checkConfig.result.bind(this),
            checkConfig.error.bind(this));
  },

  askFor: function () {
    if (this.options.interactive === false || this.configFound) {
      return;
    }

    var done = this.async();

    // Welcome user
    utils.welcome();

    this.prompt(utils.prompts.generator, function (props) {
      utils.setProps.apply(this, [props]);
      done();
    }.bind(this));
  },

  // Create project structure
  generate: function () {
    // Create config file
    utils.generate.config.bind(this)();

    // Configurations files
    utils.generate.dotfiles.bind(this)();

    // Application files
    utils.generate.appfiles.bind(this)();

    // Project index
    utils.generate.projectIndex.bind(this)();

    // Directory structure
    utils.generate.structure.bind(this)();

    // Template files (html only for now)
    utils.generate.templateFiles.bind(this)('html');

    // SCSS
    if (this.cssPreprocessor === 'SCSS' || this.cssPreprocessor === 'LIBSASS') {
      utils.generate.preprocessor.bind(this)('scss', '_');
    }

    if (this.cssPreprocessor === 'SCSS') {
      this.copy('Gemfile', 'Gemfile');
    }

    // LESS
    if (this.cssPreprocessor === 'LESS') {
      utils.generate.preprocessor.bind(this)('less', '');
    }

    // JS
    utils.generate.js.bind(this)();

    // CSS3Pie
    if (this.useCSS3Pie) {
      this.copy('src/js/_PIE.htc', 'src/js/PIE.htc');
    }
    console.log(new Date().getTime() + ' generate');
  }
});

module.exports = XhGenerator;
