
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : Includes all users controller operations.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

'use strict';
/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/

var Utils =  require('../Utils');
var Services = require('../Services');

module.exports = {

    registerUser: function (request, callback){
        Services.users.register(request, function(err, res){
            if(err){
                callback(err, null);
            }else{
                callback(null,res);
            };
        });
    },

    getAllUsers: function(request,callback){
        Services.users.getAll(request,function(err,res){
            if(err){
                callback(err,null);
            } else{
                callback(null,res);
            };
        })
    }

};