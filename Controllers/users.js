
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

const Utils    =  require('../Utils');
const Services = require('../Services');

module.exports = {

    registerUser: (request, callback) => {
        Services.users.register(request,(err, res)=>{
            if(err){
                callback(err, null);
            }else{
                callback(null,res);
            };
        });
    },

    getAllUsers: (request,callback) => {
        Services.users.getAll(request,(err,res)=>{
            if(err){
                callback(err,null);
            } else{
                callback(null,res);
            };
        })
    }

};