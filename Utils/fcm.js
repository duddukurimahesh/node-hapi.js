
/*--------------------------------------------------------------------------------
   * @ file        : fcm.js
   * @ description : This file represents the Android Push Notification Service.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
---------------------------------------------------------------------------------*/

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/
var FCM = require('fcm').FCM;

module.exports = {

    sendNotification:function(data) {

        console.log('------------ Inside FCM: Send Notification ------------',data);

        var apiKey = 'YOUR_API_KEY_HERE';   // YOUR_API_KEY_HERE.
        var fcm    = new FCM(apiKey);

        var message = {                     // Notification Object.
            registration_id : data.device_token,
            collapse_key    : 'Collapse key', 
            'data.message'  : data.message
        };
        fcm.send(message, function(err, result) {
            if (err) {
                console.log("Something has gone wrong! at GCM push notification ------",err);
                return false;
            } else {
                console.log("FCM notification sent successfully. ------------------",result);
                return true;
            };
        });
    }
};