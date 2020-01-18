const express = require('express');
const multer = require('multer');


const storage = multer.diskStorage({
	destination : function(req,file,cb){
		cb(null,'./uploads/')
	},
	filename: function(req,file,cb){
		var fileOrigName = file.originalname.split('.');
		cb(null,fileOrigName[0] + "-" + new Date().toISOString() + "." + fileOrigName[1]);
	}
})




const fileFilter = (req,file,cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		var maxlimit = 1024 * 30;
		if(file.size < maxlimit){
			cb(null,true);
		}else{
			cb(null, false);
			cb(new Error('File Size above 30 KB is not Allowed'))
		}
	}else{
		cb(null, false);
		cb(new Error('Only JPEG & PNG File Types are Allowed'))
	}
}

const maxFileSize = (req,file,cb) => {
	var maxlimit = 1024 * 10;
	if(file.size < maxlimit){
		cb(null,true);
	}else{
		cb(null, false);
		cb(new Error('File Size above 30 KB is not Allowed'))
	}
}

const upload = multer({
		storage : storage, 
		// fileFilter : fileFilter,
		limits:{
			filesize : 1024 * 30
		},
	});


exports.upload;
