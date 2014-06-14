var config = {

    // ------------------------------------------------------------------------------------
    // STYLESHEETS OPTIONS
    // ------------------------------------------------------------------------------------
    style: {
        src:  './app/styles/style.styl',        // Source CSS file to compile with Stylus
        dest: './public/styles'                 // Compiled CSS file with Stylus
    },

    // ------------------------------------------------------------------------------------
    // SCRIPTS OPTIONS
    // ------------------------------------------------------------------------------------
    script: {
        src:  './app/scripts/app.js',           // Source script file
        dest: './public/scripts/bundle.js',     // Generated file with browserify
        min:  './public/scripts/bundle.min.js', // Minified file before bundled with browserify
    },

    // ------------------------------------------------------------------------------------
    // MOCHA OPTIONS
    // ------------------------------------------------------------------------------------
    //
    // Optionally you could watch tests.
    // Just pass a TRUE boolean value to .mocha() method
    //
    // Example:
    //     .mocha(config.spec.files, config.spec.log, true)
    //
    // ------------------------------------------------------------------------------------
    spec: {
        src: './app/spec/index.js',     // Main script file to run unit tests
        log:   'nyan'                   // Availables: run "mocha --reporters" on Shell
    },

    // ------------------------------------------------------------------------------------
    // BROWSERIFY OPTIONS
    // ------------------------------------------------------------------------------------
    //
    // Optionally, you could add transforms.
    // Just "config.transforms" as a param to .browserify() method
    //
    // Example:
    //     .browserify(config.script.src, config.script.dest, config.transforms)
    //
    // ------------------------------------------------------------------------------------
    transforms: ['']

};

module.exports = config;


