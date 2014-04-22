#!/usr/bin/env node

'use strict';

// =======
// MODULES
// =======

var sh    = require('shelljs'),
    cmd   = require('commander'),
    Just  = require('orchestrator'),
    Task  = require('./tasks'),
    just  = new Just(),
    task  = new Task();

require('colors');


// ======
// CONFIG
// ======

var path = {
    view_in:    './app/',
    style_in:   './app/styles/',
    script_in:  './app/scripts/',
    view_out:   './dist/',
    style_out:  './dist/styles/',
    script_out: './dist/scripts/',
};


// =====================================================
// TASKS
// =====================================================

// Build task
function build() {

    sh.echo('→ Runnning'.cyan);

    just.add('build', function() {
        task.lint('csslint', path.style_out)
            .lint('jshint', path.script_in)
            .compile('uglify', path.script_in, path.script_out)
            .compile('stylus', path.style_in, path.style_out);
    });

    just.start(['build'], function(){
        sh.echo('✔ done'.green);
    });
}

// Optimize CSS files → Lint, Minify and Concatenate
function optimizestyles() {

    sh.echo('→ Runnning'.cyan);

    just.add('styles', function(){
        task.lint('csslint', path.style_out)
            .compile('stylus', path.style_in, path.style_out);
    });

    just.start(['styles'], function(){
        sh.echo('✔ done'.green);
    });
}

// Optimize JS files → Lint, Minify and Concatenate
function optimizeScripts() {

    sh.echo('→ Runnning'.cyan);

    just.add('scripts', function(){
        task.lint('jshint', path.script_in)
            .compile('uglify', path.script_in, path.script_out);
    });

    just.start(['scripts'], function(){
        sh.echo('✔ done'.green);
    });
}


// =====================================================
// CLI COMMANDS
// =====================================================

cmd
    .command('all')
    .description('Compile, Lint, Minify and Concatenate all files')
    .action(build);

cmd
    .command('css')
    .description('Optimize CSS files')
    .action(optimizestyles);

cmd
    .command('js')
    .description('Optimize JS/CSS and copy files to deploy')
    .action(optimizeScripts);


// Config
cmd.parse(process.argv);

if (process.argv.length === 2) {
    cmd.help();
}
