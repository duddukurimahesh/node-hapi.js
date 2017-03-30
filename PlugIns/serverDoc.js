
/*------------------------------------------------------------------------------------------------
   * @ file        : customPlugIn.js
   * @ description : Here we are creating the custom plugIns accourding to the application need.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-------------------------------------------------------------------------------------------------*/

'use strict';

// Include internal modules.
const configs  = require('../Configs');
const env      = require('../env');
const app      = configs.app[env.instance]; 

var serverDoc = {  
  register: function (server, options, next) {
    console.log('                    CUSTOM PLUGIN: (2) ************** LOADING Project Documentation. ********');
    // Init the index route.
    server.route({
        method: 'GET',
        path: '/doc/{param*}',
        handler: {
            directory: {
                path: 'docs',
                listing: true
            }
        }
    });
    next()	// call next() to signal hapi that your plugin has done the job.
  }
}

serverDoc.register.attributes = {  
  name: 'doc-routes',
  version: '1.0.0'
}

module.exports = serverDoc  

