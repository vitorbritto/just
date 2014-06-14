'use strict';

var sh  = require('shelljs'),
    log = require('./logs');

var Task = function() {

    var _this = this;

    /**
     * Lint script files and report errors
     *
     * @method:     jshint
     * @param:      {String} path
     * @return:     {String}
     * @api:        public
     */

    this.jshint = function(path) {

        if (!sh.which('jshint')) {
            log.error('JSHint', 'jshint');
        }
        log.info('Validating Scripts');
        sh.exec('jshint ' + path);

        return _this;

    };

    /**
     * Lint style files and report errors
     *
     * @method:     csslint
     * @param:      {String} path
     * @return:     {String}
     * @api:        public
     */

    this.csslint = function(path) {

        if (!sh.which('csslint')) {
            log.error('CSSLint', 'csslint');
        }
        log.info('Validating Styles');
        sh.exec('csslint ' + path);

        return _this;

    };

    /**
     * Bundle files with Browserify
     *
     * @method:     browserify
     * @param:      {String} input
     * @param:      {String} output
     * @param:      {String} transforms (optional)
     * @return:     {String}
     * @api:        public
     */

    this.browserify = function(input, output, transforms) {

        if (!sh.which('browserify')) {
            log.error('Browserify', 'browserify');
        }
        log.info('Bundling Scripts');
        if (arguments.length === 3) {
            sh.exec('browserify ' + input + ' -t ' + transforms + ' -o ' + output);
        }
        sh.exec('browserify ' + input + ' -o ' + output);

        return _this;

    };

    /**
     * Minify and Concatenate scripts with UglifyJS
     *
     * @method:     uglifyjs
     * @param:      {String} input
     * @param:      {String} output
     * @return:     {String}
     * @api:        public
     */

    this.uglifyjs = function(input, output) {

        if (!sh.which('uglifyjs')) {
            log.error('UglifyJS', 'uglify-js');
        }
        log.info('Minifying Scripts');
        sh.exec('uglifyjs -o' + output + ' ' + input);

        return _this;

    };

    /**
     * Compile Style files with Stylus
     *
     * @method:     stylus
     * @param:      {String} input
     * @param:      {String} output
     * @return:     {String}
     * @api:        public
     */

    this.stylus = function(input, output) {

        if (!sh.which('stylus')) {
            log.error('Stylus', 'stylus');
        }
        log.info('Compiling Styles');
        sh.exec('stylus -c ' + input + ' -o ' + output);

        return _this;

    };

    /**
     * Run Unit tests with Mocha + Chai
     *
     * @method:     mocha
     * @param:      {String} reporter
     * @param:      {String} file
     * @return:     {String}
     * @api:        public
     */

    this.mocha = function(file, reporter, watch) {

        if (!sh.which('mocha')) {
            log.error('Mocha', 'mocha');
        }
        log.info('Running Unit tests');
        sh.exec('mocha ' + input + ' -R ' + reporter);
        if (arguments.length === 3) {
            sh.exec('mocha ' + input + ' -R ' + reporter + '--watch');
        }

        return _this;

    };

};

module.exports = new Task();

