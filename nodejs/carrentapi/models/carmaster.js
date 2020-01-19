const mongoose = require('mongoose');


const carMasterSchema = mongoose.Schema({
				_id 						: mongoose.Schema.Types.ObjectId,
				carCategory 				: String,
				carBrand 					: String,
				carModel	    			: String,
				vehicleNumber	    		: String,
				totalSeats	    			: String,
				transmission	    		: String,
				registrationValidityDate	: String,
				regstrationPic	    		: String,
				insuranceValidityDate	    : String,
				insurancePic	    		: String,
				createdAt 					: Date,
				createdBy 					: String
});

module.exports = mongoose.model('carmaster', carMasterSchema);


