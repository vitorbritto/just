#!/usr/bin/env node

'use strict';

// =====================================================
// Modules
// =====================================================

var task = require('./tasks'),
    sh   = require('shelljs'),
    cmd  = require('commander'),
    Just = require('orchestrator'),
    just = new Just();

    require('colors');


// =====================================================
// Tasks Configuration
// =====================================================

var set = {

    // Paths
    app_view: './app/',
    app_style: './app/styles/',
    app_script: './app/scripts/',
    public_view: './public/',
    public_style: './public/styles/',
    public_script: './public/scripts/',

    // Server
    server_host: 'localhost',
    server_port: '3001',
    server_base: './',
    server_sync: true,
    server_files: [
        './app/styles/*.styl',
        './app/scripts/*.js',
        './public/*.html'
    ]

};


// =====================================================
// Build Task
// =====================================================

function build() {

    sh.echo('→ Runnning'.cyan);
    sh.echo('');

    // Script task
    just.add('build', function() {
        task.lint('csslint', set.app_style);
        task.lint('jshint', set.app_script);
        task.compile('uglify', set.app_style, set.public_style);
        task.compile('stylus', set.app_script, set.public_script);
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
        task.refresh(set.server_base, set.server_files, set.server_sync, err);
    });

    // Watch task must be complete before this one begins
    just.add('build', ['watch'], function() {
        task.lint('csslint', set.app_style);
        task.lint('jshint', set.app_script);
        task.compile('uglify', set.app_style, set.public_style);
        task.compile('stylus', set.app_script, set.public_script);
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
