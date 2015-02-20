var async = require('async');
var path = require('path');

module.exports = function (grunt) {
  'use strict';

  grunt.config('updatemain', {
    build: {
      src: '<%= xh.src %>/scss/**/*.scss',
      dest: '<%= xh.src %>/scss/main.scss'
    }
  });

  grunt.registerMultiTask('updatemain', 'Updates main.scss/less after new component file is added', function () {
    var self = this;
    var done = this.async();

    async.eachLimit(this.files, 4, function (file, next) {
      var src = file.src;

      if (!src) {
        return next();
      }

      for (var i = 0; i < src.length; i++) {
        addFileToMain.bind(self)(src[i]);
      }

      next();
    }, done);
  });

  function addFileToMain (file) {
    var root = path.join(grunt.config('xh').src, 'scss') + path.sep;
    var importFile = file.replace(root, '').replace(path.sep + '_', path.sep).replace(/\.(scss|less)$/, '');
    var section = (importFile.split(path.sep) || ['default'])[0];
    var sectionComment = '// @@' + section + '@@';

  }
};
