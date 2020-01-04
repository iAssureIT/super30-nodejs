const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
	_id 		: mongoose.Schema.Types.ObjectId,
	fName 		: String,
	mName 		: String,
	lName 		: String,
	dob   		: String,
	email 		: String,
	phone 		: String,
	highestEdu  : String,
	gender 		: String,
	pincode 	: Number,
	languages  	: Array,
	createdAt 	: Date,
	createdBy 	: String
});

module.exports = mongoose.model('employee', employeeSchema);