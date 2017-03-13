
/*---------------------------------------------------------------------------------
   * @ file        : server.js
   * @ description : This is the main startup server file to init the application.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
----------------------------------------------------------------------------------*/

// Include external modules.
const Hapi     = require('hapi');
const plugIns  = require('./PlugIns');
const mongoose = require('mongoose');

// Include internal modules.
const configs  = require('./Configs');
const env      = require('./env');
const app      = configs.app[env.instance];
const db       = configs.db [env.instance];
const server   = new Hapi.Server();
const routes   = require('./Routes');

// Setting Server Configuration.
server.connection({
    host: app.host,
    port: app.port
});

console.log('\x1b[42m%s\x1b[0m',"+++ SERVER SETTINGS LOADED +++\r\n" +JSON.stringify(app)  + "\n");

server.route(routes);

// Init the index route.
server.route({
    method: 'GET',
    path:'/',
    handler: (request,reply)=> {

        return reply({
            name     : app.name,
            endpoint : app.host,
            port     : app.port
        }).code(201);
    }
});

// Register PlugIn's and Start the server.
server.register(plugIns,(err)=> {

    if (err) {
        throw err; // something bad happened loading the plugin.
    }
    server.start((err)=> {
        if (err) {
            console.log('\x1b[41m%s\x1b[0m',"+++ Error starting server +++");
            throw err;
        } else
            console.log('\x1b[42m%s\x1b[0m', '+++ SERVER STARTED +++\r\nServer running at:' + server.info.uri);
    });
});

// Connect to MongoDB.
const Db_Options = {
    db     : { native_parser: true },
    server : { poolSize: 5 },
    user   : db.username,
    pass   : db.password
};
const mongoUrl = 'mongodb://'+db.host+':'+db.port+'/'+db.name;

mongoose.connect(mongoUrl,Db_Options,(err)=> {
    if (err) {
        console.log('\x1b[41m%s\x1b[0m',"DB Error: "+ err);
        process.exit(1);
    } else
        console.log('\x1b[42m%s\x1b[0m','MongoDB Connected :'+ mongoUrl);
});

// need to write connection events for mongodb.
// mocha + chai for tessting
// gulp task runner custom plugIn.
// socket.io
// redis
// log file folder. and need to integrate the npm plugIn also.
// create a custom plugIn prototype.
// custom events modules to create custom events.
// write one task schedular.
// write sms test api also.
// SOCIAL LOGIN : facebook, twitter, linkedIn,Google+,Instagram,GitHub,etc,.. 