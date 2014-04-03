var sh  = require('shelljs'),
    cfg = require('./config');

var tasks = {

    // List of Tasks
    refresh: function() {
        if (!sh.which('browser-sync')) {
            sh.echo('✖ This task requires "browser-sync" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install browser-sync -g'.red);
            exit(1);
        }
        sh.exec('browser-sync --server "' + cfg.server_base + '" --files "' + cfg.server_files + '" --ghostMode ' + cfg.server_sync + '');
    },
    jshint: function() {
        if (!sh.which('jshint')) {
            sh.echo('✖ This task requires "jshint" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install jshint -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Validating scripts'.green);
        sh.exec('jshint ' + cfg.app_script + 'main.js');
    },
    csslint: function() {
        if (!sh.which('csslint')) {
            sh.echo('✖ This task requires "csslint" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install csslint -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Validating scripts'.green);
        sh.exec('csslint ' + cfg.app_style + 'style.styl');
    },
    minify: function() {
        if (!sh.which('uglifyjs')) {
            sh.echo('✖ This task requires "uglify-js" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install uglify-js -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Minifying scripts'.green);
        sh.exec('cat '+ cfg.app_script +' main.js | uglifyjs -o '+ cfg.public_script +'main.min.js');
    },
    compile: function() {
        if (!sh.which('stylus')) {
            sh.echo('✖ This task requires "stylus" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install stylus -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Compiling CSS'.green);
        sh.exec('stylus -c <' + cfg.app_style + 'style.styl> ' + cfg.public_style + 'style.css');
    },
    copy: function(input, output, err) {
        sh.echo('→ Copying files'.green);
        sh.cp('-rf', input + ', ' + output);
        if (err) {
            throw err;
        }
    },
    clean: function(path, err) {
        sh.echo('→ Removing files'.green);
        sh.rm('-rf', path);
        if (err) {
            throw err;
        }
    }
};

exports.tasks = tasks;
