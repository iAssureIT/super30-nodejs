const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();


const mongoose = require('mongoose');
const dbname = "school";
mongoose.connect("mongodb://localhost/"+dbname,{
	useNewUrlParser : true,
	useUnifiedTopology : true,
});
mongoose.promise = global.promise;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE");
		return res.status(200).json({});
	}
	next();
});


const StudentRoutes = require("./routes/students.js");
app.use(StudentRoutes);


app.get("/",(req,res)=>{
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<div style='color:#f00;width:60%;text-align:center;padding-top:75px;margin:auto;height:200px;background-color:#f6f699;margin-top:100px;'>" + 
			  "<h1> Welcome to School API Project </h1>" + 
			  "</div>");
	res.end();
});

app.use((req,res,next)=>{
	const error = new Error("This URL is NOT Found");
	error.status = 404;
	next(error);
});


app.use((error, req,res,next)=>{
	res.status(error.status || 500).json({
		error : {
			message : error.message
		}
	})
});


module.exports = app;