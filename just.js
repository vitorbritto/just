#!/usr/bin/env node

'use strict';

// =====================================================
// Modules
// =====================================================

var task = require('./tasks'),
    sh    = require('shelljs'),
    cmd   = require('commander'),
    Just  = require('orchestrator'),
    just  = new Just();

require('colors');


// =====================================================
// Tasks Configuration
// =====================================================

// Setup for Server
var server = {
    host: 'localhost',
    port: '3001',
    base: './public',
    sync: true,
    files: [
        './app/styles/*.styl',
        './app/scripts/*.js',
        './app/*.html'
    ]
};

// Setup for Paths
var path = {
    view_in:    './app/',
    style_in:   './app/styles/',
    script_in:  './app/scripts/',
    view_out:   './public/',
    style_out:  './public/styles/',
    script_out: './public/scripts/',
};


// =====================================================
// Build Task
// =====================================================

function build() {

    sh.echo('→ Runnning'.cyan);
    sh.echo('');

    // Build task
    just.add('build',
        task.lint('csslint', path.style_out),
        task.lint('jshint', path.script_in),
        task.compile('uglify', path.script_in, path.script_out),
        task.compile('stylus', path.style_in, path.style_out)
    );

    // Run tasks
    just.start(['build'], function(){
        sh.echo('✔ done'.green);
    });


}


// =====================================================
// Watch Task
// =====================================================

function watch() {

    // Start Message
    sh.echo('→ Watching for changes...'.cyan);
    sh.echo('→ Press CTRL+C to exit'.yellow);

    // Watch task
    just.add('watch',
        task.refresh(server.base, server.files, server.sync)
    );

    // Build task must be complete before this one begins
    just.add('watch', ['build'],
        task.lint('csslint', path.style_out),
        task.lint('jshint', path.script_in),
        task.compile('uglify', path.style_in, path.style_out),
        task.compile('stylus', path.script_in, path.script_out)
    );

    // Run tasks
    just.start('build', 'watch');

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
