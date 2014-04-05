'use strict';

var sh = require('shelljs'); require('colors');


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

exports.lint = function(type, path) {
    switch(type) {
    case 'jshint':
        if (!sh.which('jshint')) {
            sh.echo('✖ This task requires "jshint" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install jshint -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Validating scripts'.green);
        sh.exec('jshint ' + path + 'main.js');
        break;

    case 'csslint':
        if (!sh.which('csslint')) {
            sh.echo('✖ This task requires "csslint" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install csslint -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Validating scripts'.green);
        sh.exec('csslint ' + path + 'style.css');
        break;
    }
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

exports.compile = function(type, input, output) {
    switch(type) {

    case 'uglify':
        if (!sh.which('uglifyjs')) {
            sh.echo('✖ This task requires "uglify-js" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install uglify-js -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Minifying scripts'.green);
        sh.exec('uglifyjs -o' + output + 'main.min.js ' + input + 'main.js');
        break;

    case 'stylus':
        if (!sh.which('stylus')) {
            sh.echo('✖ This task requires "stylus" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install stylus -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Compiling CSS'.green);
        sh.exec('stylus -c ' + input + ' -o ' + output);
        break;
    }
};
