const mongoose = require('mongoose');

const Employee = require('../models/employee.js');


exports.insert_employee = (req,res,next)=>{
		console.log("Inside insert_employee function = ", req.body);

		var employee = new Employee({
			_id : new mongoose.Types.ObjectId(),
			fName : req.body.fName,
			lName : req.body.lName,
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
			.then((data)=>{
		        res.status(200).json({
		            "data" : data,
		        });
			})
			.catch((error)=>{
				console.log("Error while getting employee data. ", error);
				res.status(500).json({
					"message" : "Some error occured while getting employee data",
					"error"   : error
				})
			});
};

