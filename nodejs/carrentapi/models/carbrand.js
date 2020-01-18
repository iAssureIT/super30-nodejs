const mongoose = require('mongoose');


const carBrandSchema = mongoose.Schema({
				_id 			: mongoose.Schema.Types.ObjectId,
				brand	    	: String,
				createdAt 		: Date,
				createdBy 		: String
});

module.exports = mongoose.model('carbrand', carBrandSchema);


