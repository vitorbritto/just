/**
 * @overview Build file
 * @author Vitor Britto
 */

'use strict';

// =============================================================================
// CONFIGURATION
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
    src_spec:    './app/spec/',
    dist_view:   './public/',
    dist_style:  './public/styles/',
    dist_script: './public/scripts/'
};


// =============================================================================
// TASKS
// =============================================================================

target.all = function() {

    target.executable();
    target.build();
    target.npm();
    target.info();

    // Lastly, avoiding to interrupt the process
    rm('-rf', ['make.js']);

    echo('✔ All done'.green);

};

target.npm = function() {

    if (!which('csslint')) {
        echo('→ Installing CSSLint...'.yellow);
        exec('npm i csslint -gq');
        echo('✔ Packages installed successfully.'.green);
    }

    if (!which('stylus')) {
        echo('→ Installing Stylus...'.yellow);
        exec('npm i stylus -gq');
        echo('✔ Packages installed successfully.'.green);
    }

    if (!which('jshint')) {
        echo('→ Installing JSHint...'.yellow);
        exec('npm i jshint -gq');
        echo('✔ Packages installed successfully.'.green);
    }

    if (!which('browserify')) {
        echo('→ Installing Browserify...'.yellow);
        exec('npm i browserify -gq');
        echo('✔ Packages installed successfully.'.green);
    }

    if (!which('uglifyjs')) {
        echo('→ Installing UglifyJS...'.yellow);
        exec('npm i uglify-js -gq');
        echo('✔ Packages installed successfully.'.green);
    }

    if (!which('mocha')) {
        echo('→ Installing Mocha...'.yellow);
        exec('npm i mocha -gq');
        echo('✔ Packages installed successfully.'.green);
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
    echo('→ Creating structure'.yellow);

    mkdir('-p', [config.src_style, config.src_script, config.src_spec, config.dist_style, config.dist_script]);

    // Copy template files
    echo('→ Copying files'.yellow);

    cp('-rf', './lib/template/style.styl', config.src_style);
    cp('-rf', './lib/template/app.js', config.src_script);
    cp('-rf', './lib/template/index.js', config.src_spec);
    cp('-rf', './lib/template/index.html', config.dist_view);
    cp('-rf', './lib/template/.*rc', './');

    // Remove stuff you don't want
    echo('→ Removing unecessary files'.yellow);
    rm('-rf', ['./.git', './lib/template']);

    // Install dependencies
    echo('→ Checking for dependencies'.yellow);
    exec('npm i chai --save-dev -q');

};

target.info = function() {

    echo('');
    echo('-----------------------------------------------------------');
    echo('→ Aplication source files at: '.cyan + config.src_view);
    echo('→ Public files at: '.cyan + config.dist_view);
    echo('-----------------------------------------------------------');
    echo('');

};
