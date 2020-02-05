const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "secret";

const Users = require("../models/users.js");


exports.CheckAuth = (req,res,next)=>{
	// console.log("inside CheckAuth = ", req.headers);

	if(req.headers.authorisation){
		const bearerToken = req.headers.authorisation;
		const inputToken = bearerToken.split(" ")[1];
		const data = jwt.verify(inputToken, JWT_SECRET_KEY, (err,decodedToken)=>{
			if(err){
				console.log("jwt verify error = ", err);
				res.status(401).json({
					message: "Authorisation Failed due to Invalid Token",
					error : err
				})
			}else{
				// console.log("decodedToken = ",decodedToken);
				const user_id = decodedToken.user_id; 

				Users.findOne({_id : user_id})
					.then(userData => {
						const loginTokensArr = userData.loginTokens;
						const loginTokLen = loginTokensArr.length;
						const token = loginTokensArr[loginTokLen - 1].token;
						if(inputToken === token){
							next();
						}else{
							res.status(401).json({
								message: "Authorisation Failed due to Token Not Matching",
							})						
						}
					})
					.catch(error=>{
						console.log("error while find user = ", error);
						res.status(401).json({
							message: "Authorisation Failed due to User Not Found",
							error : err						
						})
					})
			}
		} );
	}else{
		res.status(401).json({
			message: "You are not Authorised to access this url",
		})		
	}

}