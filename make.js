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

var config = {
    src_view:    './app/',
    src_style:   './app/styles/',
    src_script:  './app/scripts/',
    dist_view:   './dist/',
    dist_style:  './dist/styles/',
    dist_script: './dist/scripts/',
};


// =============================================================================
// Tasks
// =============================================================================

target.all = function() {
    target.npm();
    target.executable();
    target.build();

    // Lastly, avoiding to interrupt the process
    rm('-rf', ['make.js']);

    echo('✔ All done'.green);
};

target.npm = function() {

    if (!which('csslint')) {
        echo('');
        echo('→ Installing CSSLint...'.yellow);
        exec('npm i csslint -gq');
        echo('✔ CSSLint installed successfully.'.green);
    }

    if (!which('jshint')) {
        echo('');
        echo('→ Installing JSHint...'.yellow);
        exec('npm i jshint -gq');
        echo('✔ JSHint installed successfully.'.green);
    }

    if (!which('stylus')) {
        echo('');
        echo('→ Installing Stylus...'.yellow);
        exec('npm i stylus -gq');
        echo('✔ Stylus installed successfully.'.green);
    }

    if (!which('uglifyjs')) {
        echo('');
        echo('→ Installing Uglify JS...'.yellow);
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
    echo('→ Creating strcuture'.yellow);

    mkdir('-p', [config.src_style, config.src_script, config.dist_style, config.dist_script]);

    // Copy files
    echo('→ Copying files'.yellow);

    cp('-rf', './lib/template/style.styl', config.src_style);
    cp('-rf', './lib/template/main.js', config.src_script);
    cp('-rf', './lib/template/index.html', config.dist_view);
    cp('-rf', './lib/template/.*rc', './');
    cp('-rf', './lib/tasks.js', './');

    // Removing stuff you don't want
    echo('→ Removing unecessary files'.yellow);
    rm('-rf', ['./.git', './lib' , '.gitignore', 'README.md', '.travis.yml', 'LICENSE']);

    echo('');
    echo('-----------------------------------------------------------');
    echo('→ Aplication source files at: '.cyan + config.src_view);
    echo('→ Public files at: '.cyan + config.dist_view);
    echo('-----------------------------------------------------------');
    echo('');

};
