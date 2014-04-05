'use strict';

var sh = require('shelljs'); require('colors');

/**
 * @method:     refresh task
 * @options:    browser-sync
 * @descrition:
 * @param:      {String} base
 * @param:      {String} files
 * @param:      {String} server
 * @param:      {String} err
 * @return:     {String}
 * @api:        public
 */

exports.refresh = function(base, files, sync, err) {
    if (!sh.which('browser-sync')) {
        sh.echo('✖ This task requires "browser-sync" to be installed globally.'.red);
        sh.echo('Install: <sudo> npm install browser-sync -g'.red);
        exit(1);
    }
    sh.exec('browser-sync start --server "' + base + '" --files "' + files + '" --ghostMode ' + sync + '');
};



/**
 * @method:     lint task
 * @options:    jshint, csslint
 * @descrition:
 * @param:      {String} type
 * @param:      {String} path
 * @param:      {String} err
 * @return:     {String}
 * @api:        public
 */

exports.lint = function(type, path, err) {
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
 * @method:     compile task
 * @options:    uglifyjs, stylus
 * @descrition:
 * @param:      {String} type
 * @param:      {String} input
 * @param:      {String} output
 * @param:      {String} err
 * @return:     {String}
 * @api:        public
 */

exports.compile = function(type, input, output, err) {
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
 * @method:     copy task
 * @options:    none
 * @descrition:
 * @param:      {String} input
 * @param:      {String} output
 * @param:      {String} err
 * @return:     {String}
 * @api:        public
 */

exports.copy = function(input, output, err) {
    sh.echo('→ Copying files'.green);
    sh.cp('-rf', input + ', ' + output);
};



/**
 * @method:     clean task
 * @options:    none
 * @descrition:
 * @param:      {String} input
 * @param:      {String} output
 * @param:      {String} err
 * @return:     {String}
 * @api:        public
 */

exports.clean = function(path, err) {
    sh.echo('→ Removing files'.green);
    sh.rm('-rf', path);
};

