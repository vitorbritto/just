var exec = require('child_process').exec;

module.exports = config = {

    // Paths Configs
    app_style: 'app/css/',
    app_script: 'app/js/',
    public_view: 'public/',
    public_style: 'public/css/',
    public_script: 'public/js/',

    // Server Config
    server_host: "127.0.0.1",
    server_port: "8001",
    server_base: "public",
    server_sync: true,
    server_files: [
        'app/css/*.styl',
        'app/js/*.js',
        'public/*.html'
    ],

    dependencies: [
        'jshint',
        'uglifyjs',
        'stylus',
        'browser-sync'
    ],

    // Tasks
    refresh: function() {
        exec('browser-sync --server "' + config.server_base + '" --files "' + config.server_files + '" --ghostMode ' + config.server_sync + '');
    },
    jshint: function() {
        console.log('→ Validating scripts'.green);
        exec('jshint ' + config.app_script + 'main.js');
    },
    minify: function() {
        console.log('→ Minifying scripts'.green);
        exec('cat '+ config.app_script +' main.js | uglifyjs -o '+ config.public_script +'main.min.js');
    },
    compile: function() {
        console.log('→ Compiling CSS'.green);
        exec('stylus -c <' + config.app_style + 'style.styl> ' + config.public_style + 'style.css');
    },
    copy: function(input, output) {
        console.log('→ Copying files'.green);
        exec('cp -rf ' + input + ' ' + output);
    },
    clean: function(path) {
        console.log('→ Removing files'.green);
        exec('rm -rf' + path);
    }
};
