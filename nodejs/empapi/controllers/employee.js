const mongoose = require('mongoose');

const Employee = require('../models/employee.js');


exports.insert_employee = (req,res,next)=>{
		console.log("Inside insert_employee function = ", req.body);

		var employee = new Employee({
			_id 		: new mongoose.Types.ObjectId(),
			fName 		: req.body.fName,
			mName 		: req.body.mName,
			lName 		: req.body.lName,
			dob 		: req.body.dob,
			email 		: req.body.email,
			phone 		: req.body.phone,
			highestEdu 	: req.body.heducation,
			pincode 	: req.body.pincode,
			gender 		: req.body.gender,
			languages 	: req.body.languages,
			createdAt 	: new Date(),
			createdBy 	: "Ashish Naik"
		});

		employee
			.save()
			.then((data)=>{
		        res.status(200).json({
		            "message": "Employee data inserted Successfully",
		        });
			})
			.catch((error)=>{
				console.log("error while inserting employee = ", error);
				res.status(500).json({
					"message" : "Some error occured while inserting employee",
					"error"   : error
				})
			});
};


exports.get_employeeList = (req,res,next)=>{
		console.log("Inside get_employeeList function");

		Employee
			.find()
			.then((employees)=>{
				console.log("employees = ", employees);
		        res.status(200).json({employees});
			})
			.catch((error)=>{
				console.log("Error while getting employee data. ", error);
				res.status(500).json({
					"message" : "Some error occured while getting employee data",
					"error"   : error
				})
			});
};


exports.delete_employee = (req,res,next)=>{
	var empid = req.params.empid;
	console.log("empid  = ",empid);

	Employee.remove({"_id" : empid})
			.then(data=>{
				res.status(200).json(data);
			})
			.catch((error)=>{
				console.log("Error while deleting employee = ", error);
				res.status(500).json({
					"message" : "Some error occured while deleting employee data",
					"error"   : error
				})
			});

};