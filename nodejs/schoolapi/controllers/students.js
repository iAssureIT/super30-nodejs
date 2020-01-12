const mongoose = require('mongoose');
const Students = require('../models/students.js');


exports.insert_student = (req, res, next)=>{
	console.log("req.body = ", req.body);
	
	var student = new Students({
		_id  		: new mongoose.Types.ObjectId(),
		firstName 	: req.body.firstName,
		middleName  : req.body.middleName,
		lastName  	: req.body.lastName,
		createdAt 	: new Date(),
		createdBy 	: "Ashish Naik"
	});

	console.log("Inserting ... ",student);

	student
		.save()
		.then((response)=>{
			console.log("insert response = ", response);
			res.status(200).json({
				"_id"    : response._id,
				"message": "Student Data Inserted Successfully"
			});
		})
		.catch((error)=>{
			res.status(500).json({
				"message": "Some error occurred during Student Data Insert",
				"error" : error
			});	
		});
}


exports.students_list = (req, res, next)=>{
	Students
		.find()
		.then((response)=>{
			console.log("get response = ", response);
			res.status(200).json({"students": response});
		})
		.catch((error)=>{
			res.status(500).json({
				"message": "Some error occurred while getting the Students List",
				"error" : error
			});	
		});
}

exports.one_student = (req, res, next)=>{
	var student_id = req.params.student_id;

	Students
		.findOne({"_id" : student_id})
		.then((response)=>{
			console.log("get response = ", response);
			res.status(200).json({"student": response});
		})
		.catch((error)=>{
			res.status(500).json({
				"message": "Some error occurred while getting the Students List",
				"error" : error
			});	
		});
}