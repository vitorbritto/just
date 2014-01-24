var sh = require('shelljs');

module.exports = config = {

    // Path Config
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

    // List of Dependencies
    dependencies: [
        'jshint',
        'stylus',
        'browser-sync',
        'uglify-js'
    ],


    // List of Tasks
    refresh: function() {
        sh.exec('browser-sync --server "' + config.server_base + '" --files "' + config.server_files + '" --ghostMode ' + config.server_sync + '');
    },
    jshint: function() {
        sh.echo('→ Validating scripts'.green);
        sh.exec('jshint ' + config.app_script + 'main.js');
    },
    minify: function() {
        sh.echo('→ Minifying scripts'.green);
        sh.exec('cat '+ config.app_script +' main.js | uglifyjs -o '+ config.public_script +'main.min.js');
    },
    compile: function() {
        sh.echo('→ Compiling CSS'.green);
        sh.exec('stylus -c <' + config.app_style + 'style.styl> ' + config.public_style + 'style.css');
    },
    copy: function(input, output) {
        sh.echo('→ Copying files'.green);
        sh.cp('-rf', input + ', ' + output);
    },
    clean: function(path) {
        sh.echo('→ Removing files'.green);
        sh.rm('-rf', path);
    }
};
