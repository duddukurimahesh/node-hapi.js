
/*-----------------------------------------------------------------------
   * @ file        : index.js
   * @ description : Main module to incluse all the Routes.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

'use strict';

const users = require('./users');
const test = require('./test');

module.exports = [].concat(users,test);