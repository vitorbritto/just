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
    app_style:     './app/styles/',
    app_script:    './app/scripts/',
    public_view:   './public/',
    public_style:  './public/styles/',
    public_script: './public/scripts/',
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
        echo('→ Installing CSSLint...' .yellow);
        exec('npm i csslint -gq');
        echo('✔ CSSLint installed successfully.'.green);
    }

    if (!which('jshint')) {
        echo('');
        echo('→ Installing JSHint...' .yellow);
        exec('npm i jshint -gq');
        echo('✔ JSHint installed successfully.'.green);
    }

    if (!which('stylus')) {
        echo('');
        echo('→ Installing Stylus...' .yellow);
        exec('npm i stylus -gq');
        echo('✔ Stylus installed successfully.'.green);
    }

    if (!which('browser-sync')) {
        echo('');
        echo('→ Installing Browser Sync...' .yellow);
        exec('npm i browser-sync -gq');
        echo('✔ Browser Sync installed successfully.'.green);
    }

    if (!which('uglifyjs')) {
        echo('');
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
    echo('→ Creating strcuture' .yellow);

    mkdir('-p', config.app_style);
    mkdir('-p', config.app_script);
    mkdir('-p', config.public_style);
    mkdir('-p', config.public_script);

    // Copy files
    echo('→ Copying files' .yellow);

    cp('-rf', './lib/template/style.styl', config.app_style);
    cp('-rf', './lib/template/main.js', config.app_script);
    cp('-rf', './lib/template/index.html', config.public_view);
    cp('-rf', './lib/template/.*rc', './');
    cp('-rf', './lib/tasks.js', './');
    cp('-rf', './lib/config.js', './');

    // Removing stuff you don't want
    echo('→ Removing unecessary files' .yellow);
    rm('-rf', ['./.git', './lib' , '.gitignore', 'README.md', '.travis.yml', 'LICENSE']);

    echo('');
    echo('----------------------------------------------------------------------');
    echo('→ Application source files has been output to: '.cyan + config.app_view);
    echo('→ Public files has been output to: '.cyan + config.public_view);
    echo('----------------------------------------------------------------------');
    echo('');

};
