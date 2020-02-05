const mongoose 		= require('mongoose');
const Trans 		= require('../models/transactions.js');
const Users 		= require('../models/users.js');
const CarMaster 	= require('../models/carmaster.js');


exports.get_report1 = (req,res,next)=>{

	Trans.find({})
		.then(transactions=>{
			console.log("transactions = ",transactions);
			getData();
			var newTransArr = [];

			async function getData(){
				var totalAmount = 0;
				for(var i=0; i<transactions.length; i++){
					// Get User Name 
					var user_id = transactions[i].user_id;
					userProfile = await getUserProfile(user_id); 
					var clientName = userProfile.firstName + " " + userProfile.lastName; 

					var car_id = transactions[i].car_id;
					carDetails = await getCarDetails(car_id); 
					var carBrand = carDetails.carBrand;
					var carModel = carDetails.carModel;
					var vehicleNumber = carDetails.vehicleNumber;


					newTransArr.push({
						type : "record",
						orderDate : transactions[i].orderDate,
						orderNum : transactions[i].orderNum,
						pickupDate : transactions[i].pickupDate,
						amount : transactions[i].amount,
						clientName : clientName,
						carBrand : carBrand,
						carModel : carModel,
						vehicleNumber : vehicleNumber,
					});

					totalAmount = totalAmount + transactions[i].amount;
					console.log("newTransArr["+i+"] = ",newTransArr[i]);
				}

				newTransArr.push({
					type : "total",
					totalRecords : transactions.length,
					totalAmount : totalAmount,
				});

				if(i === transactions.length){
					res.status(200).json({transactions : newTransArr});
				}

			}//async function ends

		})
		.catch(error=>{
			console.log("Some error occured in getting Transactins records", error);
			res.status(500).json({
				message: "Some error occured in getting Transactins records",
				error: error
			}); 
		})
}



function getUserProfile(user_id){
	return new Promise( (resolve, reject)=>{ 

			Users.findOne({_id : user_id})
				.then(userData => {
					resolve( userData.profile ) ;
				})
				.catch(error=>{
					reject(error);
				});

	});
}

function getCarDetails(car_id){
	return new Promise( (resolve, reject)=>{ 

			CarMaster.findOne({_id : car_id})
				.then(carDetails => {
					resolve( carDetails ) ;
				})
				.catch(error=>{
					reject(error);
				});

	});
}