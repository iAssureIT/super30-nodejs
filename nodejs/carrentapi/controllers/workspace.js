const mongoose = require('mongoose');
const Workspace = require('../models/workspace.js');
const fs = require('fs');


exports.insert_workspace = (req,res,next)=>{
		console.log("Inside insert_workspace function = ", req.file);

		if(req.file){			
			var workspace = new Workspace({
				_id 		: new mongoose.Types.ObjectId(),
				"cafeName"  	: req.body.cafeName,
				"address"  		: req.body.address,
				"area"  		: req.body.area,
				"landmark"  	: req.body.landmark,
				"city"  		: req.body.city,
				"state"  		: req.body.state,
				"country"		: req.body.country,
				"pincode"  		: req.body.pincode,
				"numSeats"		: req.body.numSeats,
				"adminName"		: req.body.adminName,
				"adminMobile"	: req.body.adminMobile,
				"adminEmail" 	: req.body.adminEmail,
				"beverage" 		: req.body.beverage,
				"openingTime"	: req.body.openingTime,
				"closingTime"	: req.body.closingTime,
				"accHolderName"	: req.body.accHolderName,
				"bankName"		: req.body.bankName,
				"accNumber"		: req.body.accNumber,
				"ifscCode"		: req.body.ifscCode,
				"branch"		: req.body.branch,
				"cafeImage" 	: req.file.path,
				createdAt 	: new Date(),
				createdBy 	: "Ashish Naik"
			});


			workspace
				.save()
				.then((data)=>{
			        res.status(200).json({
			            "message": "workspace data inserted Successfully",
			        });
				})
				.catch((error)=>{
					console.log("error while inserting workspace = ", error);
					res.status(500).json({
						"message" : "Some error occured while inserting workspace",
						"error"   : error
					})
				});
		}//if
		else{
			res.status(500).json({
				"message" : "Error in File Upload",
				"error"   : error
			})			
		}

}
		

exports.insert_file = (req,res,next)=>{
		console.log("Inside insert_workspace function = ", req.file);

		if(req.file){			
	        res.status(200).json({
	        	"filepath" : req.file.path,
	            "message": "File Uploded Successfully",
	        });
		}
		else{
			res.status(500).json({
				"message" : "Error in File Upload",
				"error"   : error
			})			
		}

}
		
// ==============
// Delete File
// ==============
exports.delete_file = (req,res,next)=>{
		console.log("Inside delete file function = ", req.body);
		fs.unlink(req.body.filepath, 
					(err) => {
						if (err){
							res.status(500).json({
								"message" : "Error in File Delete",
								"error"   : error
							})			
						}

				        res.status(200).json({					        	
				            "message": req.body.filepath + " File Deleted Successfully",
				        });

					});
}
		

