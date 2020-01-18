const mongoose = require('mongoose');


const workspaceSchema = mongoose.Schema({
					_id 		: mongoose.Schema.Types.ObjectId,
				cafeName  	    : String,
				address  		: String,
				area  			: String,
				landmark  		: String,
				city  			: String,
				state  			: String,
				country			: String,
				pincode  		: String,
				numSeats		: String,
				adminName		: String,
				adminMobile		: String,
				adminEmail 		: String,
				beverage 		: String,
				openingTime		: String,
				closingTime		: String,
				accHolderName	: String,
				bankName		: String,
				accNumber		: String,
				ifscCode		: String,
				branch			: String,
				cafeImage		: String,
				createdAt 		: Date,
				createdBy 		: String
});

module.exports = mongoose.model('workspace', workspaceSchema);


