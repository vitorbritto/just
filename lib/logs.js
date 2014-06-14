'use strict';

var colors = require('colors');

colors.setTheme({
    done:  'green',
    info:  'cyan',
    warn:  'yellow',
    error: 'red'
});

/**
 * Report Error Message
 *
 * @method:     error
 * @param:      {String} name
 * @param:      {String} module
 * @return:     {String}
 * @api:        private
 */

exports.error = function(name, module) {
    var str = 'This task requires ' + name + ' to be installed globally. Install: <sudo> npm install ' + module + ' -g';
    console.log('[ERROR] '.error + str);
    process.exit(1);
};

/**
 * Report Info Message
 *
 * @method:     info
 * @param:      {String} str
 * @return:     {String}
 * @api:        private
 */

exports.info = function(str) {
    console.log('[INFO] '.info + str);
};

/**
 * Report Success Message
 *
 * @method:     done
 * @param:      {String} str
 * @return:     {String}
 * @api:        private
 */

exports.done = function(str) {
    console.log('[DONE] '.done + str);
};

/**
 * Report Warning Message
 *
 * @method:     warn
 * @param:      {String} str
 * @return:     {String}
 * @api:        private
 */

exports.warn = function(str) {
    console.log('[WARN] '.warn + str);
};





