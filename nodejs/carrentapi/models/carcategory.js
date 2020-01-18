const mongoose = require('mongoose');


const carCateogrySchema = mongoose.Schema({
					_id 		: mongoose.Schema.Types.ObjectId,
				carCategory	    : String,
				createdAt 		: Date,
				createdBy 		: String
});

module.exports = mongoose.model('carcategory', carCateogrySchema);


