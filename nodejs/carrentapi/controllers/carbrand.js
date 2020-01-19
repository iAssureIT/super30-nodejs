const mongoose 		= require('mongoose');
const CarBrand 	= require('../models/carbrand.js');


exports.insert_carBrand = (req,res,next)=>{

		if(req.body.action === "Insert"){
			console.log("Inside insert_carBrand function = ", req.body);
			var carBrand = new CarBrand({
				_id 			: new mongoose.Types.ObjectId(),
				brand  			: req.body.carBrand,
				createdAt 		: new Date(),
				createdBy 		: "Ashish Naik"
			});
			carBrand
				.save()
				.then(response=>{
			        res.status(200).json({
			            "message": "CarBrand inserted Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while inserting CarBrand = ", error);
					res.status(500).json({
						"message" : "Some error occured while inserting CarBrand",
						"error"   : error
					})
				});
		}else{
			console.log("Inside update_carBrand function = ", req.body);

			CarBrand
				.update({_id : req.body.brand_id},{$set : {brand : req.body.carBrand} })
				.then(response=>{
			        res.status(200).json({
			            "message": "CarBrand updated Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while updating CarBrand = ", error);
					res.status(500).json({
						"message" : "Some error occured while updating CarBrand",
						"error"   : error
					})
				});			
		}


}

exports.delete_carBrand = (req,res,next) =>{
	console.log("id = ",req.body);

	CarBrand.remove({_id : req.body.id})
				.then(response => {
					res.status(200).json({
						message : "Car Brand Deleted Successfully",
						response : response
					})
				})
				.catch((error)=>{
					console.log("error while Deleting Car Brand = ", error);
					res.status(500).json({
						"message" : "Some error occured while Deleting CarBrand",
						"error"   : error
					})
				});

}


		


exports.get_carBrand_list = (req,res,next)=>{

	CarBrand.find()
			   .sort({createdAt : -1})
			   .then(carBrands => {
			   		if(carBrands.length > 0){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carBrands : carBrands
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carBrands : carBrands
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarBrand List",
						"error"   : error
					})
				});

}

exports.get_carBrand_list_atoz = (req,res,next)=>{

		CarBrand.find()
			   .sort({brand : 1})
			   .then(carBrands => {
			   		if(carBrands.length > 0){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carBrands : carBrands
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carBrands : carBrands
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarBrand List",
						"error"   : error
					})
				});

}

exports.get_oneCarBrand = (req,res,next)=>{
	var brand_id = req.params.brand_id;

	CarBrand.findOne({_id : brand_id})
			   .then(carBrandObj => {
			   		if(carBrandObj){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carBrandObj : carBrandObj
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carBrandObj : carBrandObj
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting carBrand Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarBrand Data",
						"error"   : error
					})
				});
}