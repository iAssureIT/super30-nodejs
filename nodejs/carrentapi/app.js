	const express 						= require ('express');
	const app 							= express();

	const morgan 						= require('morgan');// morgan call next function if problem occure
	const bodyParser 					= require('body-parser');// this package use to formate json data 
	const mongoose 						= require ('mongoose');

	const dbname 						= 'cardb';

	mongoose.connect('mongodb://localhost/'+dbname,{
		useNewUrlParser: true,
		useUnifiedTopology: true 
	})
	mongoose.promise = global.Promise;

	app.use(morgan("dev"));
	app.use('/uploads', express.static('uploads'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === "OPTIONS") {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json({});
		}
		next();
	});



	const CafeRoutes		= require("./routes/workspace.js"); 	
	const CarCategoryRoutes	= require("./routes/carcategory.js"); 	
	const CarBrandRoutes	= require("./routes/carbrand.js"); 	
	const CarModelRoutes	= require("./routes/carmodel.js"); 	
	const CarMasterRoutes	= require("./routes/carmaster.js"); 	

	app.use("/api/cafe",CafeRoutes);
	app.use("/api/carcategory",CarCategoryRoutes);
	app.use("/api/carbrand",CarBrandRoutes);
	app.use("/api/carmodel",CarModelRoutes);
	app.use("/api/carmaster",CarMasterRoutes);




	
	app.get("/",(req,res)=>{
		res.json({"message":"Welcome to CarApi Project"})
	})


	app.use((req, res, next) => {
		const error = new Error("This URL Not found");
		error.status = 404;
		next(error);
	});

	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
				error: {
					message: error.message
				}
			});
	});

	module.exports = app;