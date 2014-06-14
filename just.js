#!/usr/bin/env node

/*
 * Copyright 2014, All Rights Reserved.
 *
 * Code licensed under the MIT License:
 * http://vitorbritto.mit-license.org/
 *
 * Author: Vitor Britto <code@vitorbritto.com.br>
 */

'use strict';

// ============================================================================
// MODULES
// ============================================================================

var task   = require('./lib/tasks'),
    config = require('./lib/config'),
    log    = require('./lib/logs'),
    cmd    = require('commander'),
    Just   = require('orchestrator'),
    just   = new Just();


// ============================================================================
// TASKS
// ============================================================================

// USING TRANSFORMS IN BROWSERIFY
//
// Optionally you could add transforms. At "config.js"
// file located inside ./lib folder, edit the "transforms"
// property to reflect your needs. Then, pass "config.transforms"
// as a param to .browserify() method
//
// Example:
//     .browserify(config.script.src, config.script.dest, config.transforms)

// Build task
function buildApp() {

    log.info('Runnning task');

    just.add('build', function() {
        task
            .csslint(config.style.dest)
            .jshint(config.script.src)
            .browserify(config.script.src, config.script.dest)
            .uglifyjs(config.script.dest, config.script.min)
            .stylus(config.style.src, config.style.dest);
    });

    just.start(['build'], function() {
        log.done('Task complete!');
    });

}

// Process CSS files → Lint, Minify and Concatenate
function processStyles() {

    log.info('Runnning task');

    just.add('styles', function() {
        task
            .csslint(config.style.dest)
            .stylus(config.style.src, config.style.dest);
    });

    just.start(['styles'], function() {
        log.done('Task complete!');
    });

}

// Process JS files → Lint, Minify and Concatenate
function processScripts() {

    log.info('Runnning task');

    just.add('scripts', function() {
        task
            .jshint(config.script.src)
            .browserify(config.script.src, config.script.dest)
            .uglifyjs(config.script.dest, config.script.min);
    });

    just.start(['scripts'], function() {
        log.done('Task complete!');
    });

}

// Execute Unit Tests
function processTests() {

    log.info('Runnning task');

    just.add('spec', function() {
        task.mocha(config.spec.src, config.spec.reporter);
    });

    just.start(['spec'], function() {
        log.done('Task complete!');
    });

}



// ============================================================================
// CLI COMMANDS
// ============================================================================

cmd
    .command('build')
    .description('Compile, Lint, Minify and Concatenate all files')
    .action(buildApp);

cmd
    .command('style')
    .description('Process CSS files')
    .action(processStyles);

cmd
    .command('script')
    .description('Process JS files')
    .action(processScripts);

cmd
    .command('spec')
    .description('Execute Unit Tests')
    .action(processTests);


// Config
cmd.parse(process.argv);

if (process.argv.length === 2) {
    cmd.help();
}
