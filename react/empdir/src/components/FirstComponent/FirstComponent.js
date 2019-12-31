import React from 'react';
import "./FirstComponent.css";

function FirstComponent(props){
	// console.log("props = ",props);
	var mngBg = "";
	props.empDetails.grade === "Manager" ? mngBg="mngBg" : mngBg="";

	return (
		<div className={"block "+mngBg} >  
			<img src={"images/"+props.empDetails.image} className="userPic" alt={props.empDetails.image}/>
			<div className="leftBox">
				<div className="empAttr"> Name: {props.empDetails.name} </div>
				<div className="empAttr"> Phone: {props.empDetails.phone} </div>
				<div className="empAttr"> Email: {props.empDetails.email} </div>
			</div>
			<div className="rightBox">
				<div className="empAttr"> Grade: 	{props.empDetails.grade} </div>
				<div className="empAttr"> Dept: 	{props.empDetails.dept} </div>
				<div className="empAttr"> Degree: 	{props.empDetails.degree} </div>
			</div>
		</div>
	);
}


export default FirstComponent;