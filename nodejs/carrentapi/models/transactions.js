const mongoose = require('mongoose');


const transactionsSchema = mongoose.Schema({
	_id 			: mongoose.Schema.Types.ObjectId,
	user_id 	: String,
	car_id 		: String,
	orderDate 	: String,
	orderNum 	: Number,
	pickupDate 	: String,
	amount 		: Number
});

module.exports = mongoose.model('transactions', transactionsSchema);


