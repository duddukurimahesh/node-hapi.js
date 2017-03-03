
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : Here defines all testing routes.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

'use strict';

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/
const FCM         = require('fcm').FCM;
const Joi         = require('joi');
const Boom        = require('boom');

module.exports = [

    /*-------------------------------------
        * test API for sent mails.
     --------------------------------------*/
    /*{
    },*/

    /*-------------------------------------
        * test API for FCM-Notifications.
     --------------------------------------*/
    {
        method: 'POST',
        path: '/v1/test/testGCM',
        config:{
            description: 'Test API for FCM notification.',
            notes: 'Test API for FCM notification.',
            tags: ['api','test'],
            validate:{
                payload:{
                    message     : Joi.string().required(),
                    apikey      : Joi.string().required(),
                    deviceToken : Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {

            console.log('+++++++++++++++++++++++++ test GCM request recieved +++++++++++++++++++++++++');


            let fcm = new FCM(request.payload.apikey);

            let message = {
                registration_id: request.payload.deviceToken,
                "data.message": request.payload.message
            };

            fcm.send(message, function(err, res) {
                if (err)
                    reply(err,null);
                else
                    reply(null,{message:'Push notification send successfully.',result:res});
            });
        }
    },

    /*-------------------------------------
        * test API for APN-notifications.
     --------------------------------------*/
    {
        method: 'POST',
        path: '/v1/test/testAPN',
        config:{
            description: 'Test API for APN.',
            notes: 'Test API for APN.',
            tags: ['api','test'],
            validate:{
                payload:{
                    message: Joi.string().required(),
                    deviceToken: Joi.string().required()
                }
            }
        },
        handler: function (request, reply){

            console.log('+++++++++++++++++++++++++ Test API request recieved +++++++++++++++++++++++++');

            var apn = require('apn');
            var path = require('path');
            var configs = require('../Configs');
            var env = require('../env');
            var app = (env.instance == "dev") ? configs.app.dev   :  configs.app.test;

            var connectionOptions = {           //node apn options
                "cert"          :path.join(app.absolutePath,'/certs/newfile.crt.pem'),
                "key"           : path.join(app.absolutePath,'/certs/newfile.key.pem'),
                "passphrase"    : null,
                "gateway"       : "gateway.push.apple.com",
                "port"          : 2195,
                "enhanced"      : true,
                "cacheLength"   : 5,
                "errorCallback" : function (err) {
                    console.log('APN error: ',err);
                }
            }, feedbackOptions = {
                "batchFeedback" : true,
                "interval"      : 300,
                "cert"          : path.join(app.absolutePath,'/certs/newfile.crt.pem'),
                "key"           : path.join(app.absolutePath,'/certs/newfile.key.pem')
            }, apns;

                (function (callback) {

                    apns = new apn.Connection(connectionOptions);   //Connection Setup
                    var feedbackObj = new apn.Feedback(feedbackOptions);

                    feedbackObj.on("feedback", function(devices) {
                        devices.forEach(function(item) {
                            console.log('Recieved notification from device ',item);
                        });
                    });

                })();
                (function () {
                    console.log('Inside applePushNotifications: sendNotification ');

                    var note = new apn.Notification();  //creating a new notification object

                    note.expiry = Math.floor(Date.now() / 1000) + (3600*2); // Expires 2 hour from now.
                    note.badge = 0;
                    note.sound = "ping.aiff";
                    note.alert = 'hi mahesh';
                    note.device = new apn.Device("request.payload.deviceToken"); // YourDeviceToken here.
                    note.payload = {};
                    if (apns) {
                        apns.sendNotification(note);
                        reply(true);
                    }else {
                        reply(false);
                    }
                })();
        }
    },

];