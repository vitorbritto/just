## Just - A ridiculously simple task runner [![Build Status](https://travis-ci.org/vitorbritto/just.png)](https://travis-ci.org/vitorbritto/just)

<img src="http://www.vitorbritto.com.br/just/assets/images/logo.png" alt="Just" align="right" height="266">

Alright, I know. Another way to perform automation tasks. But it never hurts to have options, right? :)

**Features**

This build script is capable of processing and minifying stylus files and compressing and minifying JavaScript files.

**What's included?**

- [JSHint](https://npmjs.org/package/jshint)
- [Uglify](https://npmjs.org/package/uglify-js)
- [Stylus](https://npmjs.org/package/stylus)

> This is a work in progress and I will likely add more functionality in the future.

## Installation

1 - First of all, make sure you have [Node.js](http://nodejs.org/) installed. <br/>
2 - Clone this repository and create your project folder

```bash
git clone git://github.com/vitorbritto/just.git projectname
cd projectname
```

3 - Install dependencies and make the script executable

```bash
# you need admin permission or use sudo to install dependencies
npm i jshint stylus browser-sync uglify-js -g
chmod u+x just.js
```

4 - Generate the scaffolding for your project: `./just.js build` ! <br/>
5 - You're ready to go! :)

**Task Options**

- Build: `./just.js run`
- Watch: `./just.js watch`


> ! When you run the script for the first time!

## Configuration
Feel free to change the configuration to be whatever you want. Just modify the `config` properties/methods in `./lib/config.js` file.

> Use `./just.js -h` for more details and instructions.

## Contributing
Feel free to [contribute](https://github.com/vitorbritto/just/pulls) with this project or leave a [suggestion](https://github.com/vitorbritto/just/issues).

## Acknowledgments
This script was inspired by [./task.js](https://gist.github.com/substack/8313379) and so many others articles from [dailyjs.com](http://dailyjs.com), [2ality](http://2ality.com) and [shapeshed.com](http://shapeshed.com).


## License
Copyright (c) 2014 Vitor Britto Licensed under the [MIT license](LICENSE).
