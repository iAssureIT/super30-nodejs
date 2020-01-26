const mongoose 		= require('mongoose');
const CarMaster 	= require('../models/carmaster.js');
const Fs = require('fs');

exports.insert_carMaster = (req,res,next)=>{

		if(req.body.action === "Insert"){
			console.log("Inside insert_carMaster function = ", req.body);
			var carMaster = new CarMaster({
				_id 						: new mongoose.Types.ObjectId(),
				carCategory  				: req.body.carCategory,
				carBrand 	 				: req.body.carBrand,
				carModel  					: req.body.carModel,
				vehicleNumber	    		: req.body.vehicleNumber,
				totalSeats	    			: req.body.totalSeats,
				transmission	    		: req.body.transmission,
				registrationValidityDate	: req.body.registrationValidityDate,
				regstrationPic	    		: req.body.regstrationPic,
				insuranceValidityDate	    : req.body.insuranceValidityDate,
				insurancePic	    		: req.body.insurancePic,
				createdAt 					: new Date(),
				createdBy 					: "Ashish Naik"
			});
			carMaster
				.save()
				.then(response=>{
			        res.status(200).json({
			            "message": "CarMaster inserted Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while inserting CarMaster = ", error);
					res.status(500).json({
						"message" : "Some error occured while inserting CarMaster",
						"error"   : error
					})
				});
		}else{
			console.log("Inside update_carMaster function = ", req.body);

			CarMaster
				.update({_id : req.body.master_id},{$set : {master : req.body.carMaster} })
				.then(response=>{
			        res.status(200).json({
			            "message": "CarMaster updated Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while updating CarMaster = ", error);
					res.status(500).json({
						"message" : "Some error occured while updating CarMaster",
						"error"   : error
					})
				});			
		}


}

exports.delete_carMaster = (req,res,next) =>{
	console.log("id = ",req.body);

	CarMaster.remove({_id : req.body.id})
				.then(response => {
					res.status(200).json({
						message : "Car Master Deleted Successfully",
						response : response
					})
				})
				.catch((error)=>{
					console.log("error while Deleting Car Master = ", error);
					res.status(500).json({
						"message" : "Some error occured while Deleting CarMaster",
						"error"   : error
					})
				});

}


		


exports.get_carMaster_list = (req,res,next)=>{

		CarMaster.find()
			   .sort({createdAt : -1})
			   .then(carMasters => {
			   		if(carMasters.length > 0){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carMasters : carMasters
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carMasters : carMasters
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarMaster List",
						"error"   : error
					})
				});

}

exports.get_carMaster_list_atoz = (req,res,next)=>{

		CarMaster.find({brand : req.params.brand})
			   .sort({master : 1})
			   .then(carMasters => {
			   		if(carMasters.length > 0){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carMasters : carMasters
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carMasters : carMasters
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarMaster List",
						"error"   : error
					})
				});

}

exports.get_oneCarMaster = (req,res,next)=>{
	var master_id = req.params.master_id;

	CarMaster.findOne({_id : master_id})
			   .then(carMasterObj => {
			   		if(carMasterObj){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carMasterObj : carMasterObj
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carMasterObj : carMasterObj
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting carMaster Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarMaster Data",
						"error"   : error
					})
				});
}

exports.upload_registrationPic = (req,res,next) => {

	console.log("req.file = ", req.file);

	return res.status(200).json({
		filepath : req.file.path
	});

}
exports.upload_insurancePic = (req,res,next) => {

	console.log("req.files = ", req.files);

	return res.status(200).json({
		filepath : req.file.path
	});

}

exports.delete_carImage = (req,res,next) => {
	console.log("req.body = ", req.body);

	var filepath = req.body.filepath;
	Fs.unlink(filepath, (error)=>{
		if(error){
			 res.status(401).json({
				message : "File Can Not Be Deleted",
				error : error
			});	
		}else{
			res.status(200).json({
				message : "File Deleted"
			});	
		}

	} );
	
	

}