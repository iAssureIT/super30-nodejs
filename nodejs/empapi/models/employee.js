const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	fName : String,
	lName : String,
	// dob   : String,
	// phone : String,
	// email : String,
	// address : {
	// 	addressLine1 : String,
	// 	addressLine2 : String,
	// 	landmark 	 : String,
	// 	state 		 : String,
	// 	city 		 : String,
	// 	pincode 	 : Number,
	// },
	// languages : Array,
	// academics : Array,
	// createdAt : Date,
	// createdBy : String
});

module.exports = mongoose.model('employee', employeeSchema);