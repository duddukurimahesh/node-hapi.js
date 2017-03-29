
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
const FCM   = require('fcm').FCM;
const Joi   = require('joi');
const Boom  = require('boom');

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
        handler: (request, reply) => {

            console.log('\x1b[36m\x1b[1m','+++++++++++++++++++++++++ test GCM request recieved +++++++++++++++++++++++++');


            let fcm = new FCM(request.payload.apikey);

            let message = {
                registration_id: request.payload.deviceToken,
                "data.message": request.payload.message
            };

            fcm.send(message, (err, res) => {
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
        handler: (request, reply) => {

            console.log('\x1b[36m\x1b[1m','+++++++++++++++++++++++++ Test API request recieved +++++++++++++++++++++++++');

            let apn      = require('apn');
            let path     = require('path');
            let configs  = require('../Configs');
            const env    = require('../env');
            const app    = configs.app[env.instance];
            let cert     = path.join(app.absolutePath,'/Certificates/cert.pem');
            let key      = path.join(app.absolutePath,'/Certificates/key.pem');

            let connectionOptions = {           //node apn options
                "cert"          : cert,
                "key"           : key,
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
                "cert"          : cert,
                "key"           : key
            }, apns;

                ((callback)=> {

                    apns = new apn.Connection(connectionOptions);   //Connection Setup
                    var feedbackObj = new apn.Feedback(feedbackOptions);

                    feedbackObj.on("feedback", function(devices) {
                        devices.forEach(function(item) {
                            console.log('Recieved notification from device ',item);
                        });
                    });

                })();
                (()=> {
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
                    }else
                        reply(false);
                })();

            /*var options = {
                cert: cert,
                key: key,
                gateway : "gateway.push.apple.com",
                production: true,
                debug : true,
                passphrase: ''
            };
            var apnProvider = new apn.Provider(options);
            var note = new apn.Notification();

            note.expiry = Math.floor(Date.now() / 1000) + 3600;             // expiry time for notification.
            note.sound = "Certificates/ping.aiff";

            note.alert = request.message;                                           // message to be sent.
            note.payload = {};

            apnProvider.send(note, request.deviceToken).then(function (err,result) {      // send notification.
                if(err){
                    //console.log(err);
                    reply(err,null);
                }else{
                    console.log(' -----  sending Push Notification from APN.  ----- ');
                    reply(result,null);
                }
            })*/
        }
    },

];