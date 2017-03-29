
/*-----------------------------------------------------------------------
   * @ file        : customPlugIn.js
   * @ description : Here we are creating the custom plugIns accourding to the application need.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

'use strict';

// Include internal modules.
const configs  = require('../Configs');
const env      = require('../env');
const app      = configs.app[env.instance]; 

var custom_Init = {  
  register: function (server, options, next) {
    console.log('CUSTOM PLUGIN: ************** LOADING Init the index route. *************');
    // Init the index route.
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        return reply({
            name     : app.name,
            endpoint : app.host,
            port     : app.port
        }).code(201);
      }
    });
    next()	// call next() to signal hapi that your plugin has done the job.
  }
}

custom_Init.register.attributes = {  
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = custom_Init  
