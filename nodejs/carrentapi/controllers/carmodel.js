const mongoose 		= require('mongoose');
const CarModel 	= require('../models/carmodel.js');


exports.insert_carModel = (req,res,next)=>{

		if(req.body.action === "Insert"){
			console.log("Inside insert_carModel function = ", req.body);
			var carModel = new CarModel({
				_id 			: new mongoose.Types.ObjectId(),
				brand_id  		: req.body.carBrand_id,
				model  			: req.body.carModel,
				createdAt 		: new Date(),
				createdBy 		: "Ashish Naik"
			});
			carModel
				.save()
				.then(response=>{
			        res.status(200).json({
			            "message": "CarModel inserted Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while inserting CarModel = ", error);
					res.status(500).json({
						"message" : "Some error occured while inserting CarModel",
						"error"   : error
					})
				});
		}else{
			console.log("Inside update_carModel function = ", req.body);

			CarModel
				.update({_id : ObjectId(req.body.model_id)},{$set : {model : req.body.carModel} })
				.then(response=>{
			        res.status(200).json({
			            "message": "CarModel updated Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while updating CarModel = ", error);
					res.status(500).json({
						"message" : "Some error occured while updating CarModel",
						"error"   : error
					})
				});			
		}


}

exports.delete_carModel = (req,res,next) =>{
	console.log("id = ",req.body);

	CarModel.remove({_id : req.body.id})
				.then(response => {
					res.status(200).json({
						message : "Car Model Deleted Successfully",
						response : response
					})
				})
				.catch((error)=>{
					console.log("error while Deleting Car Model = ", error);
					res.status(500).json({
						"message" : "Some error occured while Deleting CarModel",
						"error"   : error
					})
				});

}


		


exports.get_carModel_list = (req,res,next)=>{

	CarModel.find()
			   .sort({createdAt : -1})
			   .then(carModels => {
			   		if(carModels.length > 0){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carModels : carModels
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carModels : carModels
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarModel List",
						"error"   : error
					})
				});

}

exports.get_carModel_list_atoz = (req,res,next)=>{

		CarModel.find()
			   .sort({model : 1})
			   .then(carModels => {
			   		if(carModels.length > 0){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carModels : carModels
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carModels : carModels
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarModel List",
						"error"   : error
					})
				});

}

exports.get_oneCarModel = (req,res,next)=>{
	var model_id = req.params.model_id;

	CarModel.findOne({_id : model_id})
			   .then(carModelObj => {
			   		if(carModelObj){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carModelObj : carModelObj
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carModelObj : carModelObj
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting carModel Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarModel Data",
						"error"   : error
					})
				});
}