
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
const Joi         = require('joi');
const Controllers = require('../Controllers');


module.exports = [
    {
        method: 'GET',
        path:'/v1/Users/allUsers',
        config: {
            description: 'Get users',
            notes: 'Get list of all users',
            tags: ['api','Users']
        },
        handler: function (request, reply) {
            console.log("-----**-------Request to get all users.-----**-------");

            Controllers.users.getAllUsers(request,function (err,res) {
                if(err){
                    reply(err,null);
                } else {
                    reply(null,res);
                };
            });

        }
    },
    {
        method: 'POST',
        path:'/v1/Users/register',
        config: {
            description: 'Add users',
            notes: 'Add new user.',
            tags: ['api','Users'],
            validate:{
                payload:{
                    phone: Joi.string().required()
                    /* all parameters here... */
                }
            }
        },
        handler: function (request, reply) {
            console.log("-----**-------Request to register new user.-----**-------");
            reply(null,{phone_num:request.payload});
            /*Controllers.users.registerUser(request.payload, function (err, res) {
                if(err) {
                    reply(err,null);
                } else {
                    reply(null,res);
                };
            });*/
        }
    }

];