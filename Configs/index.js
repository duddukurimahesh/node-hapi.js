
/*-----------------------------------------------------------------------
   * @ file        : index.js
   * @ description : Main module to incluse all the configs.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

'use strict';

module.exports =  {

    db         : require("./dbConfig"),
    app        : require("./appConfig"),
    SMTP       : require("./smtpConfig"),
    CONSTS     : require("./constants"),
    PUSH       : require("./pushConfig")
};





