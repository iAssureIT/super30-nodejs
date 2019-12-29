const express = require('express');
const app = express();

const morgan 		= require('morgan');
const bodyParser 	= require('body-parser');
const mongoose 		= require('mongoose');

const dbname = 'empdb';
mongoose.connect('mongodb://localhost/'+dbname, {useNewUrlParser: true});


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended : true}) );
app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With,Content-Type, Accept, Authorisation");
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
		return res.status(200).json({});
	}
});


console.log("Inside App.js");

const EmployeeRoutes = require('./routes/employee.js');
app.use("/",EmployeeRoutes);


app.use((req, res, next)=>{
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	res.json({
		error : {
			message : error.message
		}
	})
});

module.exports = app;