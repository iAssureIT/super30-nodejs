import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import './EmployeeForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



export default class Employeeform extends Component{

	constructor(){
		super();
		this.state = {
			err_firstName 	: "",
			err_middleName 	: "",
			err_lastName 	: "",
			err_dob 		: "",
		}
	}

	static getDerivedStateFromProps(props, state){
		return null;
	}

	componentDidMount(){
	}


	handleSubmit(event){
		event.preventDefault();
		var submit = true;
		//===== Validation before Submit =====
		if(!this.refs.firstName.value.length){
			this.setState({["err_"+this.refs.firstName.name]:"This field is required"});
			submit = false;
		}

		if(!this.refs.lastName.value.length){
			this.setState({["err_"+this.refs.lastName.name]:"This field is required"});
			submit = false;
		}


		if(submit){
			var formValues = {
				"fName"  : this.refs.firstName.value,
				"lName"  : this.refs.lastName.value,
			};		
			console.log("formValues = ",formValues);


			Axios
				.post("http://localhost:3003/api/employee/post",formValues)
				.then((response)=>{
					console.log("Response from API = ", response);
					Swal.fire("Congrats!","Employee Data Submitted Successfully");
					this.refs.firstName.value = "" ;
					this.refs.lastName.value = "" ;
					this.refs.middleName.value = "" ;

					//redirect to emplist 
					this.props.history.push("/emplist");

				})
				.catch((error)=>{
					console.log("Error while inserting Form = ", error);
					Swal.fire("Oops...","Something went wrong <br/>"+error,"error");
				});




		}

	}




	dateChange(event){
		var value = event.currentTarget.value;
		console.log("value = ",value);
	}
	onlyAlpha(event){
		/* 
			KeyCode 8 = BaackSpace
			KeyCode 9 = Tab
			KeyCode 32 = Space
			KeyCode 37 = Left Key
			KeyCode 39 = Right Key
			KeyCode 46 = Delete
		*/
		var keycode = event.which || event.keyCode;
		var value = event.currentTarget.value;
		console.log("value = ",value);
		console.log("charCode = ",event.keyCode);
		if(	(keycode >= 65 && keycode <= 90) ||
			(keycode === 8 || keycode === 9 || keycode === 37 || keycode === 39 || keycode === 46) ){
			return true;
		}else{
			event.preventDefault();
			return false;
		}
	}

	required(event){
		event.preventDefault();
		var value = event.currentTarget.value.trim();
		var name = event.currentTarget.name;
		if(!value.length){
			this.setState({["err_"+name]:"This field is required"});
		}else{
			this.setState({["err_"+name]:""});
		}
	}


	isEmail(event){
		var value = event.currentTarget.value;
		var name = event.currentTarget.name;
		var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ;
		
		if(! value.length){
			this.setState({["err_"+name]:"This field is required"});
		}else if(!isEmail){
			this.setState({["err_"+name]:"Email Format is Wrong"});
		}else{
			this.setState({["err_"+name]:""});
		}
	}

	isPhoneNumber(event){
		var phone = event.currentTarget.value;
		//Filter only numbers from the input
		let cleaned = ('' + phone).replace(/\D/g, '');

		console.log("phone = ", cleaned);

		//Check if the input is of correct
		let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

		if (match) {
		//Remove the matched extension code
		//Change this to format for any country code.
		let intlCode = (match[1] ? '+1 ' : '')
		return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
		}		  
		return null;
	}

	selectChange(event){
		var value = event.currentTarget.value;
		console.log("value = ",value);		
	}


	render(){
		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div className="pageTitle col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
						Employee form 
					</div>
				</div>
				<form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 empform">

					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="firstName"> First Name <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input  type="text" className="form-control" name="firstName" ref="firstName" 
											maxLength="20"
											onKeyDown={this.onlyAlpha.bind(this)}
											onBlur={this.required.bind(this)}
									/>
								</div>
								{this.state.err_firstName
								 ?
									<span className="errMsg"> {this.state.err_firstName} </span>
								 :
								 	null
								 }
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="middleName"> Middle Name </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="middleName" ref="middleName"
										onKeyDown={this.onlyAlpha.bind(this)}
										onBlur={this.required.bind(this)}/>
								</div>
								{this.state.err_middleName
								 ?
									<span className="errMsg"> {this.state.err_middleName} </span>
								 :
								 	null
								 }
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="lastName"> Last Name </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="lastName" ref="lastName"
										onKeyDown={this.onlyAlpha.bind(this)}
										onBlur={this.required.bind(this)}/>
								</div>
								{this.state.err_lastName
								 ?
									<span className="errMsg"> {this.state.err_lastName} </span>
								 :
								 	null
								 }
							</div>
						</div>
					</div>

					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="dob"> DoB </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input  type="date" className="form-control" name="dob" ref="dob" 
											onChange={this.dateChange.bind(this)}
											onBlur={this.required.bind(this)}
									/>
								</div>
								{this.state.err_dob
								 ?
									<span className="errMsg"> {this.state.err_dob} </span>
								 :
								 	null
								 }
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="email"> Email </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input  type="email" className="form-control" name="email" ref="email"
											onBlur={this.isEmail.bind(this)}
									/>
								</div>
								{this.state.err_email
								 ?
									<span className="errMsg"> {this.state.err_email} </span>
								 :
								 	null
								 }
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="phone"> Phone </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="phone" ref="phone"
											onBlur={this.isPhoneNumber.bind(this)}
									/>
								</div>
							</div>
						</div>
					</div>


					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="heducation"> Highest Education </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<select className="form-control" name="heducation" ref="heducation"
											onChange={this.selectChange.bind(this)}
									>
										<option> 10th </option>
										<option> 12th </option>
										<option> Diploma </option>
										<option> Bachelors Degree </option>
										<option> Masters Degree </option>
										<option> PhD </option>
									</select>
								</div>
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="gender"> Gender </label> <br />
								<input type="radio"  name="gender" ref="gender"/> Male  &nbsp;&nbsp;&nbsp;&nbsp;
								<input type="radio" name="gender" ref="gender"/> Female 
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="gender"> Pincode </label> <br />
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="number" className="form-control"  name="pincode" ref="pincode"/>
								</div>
							</div>
						</div>
					</div>
					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="lastName"> Languages </label>  <br />
								<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-6">
									<input type="checkbox" name="Marathi" ref="Marathi"/> Marathi  <br />
									<input type="checkbox" name="Hindi" ref="Hindi"/> 	   Hindi    <br />
									<input type="checkbox" name="English" ref="English"/> English  <br />
								</div>
								<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-6">
									<input type="checkbox" name="Gujrati" ref="Gujrati"/> Gujrati  <br />
									<input type="checkbox" name="Punjabi" ref="Punjabi"/> Punjabi  <br />
									<input type="checkbox" name="Kannada" ref="Kannada"/> Kannada  <br />
								</div>
							</div>
						</div>

						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
							<button className="btn btn-primary col-lg-4 subButton pull-right" onClick={this.handleSubmit.bind(this)}> Submit {/* <span className="lg-hidden"> <Loader /> </span> */}</button>
						</div>					

					</div>





				</form>

			</section>
		);

	}


}