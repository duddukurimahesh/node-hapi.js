
/*-----------------------------------------------------------------------
   * @ file        : smtpConstants.js
   * @ description : Includes all the smtp (mail) settings.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

module.exports = {

    dev: {
        smtpUser   : "",
        smtpPass   : "",
        smtpPort   : 587,//25,
        smtpServer : "smtp.gmail.com",
        mailFrom   : "App_Name"
    },
    test: {
        smtpUser   : "",
        smtpPass   : "",
        smtpPort   : 587,//25,
        smtpServer : "smtp.gmail.com",
        mailFrom   : "App_Name"
    },
    live: {
        smtpUser   : "",
        smtpPass   : "",
        smtpPort   : 587,//25,
        smtpServer : "smtp.gmail.com",
        mailFrom   : "App_Name"
    }

};
