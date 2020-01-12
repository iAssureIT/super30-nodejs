import React, {Component} from 'react';
import Axios from 'axios';

import './AdmissionForm.css';


export default class AdmissionForm extends Component{

	constructor(){
		super();

		this.state = {
			firstName 	   : "---",
			middleName 	   : "xxx",
			lastName 	   : "",
			parentEmail    : "",
			parentPhone    : "",
			studentClass   : "",
			gender         : "",
			dateOfBirth    : "",
			languages      : [],
			studentAddress : "",
			studentInfo    : ""
		}

	}

	handleChange(event){
		// console.log("I am inside handleChange function");		
		var name = event.currentTarget.name;
		//console.log("name = ",name);
        
		if(name === 'languages'){
			this.state.languages.push(event.currentTarget.value);
			console.log("languages = ",this.state.languages);
		}else{
			this.setState({[name] : event.currentTarget.value});
		}
	}


	handleSubmit(event){

		var formValues = {
			firstName     : this.state.firstName,
			middleName    : this.state.middleName,
			lastName      : this.state.lastName,
			parentEmail   : this.state.parentEmail,
			parentPhone   : this.state.parentPhone,
			studentClass  : this.state.studentClass,
			gender        : this.state.gender,
			dateOfBirth   : this.state.dateOfBirth,
			languages     : this.state.languages,
			studentAddress: this.state.studentAddress,
			studentInfo   : this.state.studentInfo,
		}
		console.log("Values before Submit = ", formValues);


		Axios
			.post("http://localhost:3003/api/students/post",formValues)
			.then((response)=>{
				console.log("Student inserted successfully!", response)
			})
			.catch((error)=>{
				console.log("Some Error occured in Insert = ", error);
			})











	}

	render(){
		return(
			<section className="page col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<h3> Admission Form </h3>
				<hr/>

				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="firstName"> First Name </label>
						<input type="text" name="firstName" placeholder="Enter your First Name" 
							   onChange={this.handleChange.bind(this)}
						/>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="middleName"> Middle Name </label>
						<input type="text" name="middleName"  placeholder="Your Middle Name"
							   onChange={this.handleChange.bind(this)}
						/>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="lastName"> Last Name </label>
						<input type="text" name="lastName"  placeholder="Enter your Last Name"
							   onChange={this.handleChange.bind(this)}
						/>
					</div>
				</div>
				<div className="formrows col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="parentEmail"> Parent Email </label>
						<input type="email" name="parentEmail" placeholder="Your Parent Email" 
							   onChange={this.handleChange.bind(this)}
						/>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="parentPhone"> Parent Phone number </label>
						<input type="phone" name="parentPhone"  placeholder="Your Parent Phone number"
							   onChange={this.handleChange.bind(this)}
						/>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="studentClass"> Class </label>
						<select name="studentClass"
							   onChange={this.handleChange.bind(this)} >	
   						      <option value="1">1st</option>
						      <option value="2">2nd</option>
						      <option value="3">3rd</option>
						      <option value="4">4th</option>
						      <option value="5">5th</option>
						      <option value="6">6th</option>
						      <option value="7">7th</option>   
							  <option value="8">8th</option>
						      <option value="9">9th</option>
						      <option value="10">10th</option>		
						</select>	
					</div>
				</div>
				<div className="formrows col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="Gender"> Gender </label>						
						<input type="radio" name="gender" value="Male" 
							   onChange={this.handleChange.bind(this)}
						/>
						<label htmlFor="gender">Male</label>						
						<input type="radio" name="gender" value="Female"
						       onChange={this.handleChange.bind(this)}
					    />
					    <label htmlFor="gender">Female</label>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="dateOfBirth"> Date of Birth </label>						
						<input type="date" name="dateOfBirth" placeholder="Your Date of Birth"
							   onChange={this.handleChange.bind(this)}
						/>						
					</div>
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="languages"> Languages </label>
						<input type="checkbox" name="languages" value="Marathi"
							   onChange={this.handleChange.bind(this)}
						/>
						<label htmlFor="language">Marathi</label>
						<input type="checkbox" name="languages" value="English"
							   onChange={this.handleChange.bind(this)}
						/>
						<label htmlFor="language">English</label>
						<input type="checkbox" name="languages" value="Hindi"
							   onChange={this.handleChange.bind(this)}
						/>
						<label htmlFor="language">Hindi</label>
						<input type="checkbox" name="languages" value="French"
							   onChange={this.handleChange.bind(this)}
						/>
						<label htmlFor="language">French</label>
						<input type="checkbox" name="languages" value="German"
							   onChange={this.handleChange.bind(this)}
						/>
						<label htmlFor="language">German</label>
						<input type="checkbox" name="languages" value="Greek"
							   onChange={this.handleChange.bind(this)}
						/>
						<label htmlFor="language">Greek</label>
					</div>
				</div>	
				<div className="formrows col-lg-12 col-md-12 col-sm-12 col-xs-12">
				    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="studentAddress"> Student Address </label>
						<textarea name="studentAddress" rows="6" placeholder="Enter your Address"
							   onChange={this.handleChange.bind(this)}
						></textarea>
					</div>						
					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"> 
						<label htmlFor="studentInfo"> Student Information </label>
						<textarea name="studentInfo" rows="6" placeholder="Enter your Information"
							   onChange={this.handleChange.bind(this)}
						></textarea>
					</div>					
				</div>
				<div className="submitDiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<button className="col-lg-2 btn btn-primary pull-right"
							onClick={this.handleSubmit.bind(this)} > 
						Submit 
					</button>
				</div>
			</section>
		);
	}


}