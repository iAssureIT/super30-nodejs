const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({extended : true}) );
app.use(bodyParser.json());

app.get("/",(req,res)=>{
	res.json({"message": "Hello World! Welcome to iAssureIT NodeJS & ReactJS API Training!"});
});

app.listen(port,()=>{
	console.log("App is running on port "+ port +". To see the app, go to http://localhost:"+port);
});