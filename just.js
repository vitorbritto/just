#!/usr/bin/env node

'use strict';

// =======
// MODULES
// =======

var task = require('./tasks'),
    sh    = require('shelljs'),
    cmd   = require('commander'),
    Just  = require('orchestrator'),
    just  = new Just();

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
    sh.echo('');

    just.add('build',
        task.lint('csslint', path.style_out),
        task.lint('jshint', path.script_in),
        task.compile('uglify', path.script_in, path.script_out),
        task.compile('stylus', path.style_in, path.style_out)
    );

    just.start(['build'], function(){
        sh.echo('✔ done'.green);
    });
}

// Optimize CSS files → Lint, Minify and Concatenate
function optimizestyles() {

    sh.echo('→ Runnning'.cyan);
    sh.echo('');

    just.add('styles',
        task.lint('csslint', path.style_out),
        task.compile('stylus', path.style_in, path.style_out)
    );

    just.start(['styles'], function(){
        sh.echo('✔ done'.green);
    });
}

// Optimize JS files → Lint, Minify and Concatenate
function optimizeScripts() {

    sh.echo('→ Runnning'.cyan);
    sh.echo('');

    just.add('scripts',
        task.lint('jshint', path.script_in),
        task.compile('uglify', path.script_in, path.script_out)
    );

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
