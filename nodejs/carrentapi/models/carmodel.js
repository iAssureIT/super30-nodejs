const mongoose = require('mongoose');


const carModelSchema = mongoose.Schema({
				_id 			: mongoose.Schema.Types.ObjectId,
				brand_id 		: String,
				brand 			: String,
				model	    	: String,
				createdAt 		: Date,
				createdBy 		: String
});

module.exports = mongoose.model('carmodel', carModelSchema);


