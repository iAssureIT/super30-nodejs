import React, {Component} from 'react';
import EmpList from './EmpList.js';

import "./Empform.css";

// import '../../node_modules/jquery/dist/jquery.min.js';
// import $ from "jquery";

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';

export default class Empform extends Component{
	constructor(){
		super();
		this.state = {
			tempGender : "",
			formValues : [],
		}
	}

	handleSubmit(event){
		event.preventDefault();

		var formValuesObj = {
			firstName 	: this.refs.firstName.value,
			lastName 	: this.refs.lastName.value,
			mobile 		: this.refs.mobile.value,
			email 		: this.refs.email.value,
			dob 		: this.refs.dob.value,
			gender 		: this.state.tempGender,
		};

		this.state.formValues.push(formValuesObj);
		console.log("this.state.formValues = ", this.state.formValues);

	}

	handleRadio(event){
		event.preventDefault();
		var genderValue = event.target.value;
		this.setState({tempGender : genderValue});
	}

	render(){
		console.log("Empform Array = ", this.state.formValues);

		return(
			<div>
				<section className="formSection"> 
				    <h1> Employee Form </h1>
		      		<hr />
				    <form className="empForm col-lg-9">
				        <div className="field">
				          <label htmlFor="firstName"> First Name </label>
				          <input type="text" name="firstName" ref="firstName"/>
				        </div>
				        <div className="field">
				          <label htmlFor="lastName"> Last Name </label>
				          <input type="text" name="lastName" ref="lastName"/>
				        </div>

				        <div className="field">
				          <label htmlFor="mobile"> Mobile </label>
				          <input type="text" name="mobile" ref="mobile" />
				        </div>
				        <div className="field">
				          <label htmlFor="email"> Email </label>
				          <input type="text" name="email" ref="email" />
				        </div>

				        <div className="field">
				          <label htmlFor="dob"> DoB </label>
				          <input type="date" name="dob" ref="dob" />
				        </div>
				        <div className="field">
				          <label> Gender </label><br/>
				          <div className="field2"> <input type="radio" name="gender" ref="gender" value="male" onChange={this.handleRadio.bind(this)} checked={this.state.tempGender === "male"}/> <span> Male </span>  </div>
				          <div className="field2"> <input type="radio" name="gender" ref="gender" value="female" onChange={this.handleRadio.bind(this)} checked={this.state.tempGender === "female"}/> <span> Female </span> </div>
				        </div>
				        <button onClick={this.handleSubmit.bind(this)}> Submit </button>
				    </form>
				</section>

			</div>

		);
	}

}



/*
				<section className="listSection"> 
					{this.state.formValues.length > 0
					 ?
					 this.state.formValues.map((empData,index)=>{
					 	return(
					 		<EmpList key={empData.firstName} empData={empData}/>
					 	)
					 })
					 :
					 	null
					}
				</section>
*/