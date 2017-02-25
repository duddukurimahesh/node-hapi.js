
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : Here defines all users routes.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

'use strict';

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/
var Models = require('../Models');
var config = require('../Configs');

module.exports = {

	// Generate a random string.
	randomSlug: function (stringLength, callback) {

		console.log('UniversalFunctions: Inside random slug');

    	var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    	var randomString = '';
    	for (var i = 0; i < stringLength; i++) {
    		var randomPoz = Math.floor(Math.random() * charSet.length);
    		randomString += charSet.substring(randomPoz,randomPoz+1);
    	}
    	callback(null,{data: randomString});
	}	
};