# Just - A simple task runner [![Build Status](https://travis-ci.org/vitorbritto/just.svg)](https://travis-ci.org/vitorbritto/just)

<img src="http://www.vitorbritto.com.br/just/assets/images/logo.png" alt="Just" align="right">

Currently, there are some great task runners and build tools to perform common tasks. The use of these tools to automate tasks is really awesome but falls short in some aspects and process. **Just** not intend to compete with Grunt, Gulp or Brocolli.

**Just** has a simple purpose and was developed based in personal needs to perform common tasks in my workflow on a simple way, far from extensive configuration files and a lightning-fast way to build my apps.

But you might ask: "Why don't you use Make?" Well, it's an option but I wanted to create a personal process to lead this automation. It never hurts to have more options, right?

So, let me introduce **Just**. :)

### What is included?

- [CSSLint](https://npmjs.org/package/csslint)
- [Stylus](https://npmjs.org/package/stylus)
- [JSHint](https://npmjs.org/package/jshint)
- [UglifyJS](https://npmjs.org/package/uglify-js)
- [Browserify](https://www.npmjs.org/package/browserify)
- [Mocha](https://www.npmjs.org/package/mocha)
- [Chai](https://www.npmjs.org/package/chai)

### What can I do with Just?

So far, **Just** can execute these following tasks:

- Compile and generate CSS files with Stylus.
- Bundle and Minify JavaScript files with Browserify and UglifyJS.
- Lint JavaScript and CSS files with JSHint and CSSLint.
- Run tests with Mocha (using Chai).


> **NOTE:** this is a work in progress and I will likely add more functionality in the future. =] <br>
> **TODO:** https://github.com/vitorbritto/just/issues


## Getting Started

1 - First of all, make sure you have [Node.js](http://nodejs.org/) installed.
2 - Clone this repository and create your project folder

```bash
$ git clone git://github.com/vitorbritto/just.git projectname
$ cd projectname
```

3 - Run the makefile with `node make` to build an initial structure. _(optional)_
4 - Profit! :)

## Usage

- Build Application: `node just build` or `./just.js build`
- Process CSS files: `node just style` or `./just.js style`
- Process JS files: `node just script` or `./just.js script`
- Run unit Tests:   `node just spec` or `./just.js spec`

## Configuration

Feel free to change the configuration to be whatever you want before run your tasks. You can find configurations in `./lib/config.js`.

### Default Configuration

```javascript
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
```

> Use `./just.js --help` or `./just.js -h` for more details and instructions.


## Contributing

Feel free to [contribute](https://github.com/vitorbritto/just/pulls) with this project or leave a [suggestion](https://github.com/vitorbritto/just/issues).


## Acknowledgments

This script was inspired by [./task.js](https://gist.github.com/substack/8313379) and so many others articles from [dailyjs.com](http://dailyjs.com), [2ality](http://2ality.com) and [shapeshed.com](http://shapeshed.com).


## License

[MIT License](http://vitorbritto.mit-license.org/) © Vitor Britto
