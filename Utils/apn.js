/*--------------------------------------------------------------------------------
   * @ file        : fcm.js
   * @ description : This file represents the Apple Push Notification Service.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
---------------------------------------------------------------------------------*/

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/
const apn     = require('apn');
//const path    = require('path');
const configs = require('../Configs');
const env     = require('../env');
const app     = configs.app[env.instance];

// connection Options object to connect the push notification API.
var connectionOptions = {
    "cert"          : app.absolutePath+'/Certificates/UniJob.pem',
    "key"           : app.absolutePath+'/Certificates/UniJob.pem',
    "passphrase"    : null,
    "gateway"       : "gateway.sandbox.push.apple.com",    //"gateway.push.apple.com",  --this is for production. 
    "port"          : 2195,
    "enhanced"      : true,
    "cacheLength"   : 5,
    "errorCallback" : function (err) {
        console.log('-------- APN error --------: ',err);
    }
};
// to handle failed notifications.
const feedbackOptions = { 
    "batchFeedback" : true,
    "interval"      : 300
};
var apnConnection,feedbackObj;

module.exports = {
    init: function (callback) {

        apnConnection = new apn.Connection(connectionOptions); 	// Connection Setup
        feedbackObj   = new apn.Feedback(feedbackOptions);

        feedbackObj.on("feedback", function(devices) {  // error handler if something bad happens at push notication.
            devices.forEach(function(item) {
                console.log('Recieved notification from device ',item);
            });
        });

    },
    sendNotification: function (data) {

        console.log('----------- Inside APN: end Notification -------------',data);

        var note = new apn.Notification();	 // creating a notification object

        note.expiry  = Math.floor(Date.now() / 1000) + (3600*2);   // Expires 2 hour from now.
        note.badge   = 0;
        note.sound   = "Certificates/ping.aiff";
        note.alert   = data.message;
        note.device  = new apn.Device(data.device_token);
        note.payload = {};
        if (apnConnection) {
            apnConnection.sendNotification(note);
            return true;
        }else {
            return false;
        };
    }
};