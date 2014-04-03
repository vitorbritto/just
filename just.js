#!/usr/bin/env node

// =====================================================
// Initial Configuration
// =====================================================

// Modules
var task = require('./tasks'),
    sh   = require('shelljs'),
    cmd  = require('commander'),
    Just = require('orchestrator'),
    just = new Just();

require('colors');


// =====================================================
// Build Task
// =====================================================

function build() {

    sh.echo('→ Runnning'.cyan);
    sh.echo('');

    // Script task
    just.add('build', function() {
        task.csslint();
        task.jshint();
        task.minify();
        task.compile();
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
        task.refresh();
    });

    // Watch task must be complete before this one begins
    just.add('build', ['watch'], function() {
        task.csslint();
        task.jshint();
        task.minify();
        task.compile();
    });

    // Run tasks
    just.start(['watch', 'build']);

    sh.echo('→ Watching for changes...'.cyan);
    sh.echo('→ Press CTRL+C to exit'.yellow);
}


// =====================================================
// CLI Commands
// =====================================================

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
