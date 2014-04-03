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

var system  = require('os').platform,
    isLinux = (system === 'linux'),
    isMac   = (system === 'darwin');

var config  = {
    app_view:      './app/',
    app_style:     './app/css/',
    app_script:    './app/js/',
    public_view:   './public/',
    public_style:  './public/css/',
    public_script: './public/js/',
};


// =============================================================================
// Tasks
// =============================================================================

target.all = function() {
    target.npm();
    target.executable();
    target.build();

    echo('\n');
    echo('✔ All done'.green);
};

target.npm = function() {

    if (!which('csslint')) {
        echo('\n');
        echo('→ Installing CSSLint...' .yellow);
        exec('npm i csslint -gq');
        echo('✔ CSSLint installed successfully.'.green);
    }

    if (!which('jshint')) {
        echo('\n');
        echo('→ Installing JSHint...' .yellow);
        exec('npm i jshint -gq');
        echo('✔ JSHint installed successfully.'.green);
    }

    if (!which('stylus')) {
        echo('\n');
        echo('→ Installing Stylus...' .yellow);
        exec('npm i stylus -gq');
        echo('✔ Stylus installed successfully.'.green);
    }

    if (!which('browser-sync')) {
        echo('\n');
        echo('→ Installing Browser Sync...' .yellow);
        exec('npm i browser-sync -gq');
        echo('✔ Browser Sync installed successfully.'.green);
    }

    if (!which('uglifyjs')) {
        echo('\n');
        echo('→ Installing Uglify JS...' .yellow);
        exec('npm i uglify-js -gq');
        echo('✔ Uglify JS installed successfully.'.green);
    }

};

target.executable = function() {

    if (isMac || isLinux) {
        exec('chmod u+x ./just.js');
        echo('✔ Script is now executable'.cyan);
    }

};

target.build = function() {

    // Create Structure
    mkdir('-p', config.app_style);
    mkdir('-p', config.app_script);
    mkdir('-p', config.public_style);
    mkdir('-p', config.public_script);

    // Copy files
    cp('-rf', './lib/template/style.styl', config.app_style);
    cp('-rf', './lib/template/main.js', config.app_script);
    cp('-rf', './lib/template/index.html', config.public_view);
    cp('-rf', './lib/template/.*rc', './');
    cp('-rf', './lib/tasks.js', './');
    cp('-rf', './lib/config.js', './');

    // Removing stuff you don't want
    rm('-rf', ['./.git', './lib' , '.gitignore', 'README.md', '.travis.yml', 'LICENSE']);

    echo('\n');
    echo('----------------------------------------------------------------------');
    echo('→ Application source files has been output to: '.cyan + config.app_view);
    echo('→ Public files has been output to: '.cyan + config.public_view);
    echo('----------------------------------------------------------------------');
    echo('\n');

    // Lastly, avoiding to interrupt the process
    rm('-rf', ['make.js']);

};
