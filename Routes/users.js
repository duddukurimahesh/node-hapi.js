
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
const Boom        = require('boom');

module.exports = [
    {
        method: 'GET',
        path:'/v1/Users/usersList',
        config: {
            description: 'Get users',
            notes: 'Get list of all users',
            tags: ['api','Users']
        },
        handler: (request, reply) => {

            console.log("\x1b[34m\x1b[1m",'USERS');

            Controllers.users.getAllUsers(request,(err,res) => {
                if(err)
                    reply(err,null)
                else
                    reply(null,res)
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
                    phone: Joi.number().required()
                    /* all parameters here... */
                }
            }
        },
        handler: (request, reply) => {

            console.log("\x1b[34m\x1b[1m",'USERS');

            //reply(null,{phone_num:request.payload});
            reply(Boom.unauthorized('invalid password'),null);
            /*Controllers.users.registerUser(request.payload,(err, res) => {
                if(err) {
                    reply(err,null);
                } else {
                    reply(null,res);
                };
            });*/
        }
    }

];