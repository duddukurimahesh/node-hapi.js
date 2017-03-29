
/*-----------------------------------------------------------------------
   * @ file        : users.js
   * @ description : This file defines the user schema for mongodb.
   * @ author      : Duddukuri Mahesh
   * @ date        : 
-----------------------------------------------------------------------*/

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var UserSchema = new Schema({
    auth : { type: Number, required: true , default: 2}, // 0- admin, 1- user1, 2 -user2.
    name : {
        firstName : { type: String  },
        lastName  : { type: String  }
    },
    email          : { type: String, unique: true, required: true },
    password       : { type: String, required: true },
    forgetPassword : { type: Boolean, default: false },
    secondaryEmail : { type: String },
    phone          : { type: Number },
    image          : { type: String },
    created_at     : { type: Date, default: Date.now },
    modified_at    : { type: Date },
    last_login     : { type: Date },
    is_suspended   : { type: Boolean, default: false },
    is_deleted     : { type: Boolean, default: false },
    login_token    : { type: String , default: 0},
    token          :{ type: String , default: 0},
    is_confirmed   : { type: Boolean ,default: false},
    is_confirmedSecondary: { type: Boolean ,default: false},

    device_token   : {
        device_type  : { type: String},
        device_token : { type: String},
        send_notification:{type: Boolean, default: true}
    },

    location       :{
        lat  : { type: String },
        long : { type: String }
    },

    emailModified_at: {type: Date, default : Date.now()}
});

var user = Mongoose.model('user', UserSchema);
module.exports = {
    User: user
};
