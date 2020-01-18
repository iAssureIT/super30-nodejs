const mongoose 		= require('mongoose');
const CarCategory 	= require('../models/carcategory.js');


exports.insert_carCategory = (req,res,next)=>{

		if(req.body.action === "Insert"){
			console.log("Inside insert_carCategory function = ", req.body);
			var carCategory = new CarCategory({
				_id 			: new mongoose.Types.ObjectId(),
				carCategory		: req.body.carCategory,
				createdAt 		: new Date(),
				createdBy 		: "Ashish Naik"
			});
			carCategory
				.save()
				.then(response=>{
			        res.status(200).json({
			            "message": "CarCategory inserted Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while inserting CarCategory = ", error);
					res.status(500).json({
						"message" : "Some error occured while inserting CarCategory",
						"error"   : error
					})
				});
		}else{
			console.log("Inside update_carCategory function = ", req.body);

			CarCategory
				.update({_id : req.body.catg_id},{$set : {carCategory : req.body.carCategory} })
				.then(response=>{
					console.log("update response = ", response);

			        res.status(200).json({
			            "message": "CarCategory updated Successfully",
			            response : response
			        });
				})
				.catch((error)=>{
					console.log("error while updating CarCategory = ", error);
					res.status(500).json({
						"message" : "Some error occured while updating CarCategory",
						"error"   : error
					})
				});			
		}


}

exports.delete_carCategory = (req,res,next) =>{
	console.log("id = ",req.body);

	CarCategory.remove({_id : req.body.id})
				.then(response => {
					res.status(200).json({
						message : "Car Category Deleted Successfully",
						response : response
					})
				})
				.catch((error)=>{
					console.log("error while Deleting Car Category = ", error);
					res.status(500).json({
						"message" : "Some error occured while Deleting CarCategory",
						"error"   : error
					})
				});

}


		


exports.get_carCategory_list = (req,res,next)=>{

	CarCategory.find()
			   .sort({createdAt : -1})
			   .then(carCategories => {
			   		if(carCategories.length > 0){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carCategories : carCategories
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carCategories : carCategories
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarCategory List",
						"error"   : error
					})
				});

}

exports.get_oneCarCategory = (req,res,next)=>{
	var catg_id = req.params.catg_id;

	CarCategory.findOne({_id : catg_id})
			   .then(carCategoryObj => {
			   		if(carCategoryObj){
				   		res.status(200).json({
				   			message : "Data Available",
				   			carCategoryObj : carCategoryObj
				   		});			   			
			   		}else{
				   		res.status(200).json({
				   			message : "Data Not Found",
				   			carCategoryObj : carCategoryObj
				   		});			   			
			   		}
			   })
				.catch((error)=>{
					console.log("error while getting carCategory Data = ", error);
					res.status(500).json({
						"message" : "Some error occured while getting CarCategory Data",
						"error"   : error
					})
				});
}