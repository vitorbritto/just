## Just - A ridiculously simple task runner [![Build Status](https://travis-ci.org/vitorbritto/just.png)](https://travis-ci.org/vitorbritto/just)

<img src="http://www.vitorbritto.com.br/just/assets/images/logo.png" alt="Just" align="right" height="300">

Alright, I know. Another way to perform automation tasks. But it never hurts to have more options, right? :)

**What's included?**

- [CSSLint](https://npmjs.org/package/csslint)
- [JSHint](https://npmjs.org/package/jshint)
- [Uglify](https://npmjs.org/package/uglify-js)
- [Stylus](https://npmjs.org/package/stylus)

**What you can do with Just:**

- Compile and generate CSS files
- Compress and Minify JavaScript files
- Lint JavaScript and CSS files


> **NOTE:** this is a work in progress and I will likely add more functionality in the future. =] <br>
> **TODO:** https://github.com/vitorbritto/just/issues

## Getting Started

### Installation

1 - First of all, make sure you have [Node.js](http://nodejs.org/) installed. <br/>
2 - Clone this repository and create your project folder

```bash
git clone git://github.com/vitorbritto/just.git projectname
cd projectname
```

3 - Run the makefile with `node make` <br/>
4 - You're ready to go! :)

### Usage

- Build: `./just.js all`
- Optimize CSS: `./just.js css`
- Optimize JS: `./just.js js`

### Configuration

Feel free to change the configuration for paths and server to be whatever you want. Just modify the `path` properties in `./just.js` file.

#### Default Configuration

**Paths**

```
view_in:    ./app/
style_in:   ./app/styles/
script_in:  ./app/scripts/
view_out:   ./public/
style_out:  ./public/styles/
script_out: ./public/scripts/
```

> Use `./just.js --help` or `./just.js -h` for more details and instructions.


## Contributing

Feel free to [contribute](https://github.com/vitorbritto/just/pulls) with this project or leave a [suggestion](https://github.com/vitorbritto/just/issues).


## Acknowledgments

This script was inspired by [./task.js](https://gist.github.com/substack/8313379) and so many others articles from [dailyjs.com](http://dailyjs.com), [2ality](http://2ality.com) and [shapeshed.com](http://shapeshed.com).


## License

[MIT License](http://vitorbritto.mit-license.org/) © Vitor Britto
