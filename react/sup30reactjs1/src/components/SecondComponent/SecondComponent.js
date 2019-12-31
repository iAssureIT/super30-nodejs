import React, {Component} from 'react';
import './SecondComponent.css';
import FirstComponent from '../FirstComponent/FirstComponent.js';

export default class SecondComponent extends Component{
	empDetails(){
		var empDetailsVar = [
								{
									name 	: "Priya",
									phone 	: "+91-9838123823",
									email 	: "priya@gmail.com",
									PAN 	: "0920192393299",
									aadhar 	: "1234 5994 9392",
									degree 	: "BE Computer Science",
									grade 	: "Manager",
									dept 	: "IT Department",
									image 	: "priya.png"
								},
								{
									name 	: "Shankar",
									phone 	: "+1-239 123 8929",
									email 	: "shankar@gmail.com",
									PAN 	: "0920192393299",
									aadhar 	: "1234 5994 9392",
									degree 	: "BE Computer Science",
									grade 	: "A",
									dept 	: "IT Department",
									image 	: "shankar.jpeg"
								},
								{
									name 	: "Jyoti",
									phone 	: "+44-239 123 8929",
									email 	: "Jyoti@gmail.com",
									PAN 	: "0920192393299",
									aadhar 	: "1234 5994 9392",
									degree 	: "BE Computer Science",
									grade 	: "A",
									dept 	: "IT Department",
									image 	: "jyoti.jpeg"
								},
								{
									name 	: "Sunita",
									phone 	: "+21-239 123 8929",
									email 	: "Sunita@gmail.com",
									PAN 	: "0920192393299",
									aadhar 	: "1234 5994 9392",
									degree 	: "BE Computer Science",
									grade 	: "A",
									dept 	: "IT Department",
									image 	: "sunita.jpeg"
								},
								{
									name 	: "Prince",
									phone 	: "+123-239 123 8929",
									email 	: "Prince@gmail.com",
									PAN 	: "0920192393299",
									aadhar 	: "1234 5994 9392",
									degree 	: "BE Computer Science",
									grade 	: "A",
									dept 	: "IT Department",
									image 	: "prince.jpg"
								},
							];

		return empDetailsVar ;
	}

	render(){
		var empDetails = this.empDetails();
		// console.log("empDetails = ",empDetails);
		return(
			<div>
				{
					empDetails.length > 0 
					?
						empDetails.map(
							(element, index)=>{
								return <FirstComponent key={index} empDetails={element}/>
							}
						)
					:
						<h1> Sorry... I don't see any Data </h1>
				}
		    	
		    </div>
		);
	}

}


/*

		    	<FirstComponent name="Shankar" 	phone="8687669280"/>
		    	<FirstComponent name="Prince" 	phone="8687669280"/>
		    	<FirstComponent name="Chandra" 	phone="8687669280"/>
		    	<FirstComponent name="Ranjan" 	phone="8687669280"/>
		    	<FirstComponent name="Sanket" 	phone="8687669280"/>			

*/