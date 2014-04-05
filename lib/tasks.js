'use strict';

var sh = require('shelljs'); require('colors');

/**
 * Start a static server and watch for changes. Also, executes synchronised browser testing
 *
 * @method:     refresh
 * @options:    browser-sync
 * @param:      {String} base
 * @param:      {String} files
 * @param:      {String} sync
 * @return:     {String}
 * @api:        public
 */

exports.refresh = function(base, files, sync) {
    if (!sh.which('browser-sync')) {
        sh.echo('✖ This task requires "browser-sync" to be installed globally.'.red);
        sh.echo('Install: <sudo> npm install browser-sync -g'.red);
        exit(1);
    }
    sh.exec('browser-sync start --server "' + base + '" --files "' + files + '" --ghostMode ' + sync + '');
};



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



/**
 * Copy files from source folder to dist folder
 *
 * @method:     copy
 * @param:      {String} input
 * @param:      {String} output
 * @return:     {String}
 * @api:        public
 */

exports.copy = function(input, output) {
    sh.echo('→ Copying files'.green);
    sh.cp('-rf', input + ', ' + output);
};



/**
 * Remove files
 *
 * @method:     clean
 * @param:      {String} path
 * @return:     {String}
 * @api:        public
 */

exports.clean = function(path) {
    sh.echo('→ Removing files'.green);
    sh.rm('-rf', path);
};

