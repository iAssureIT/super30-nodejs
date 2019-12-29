const express = require('express');
const mongoose = require('mongoose');

const Employee = require('../models/employee.js');


exports.insert_employee = (req,res,next)=>{ 
	console.log("I am inside insert_employee function");
	console.log("request = ",req);
}; 

exports.get_employeeList = (req,res,next)=>{ 
	console.log("I am inside insert_employee function");
	console.log("request = ",req);
}; 