# Just
A ridiculously simple task runner.

## Getting Started
Alright, I know. Another way to perform automation tasks. But it never hurts to have options, right? :)

> NOTE: This is a work in progress and I will likely add more functionality in the future.

### Features
This build script is capable of processing and minifying stylus files and compressing and minifying JavaScript files.

### Installation

[ 1 ] - First of all, make sure you have [Node.js](http://nodejs.org/) installed.
[ 2 ] - Clone this repository and create your project folder

```bash
git clone git://github.com/vitorbritto/just.git projectname
cd projectname
```

[ 3 ] - Install dependencies and make the script executable

```bash
npm install
chmod u+x just.js
```

[ 4 ] - Install tasks dependencies: `./just npm` *[!]*
[ 5 ] - Generate the scaffolding for your project: `./just build` *[!]*
[ 6 ] - You're ready to go! :)

#### Task Options

- Build: `./just run`
- Watch: `./just watch`

> [!] - When you run the script for the first time!

### Configuration
Feel free to change the configuration to be whatever you want. Just modify the `config` properties/methods in `./lib/config.js` file.

> Use `node just --help` for more details and instructions.

## Contributing
Feel free to [contribute](https://github.com/gruntbrasil/just/pulls) with this project or leave a [suggestion](https://github.com/gruntbrasil/just/issues).

## Acknowledgments
This script was inspired by [./task.js](https://gist.github.com/substack/8313379) and so many others articles from [dailyjs.com](dailyjs.com), [2ality](2ality.com) and [shapeshed.com](shapeshed.com).


## License
Copyright (c) 2014 Vitor Britto Licensed under the [MIT license](LICENSE).
