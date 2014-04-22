'use strict';

var sh = require('shelljs');
require('colors');

var Task = function() {

    var _this = this;

    /**
     * Report message
     *
     * @method:     fail
     * @param:      {String} name
     * @param:      {String} module
     * @return:     {String}
     * @api:        private
     */

    function fail(name, module) {
        var str = [
            '✖ This task requires ' + name + ' to be installed globally.',
            'Install: <sudo> npm install ' + module + ' -g',
            '✖ Aborting...'
        ].join('\n');
        sh.echo(str.red);
        exit(1);
    }

    /**
     * Lint files and report errors
     *
     * @method:     lint
     * @options:    jshint, csslint
     * @param:      {String} type
     * @param:      {String} path
     * @return:     {String}
     * @api:        public
     */

    this.lint = function(type, path) {
        switch(type) {
        case 'jshint':
            if (!sh.which('jshint')) {
                fail('JSHint', 'jshint');
            }
            sh.echo('→ Validating Scripts'.green);
            sh.exec('jshint ' + path + 'main.js');
            break;

        case 'csslint':
            if (!sh.which('csslint')) {
                fail('CSSLint', 'csslint');
            }
            sh.echo('→ Validating CSS'.green);
            sh.exec('csslint ' + path + 'style.css');
            break;
        }

        return _this;

    };



    /**
     * Minify and concatenate files
     *
     * @method:     compile
     * @options:    uglifyjs, stylus
     * @param:      {String} type
     * @param:      {String} input
     * @param:      {String} output
     * @return:     {String}
     * @api:        public
     */

    this.compile = function(type, input, output) {
        switch(type) {

        case 'uglify':
            if (!sh.which('uglifyjs')) {
                fail('UglifyJS', 'uglify-js');
            }
            sh.echo('→ Minifying scripts'.green);
            sh.exec('uglifyjs -o' + output + 'main.min.js ' + input + 'main.js');
            break;

        case 'stylus':
            if (!sh.which('stylus')) {
                fail('Stylus', 'stylus');
            }
            sh.echo('→ Compiling CSS'.green);
            sh.exec('stylus -c ' + input + ' -o ' + output);
            break;
        }

        return _this;

    };

};

module.exports = Task;

