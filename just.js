#!/usr/bin/env node

// =====================================================
// Initial Configuration
// =====================================================

// Modules
var exec   = require('child_process').exec,
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

    console.log('→ Building'.cyan);

    exec('mkdir -p ' + [config.app_style, config.app_script, config.public_style, config.public_script].join(' '));
    exec('cp lib/template/style.styl ' + config.app_style);
    exec('cp lib/template/main.js ' + config.app_script);
    exec('cp lib/template/style.css ' + config.public_style);
    exec('cp lib/template/index.html ' + config.public_view);

    console.log('✔ done'.green);

}


// =====================================================
// Install dependencies
// =====================================================

function install() {

    console.log('→ Installing'.cyan);

    var globals = config.dependencies;
    globals.forEach(function (mods) {
        exec('npm -g ' + mods);
    });

    console.log('✔ done'.green);
}


// =====================================================
// Build Task
// =====================================================

function build() {

    console.log('→ Runnning'.cyan);
    console.log('');

    // Script task
    just.add('build', function() {
        config.jshint();
        config.minify();
        config.compile();
    });

    // Run tasks
    just.start(['build']);

    console.log('✔ done'.green);
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

    console.log('→ Watching for changes...'.cyan);
    console.log('');
    console.log('→ Press CTRL+C to exit'.yellow);
}
