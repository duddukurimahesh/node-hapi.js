
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
var Joi = require('joi');
var Controllers = require('../Controllers');

module.exports = [
    {
        method: 'GET',
        path:'/v1/Users',
        config: {
            description: 'Get users',
            notes: 'Get list of all users',
            tags: ['api']
        },
        handler: function (request, reply) {

            Controllers.users.getAllUsers(request,function (err,res) {
                if(err){
                    reply({status: "error", message: "Error in fetching users. Please try again later" })
                } else {
                    reply({status : "Success", message : "Fetched the users", data: res})
                }
            });

        }
    },
    {
        method: 'POST',
        path:'/v1/Users',
        config: {
            description: 'Add users',
            notes: 'Add a new user to the system',
            tags: ['api'],
            validate:{
                payload:{
                    auth: Joi.number().required(),
                    name: Joi.string().required(),
                    email: Joi.string().email().lowercase().required(),
                    password: Joi.string().required(),
                    phone: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {

            Controllers.users.registerUser(request.payload, function (err, res) {
                if(err) {
                    reply({status: "error", message:"Error in registeration. Please try again later"})
                } else {
                    reply({status: "success", message: "User added successfully ", data: res});
                }
            });

        }
    },
    {
        method: 'PUT',
        path:'/v1/Users/{id}',
        config: {
            description: 'Update users',
            notes: 'Update a user by id',
            tags: ['api']
        },
        handler: function (request, reply) {


        }
    },
    {
        method: 'DELETE',
        path:'/v1/Users/{id}',
        config: {
            description: 'Delete users',
            notes: 'Delete a user by id',
            tags: ['api']
        },
        handler: function (request, reply) {


        }
    }

];