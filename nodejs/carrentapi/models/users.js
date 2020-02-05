const mongoose = require('mongoose');


const usersSchema = mongoose.Schema({
        _id 			: mongoose.Schema.Types.ObjectId,
        services : {
            password :{
                bcrypt : String,
            }
        },
        loginTokens     :[],
        profile	    	: {
            firstName   : String,
            lastName    : String,
            email       : String,
            phone       : String,
        },
        roles : [],
        createdAt 		: Date,
        createdBy 		: String
});

module.exports = mongoose.model('users', usersSchema);


