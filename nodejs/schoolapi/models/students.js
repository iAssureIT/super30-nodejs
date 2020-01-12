const mongoose = require('mongoose');


const studentsSchema = mongoose.Schema({
				_id 			: mongoose.Schema.Types.ObjectId,
				firstName  	    : String,
				middleName  	: String,
				lastName  	    : String,
				createdAt 		: Date,
				createdBy 		: String
});

module.exports = mongoose.model('students', studentsSchema);


