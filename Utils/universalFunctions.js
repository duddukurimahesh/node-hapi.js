
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
const async  = require('async');
const Models = require('../Models');
const config = require('../Configs');      
const APN    = require('./apn');     // APN Notification module.
const FCM    = require('./fcm');     // FCM Notification module.

module.exports = {

  /*---------------------------------------------------------------------
      function to send notifications to 'IOS' and 'ANDROID' devices.
      request should have array of :  { device_token, 
                                        device_type, 
                                        user_id, 
                                        message_type, 
                                        message };
  ----------------------------------------------------------------------*/
    send_notification: function (request,callback) {

        async.waterfall([
            function (callback) {       //Save every notification in DataBase.
                var count=0;
                _.each(request,function (obj) {
                    Models.notifications.Notifications(obj).save(function (err,res) {
                        count++
                        if(err){
                            if(count==request.length)
                                callback(null,request);
                        }else{
                            if(count==request.length)
                                callback(null,request);
                        };
                    });
                });
            },
            function (request, callback) {     //sending Notification to the devices.
                console.log('Sending Notification to the devices---------',request);

                APN.init();
                var count=0;
                _.each(request,function (recievers) {
                    count++;        //sending notification  for each reciever
                    if(recievers.device_type === 'android'){   //send for android devices.
                        var res =FCM.sendNotification({message: recievers.message, device_token: recievers.device_token});
                        if(count==request.length)
                            callback(null,{status:100, status:"success", message:"Notification sent successfully!"});
                    }else{                                    //send for ios devices.
                        var res =APN.sendNotification({message: recievers.message, device_token: recievers.device_token});
                        if(count==request.length)
                            callback(null,{status:100, status:"success", message:"Notification sent successfully!"});
                    };
                });
            }
        ],function (err,res) {
            if(res)
                callback(null,res);
            else
                callback(err,null);
        });
    },

	// Generate a random string.
	randomSlug: function(stringLength, callback) {

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