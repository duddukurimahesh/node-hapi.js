
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : This is the user service which will handle the user CRUD.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

/*--------------------------------------------
    * Include internal and external modules.
---------------------------------------------*/
const Boom   = require('boom');
const Models =  require('../Models');
const Utils  =  require('../Utils');

module.exports = {

    //Register a user.
    register: (params, callback) => {

        var obj = {};

        Models.users.User(obj).save((err, res)=>{
            if(err) {
                reply(Boom.notFound('Title is missing.'));
            } else {
                callback(null,res);
            };
        });
    },
    getAll: (params, callback) => {

        Models.users.User.find({},{__v:0},{},(err,res)=>{
            if(err){
                reply(Boom.notFound('Title is missing.'));
            } else{
                callback(null,res);
            };
        });
    }
};
