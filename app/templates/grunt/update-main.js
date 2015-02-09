var async = require('async');

module.exports = function (grunt) {
'use strict';

  grunt.config('updatemain', {
    build: {
        src: '<%= xh.src %>/scss/**/*.scss'
      }
  });

  grunt.registerMultiTask('updatemain', 'Updates main.scss after new scss file is added', function () {
    var done = this.async();

    async.eachLimit(this.files, 4, function (file, next) {
      var src = file.src;

      if (!src) {
        return next();
      }

      for (var i = 0; i < src.length; i++) {
        addFileToMain(src[i]);
      }

      next();

    }, done);
  });

  function addFileToMain (file) {
    console.log(file);
  }
};