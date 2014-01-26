/**
 * @overview Build file
 * @author Vitor Britto
 */

'use strict';

// =============================================================================
// Requirements
// =============================================================================

require('shelljs/make');
require('colors');

var config = require('./lib/config');


// =============================================================================
// Tasks
// =============================================================================

target.all = function() {
    target.npm();
    target.executable();
    target.build();

    echo('');
    echo('✔ All done'.green);
};

target.npm = function() {

    if (!which('jshint')) {
        exec('npm i jshint -g');
    }

    if (!which('stylus')) {
        exec('npm i stylus -g');
    }

    if (!which('browser-sync')) {
        exec('npm i browser-sync -g');
    }

    if (!which('uglifyjs')) {
        exec('npm i uglify-js -g');
    }

    echo('✔ Dependencies installed successfully.'.cyan);

};

target.executable = function() {
    exec('chmod u+x just.js');
    echo('✔ Script is now executable'.cyan);
};

target.build = function() {

    // Create Structure
    if (!test('-d', config.app_style)) {
        mkdir('-p', config.app_style);
    }

    if (!test('-d', config.app_script)) {
        mkdir('-p', config.app_script);
    }

    if (!test('-d', config.public_style)) {
        mkdir('-p', config.public_style);
    }

    if (!test('-d', config.public_script)) {
        mkdir('-p', config.public_script);
    }

    // Copy files
    cp('-rf', './lib/template/style.styl', config.app_style);
    cp('-rf', './lib/template/main.js', config.app_script);
    cp('-rf', './lib/template/index.html', config.public_view);
    cp('-rf', './lib/config.js', './');

    // Removing stuff you don't want
    rm('-rf', ['./.git', './lib' , '.gitignore', 'README.md', '.travis.yml', 'LICENSE']);

    echo('✔ Application source files has been output to: '.cyan + config.app_view);
    echo('✔ Public files has been output to: '.cyan + config.public_view);

    // Lastly, avoiding to interrupt the process
    rm('-rf', ['Makefile.js']);

};
