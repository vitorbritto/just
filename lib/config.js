var sh = require('shelljs');

module.exports = config = {

    // Path Config
    app_view: 'app/',
    app_style: 'app/css/',
    app_script: 'app/js/',
    public_view: 'public/',
    public_style: 'public/css/',
    public_script: 'public/js/',

    // Server Config
    server_host: '127.0.0.1',
    server_port: '8001',
    server_base: 'public',
    server_sync: true,
    server_files: [
        'app/css/*.styl',
        'app/js/*.js',
        'public/*.html'
    ],

    // List of Tasks
    refresh: function() {
        if (!sh.which('browser-sync')) {
            sh.echo('✖ This task requires "browser-sync" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install browser-sync -g'.red);
            exit(1);
        }
        sh.exec('browser-sync --server "' + config.server_base + '" --files "' + config.server_files + '" --ghostMode ' + config.server_sync + '');
    },
    jshint: function() {
        if (!sh.which('jshint')) {
            sh.echo('✖ This task requires "jshint" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install jshint -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Validating scripts'.green);
        sh.exec('jshint ' + config.app_script + 'main.js');
    },
    minify: function() {
        if (!sh.which('uglifyjs')) {
            sh.echo('✖ This task requires "uglify-js" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install uglify-js -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Minifying scripts'.green);
        sh.exec('cat '+ config.app_script +' main.js | uglifyjs -o '+ config.public_script +'main.min.js');
    },
    compile: function() {
        if (!sh.which('stylus')) {
            sh.echo('✖ This task requires "stylus" to be installed globally.'.red);
            sh.echo('Install: <sudo> npm install stylus -g'.red);
            sh.echo('✖ Aborting...'.red);
            exit(1);
        }
        sh.echo('→ Compiling CSS'.green);
        sh.exec('stylus -c <' + config.app_style + 'style.styl> ' + config.public_style + 'style.css');
    },
    copy: function(input, output, err) {
        sh.echo('→ Copying files'.green);
        sh.cp('-rf', input + ', ' + output);
        if (err) throw err;
    },
    clean: function(path, err) {
        sh.echo('→ Removing files'.green);
        sh.rm('-rf', path);
        if (err) throw err;
    }
};
