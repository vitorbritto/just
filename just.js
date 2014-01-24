#!/usr/bin/env node

// =====================================================
// Initial Configuration
// =====================================================

// Modules
var sh     = require('shelljs'),
    os     = require('os').platform(),
    cmd    = require('commander'),
    config = require('./lib/config.js'),
    Just   = require('orchestrator'),
    just   = new Just();

require('colors');

// =====================================================
// CLI Commands
// =====================================================

// Create Structure
cmd
    .command('build')
    .description('Create a basic Structure')
    .action(scaffold);

// Install Dependencies
cmd
    .command('npm')
    .description('Install dependencies')
    .action(install);

// Tasks
cmd
    .command('run')
    .description('Run lint, minify and compile tasks')
    .action(build);

cmd
    .command('watch')
    .description('Run build tasks and watch for changes')
    .action(watch);


// Config
cmd.parse(process.argv);

if (process.argv.length === 2) {
    cmd.help();
}


// =====================================================
// Create a basic Structure
// =====================================================

function scaffold() {

    sh.echo('→ Building'.cyan);

    sh.mkdir('-p', [
        config.app_style,
        config.app_script,
        config.public_style,
        config.public_script
        ]
    );
    sh.cp('-rf', './lib/template/style.styl', config.app_style);
    sh.cp('-rf', './lib/template/main.js', config.app_script);
    sh.cp('-rf', './lib/template/style.css', config.public_style);
    sh.cp('-rf', './lib/template/index.html', config.public_view);

    sh.echo('✔ done'.green);

}


// =====================================================
// Install dependencies
// =====================================================

function install() {

    sh.echo('→ Installing'.cyan);

    var dependencies = config.dependencies;

    dependencies.forEach(function (deps) {
            if (!sh.which(deps)) {
                if (os === 'darwin') {
                    sh.exec('sudo npm install -g ' + deps);
                } else {
                    sh.exec('npm install -g ' + deps);
                }
            } else {
                sh.echo('→ ' + deps + ' already installed'.yellow);
            }
        });

    sh.echo('✔ done'.green);
}


// =====================================================
// Build Task
// =====================================================

function build() {

    sh.echo('→ Runnning'.cyan);
    sh.echo('');

    // Script task
    just.add('build', function() {
        config.jshint();
        config.minify();
        config.compile();
    });

    // Run tasks
    just.start(['build']);

    sh.echo('✔ done'.green);
}


// =====================================================
// Watch Task
// =====================================================

function watch() {

    // Watch task
    just.add('watch', function() {
        config.refresh();
    });

    // Watch task must be complete before this one begins
    just.add('build', ['watch'], function() {
        config.jshint();
        config.minify();
        config.compile();
    });

    // Run tasks
    just.start(['watch', 'build']);

    sh.echo('→ Watching for changes...'.cyan);
    sh.echo('');
    sh.echo('→ Press CTRL+C to exit'.yellow);
}
