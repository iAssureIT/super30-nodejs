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
			submit : true,
			err_firstName 	: "",
			err_middleName 	: "",
			err_lastName 	: "",
			err_dob 		: "",
			buttonText 		: "Submit",
			firstName		: "",
			middleName		: "",
			lastName		: "",
			dob 			: "",
			email 			: "",
			phone 			: "",
			pincode 		: 0,
			heducation 	    : "",
			gender 			: "",
			languages 		: [],
			empid 			: ""
		}
	}

	componentDidMount(){
		var empid = this.props.match.params.empid;
		this.setState({empid : empid});

		if(empid){
			this.setState({buttonText : "Update"});

			// Fetch the Employee Data using empid. 
			Axios.get("http://localhost:3003/api/employee/get/"+empid)
				.then(empdata=>{
					var emp = empdata.data.employee; 
					console.log("emp.pincode = ",emp.pincode);

					this.setState({
						firstName : emp.fName,
						middleName : emp.mName,
						lastName : emp.lName,
						dob   : emp.dob,
						email : emp.email,
						phone : emp.phone,
						pincode : emp.pincode,
						heducation : emp.highestEdu,
						gender : emp.gender,
						languages : emp.languages,
					});
				})
				.catch((error)=>{
					console.log("Error while getting EmpData = ", error);
					Swal.fire("Oops...","Something went wrong <br/>"+error,"error");
				});

		}else{
			this.setState({buttonText : "Submit"});
		}
	}




	arrayRemove(arr, value) {

	   return arr.filter(function(ele){
	       return ele != value;
	   });
	}

	selectLang(event){

		var value = event.currentTarget.value;
		var checked = event.currentTarget.checked;
		var selectedLangs = [] ;

		console.log(value , " | checked = ", checked);

		if(checked){
			selectedLangs.push(value);
			this.state.languages.push(value);
			// console.log("selectedLangs = ",selectedLangs);
			this.setState({languages : [...this.state.languages]},()=>{
				console.log("this.state.languages = ",this.state.languages);
			});

		}else{
			var result = this.arrayRemove(this.state.languages, value);
			console.log("result = ",result);
			this.setState({languages : result},()=>{console.log("this.state.languages = ",this.state.languages);});
		}
	}
	static getDerivedStateFromProps(props, state){
		return null;
	}
	handleSubmit(event){
		event.preventDefault();
		var submit = true;


		console.log("state values = ",this.state);

		//===== Validation before Submit =====

		// this.requiredOnSubmit(formValues.fName,"firstName");
		// this.requiredOnSubmit(formValues.mName,"middleName");
		// this.requiredOnSubmit(formValues.lName,"lastName");
		// this.requiredOnSubmit(formValues.dob,"dob");
		// this.requiredOnSubmit(formValues.email,"email");
		// this.requiredOnSubmit(formValues.phone,"phone");
		// this.requiredOnSubmit(formValues.heducation,"heducation");
		// this.requiredOnSubmit(formValues.pincode,"pincode");
		


		if(!this.state.firstName.length){
			this.setState({["err_firstName"]:"This field is required"});
			submit = false;
		}
		if(!this.state.middleName.length){
			this.setState({["err_middleName"]:"This field is required"});
			submit = false;
		}
		if(!this.state.lastName.length){
			this.setState({["err_lastName"]:"This field is required"});
			submit = false;
		}
		if(!this.state.dob.length){
			this.setState({["err_dob"]:"This field is required"});
			submit = false;
		}
		if(!this.state.email.length){
			this.setState({["err_email"]:"This field is required"});
			submit = false;
		}
		if(!this.state.phone.length){
			this.setState({["err_phone"]:"This field is required"});
			submit = false;
		}

		if(this.state.pincode === 0 ){
			this.setState({["err_pincode"]:"This field is is required"});
			submit = false;
		}
		if(!this.state.heducation.length){
			this.setState({["err_heducation"]:"This field is required"});
			submit = false;
		}
		if(!this.state.gender.length){
			this.setState({["err_gender"]:"This field is required"});
			submit = false;
		}else{
			this.setState({["err_gender"]:""});			
		}
		if(!this.state.languages.length){
			this.setState({["err_languages"]:"This field is required"});
			submit = false;
		}else{
			this.setState({["err_languages"]:""});			
		}


		if(submit && this.state.submit){
			var formValues = {
				"fName"  	: this.state.firstName.trim(),
				"mName"  	: this.state.middleName.trim(),
				"lName"  	: this.state.lastName.trim(),
				"dob"  		: this.state.dob.trim(),
				"email"  	: this.state.email.trim(),
				"phone"  	: this.state.phone.trim(),
				"heducation": this.state.heducation.trim(),
				"pincode"  	: this.state.pincode,
				"gender"	: this.state.gender,
				"languages"	: this.state.languages,
				"type"		: this.state.buttonText,
				"empid" 	: this.state.empid,
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
		if(	(keycode >= 65 && keycode <= 90) ||
			(keycode === 8 || keycode === 9 || keycode === 37 || keycode === 39 || keycode === 46) ){
			return true;
		}else{
			event.preventDefault();
			return false;
		}
	}

	requiredOnSubmit(val,name){
		console.log("testing ", name);
		if(val.length === 0){
			this.setState({["err_"+name]:"This field is required"});
			this.setState({submit : false});
		}else{
			this.setState({["err_"+name]:""});
		}
		return;
	}

	required(event){
		event.preventDefault();
		var value = event.currentTarget.value.trim();
		var name = event.currentTarget.name;
		if(!value.length){
			this.setState({["err_"+name]:"This field is required",submit:false});
		}else{
			this.setState({["err_"+name]:"",submit:true});
		}
	}


	isEmail(event){
		var value = event.currentTarget.value;
		var name = event.currentTarget.name;
		var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ;
		
		if(! value.length){
			this.setState({["err_"+name]:"This field is required"});
		}else if(!isEmail){
			this.setState({["err_"+name]:"Email Format is Wrong",submit:false});
		}else{
			this.setState({["err_"+name]:"",submit:true});
		}
	}

	isPhoneNumber(event){
		var phone = event.currentTarget.value;
		var name = event.currentTarget.name;

		if(phone.length === 0){
			this.setState({["err_"+name]:"This field is required"});
		}else if(phone.length > 0 && phone.length < 10){
			this.setState({["err_"+name]:"Phone Number must be 10 digits",submit:false});
		}else{
			this.setState({["err_"+name]:"",submit:true});
		}
	}


	pincodeValid(event){
		var pincode = event.currentTarget.value.trim();
		var name = event.currentTarget.name;

		if(pincode < 100000 || pincode > 999999){
			this.setState({["err_"+name]:"Pincode must be 6 digits",submit:false});
		}else{
			this.setState({["err_"+name]:"",submit:true});
		}
	}
	mustSelect(event){
		var highestEdu = event.currentTarget.value.trim();
		var name = event.currentTarget.name;
		console.log("highestEdu = ", highestEdu);

		if(highestEdu === ""){
			this.setState({["err_"+name]:"Please Select Highest Education"});
		}else{
			this.setState({["err_"+name]:""});
		}
	}

	selectGender(event){
		var value = event.currentTarget.value;
		this.setState({gender : value});
	}

	handleChange(event){
		var value = event.currentTarget.value;
		var name =  event.currentTarget.name;
		this.setState({ [name] : value});
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
											maxLength="20" defaultValue={this.state.firstName}
											onKeyDown={this.onlyAlpha.bind(this)}
											onBlur={this.required.bind(this)}
											onChange={this.handleChange.bind(this)}
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
								<label htmlFor="middleName"> Middle Name  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="middleName" ref="middleName"
									 	defaultValue={this.state.middleName}
										onKeyDown={this.onlyAlpha.bind(this)}
										onBlur={this.required.bind(this)}
										onChange={this.handleChange.bind(this)}
									/>
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
								<label htmlFor="lastName"> Last Name  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="lastName" ref="lastName"
									 	defaultValue={this.state.lastName}
										onKeyDown={this.onlyAlpha.bind(this)}
										onBlur={this.required.bind(this)}
										onChange={this.handleChange.bind(this)}
									/>
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
								<label htmlFor="dob"> DoB  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input  type="date" className="form-control" name="dob" ref="dob" 
											defaultValue={this.state.dob}
											onChange={this.handleChange.bind(this)}
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
								<label htmlFor="email"> Email  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input  type="email" className="form-control" name="email" ref="email"
									 		defaultValue={this.state.email}
											onBlur={this.isEmail.bind(this)}
											onChange={this.handleChange.bind(this)}											
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
								<label htmlFor="phone"> Phone  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" maxLength="10" className="form-control" name="phone" ref="phone"
											defaultValue={this.state.phone}
											onBlur={this.isPhoneNumber.bind(this)}
											onChange={this.handleChange.bind(this)}											
									/>
								</div>
								{this.state.err_phone
								 ?
									<span className="errMsg"> {this.state.err_phone} </span>
								 :
								 	null
								 }

							</div>
						</div>
					</div>


					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="heducation"> Highest Education<span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<select className="form-control" name="heducation" ref="heducation"
											value={this.state.heducation}
											onBlur={this.mustSelect.bind(this)}
											onChange={this.handleChange.bind(this)}
									>
										<option disabled value=""> -- Select -- </option>
										<option> 10th </option>
										<option> 12th </option>
										<option> Diploma </option>
										<option> Bachelors Degree </option>
										<option> Masters Degree </option>
										<option> PhD </option>
									</select>
								</div>
								{this.state.err_heducation
								 ?
									<span className="errMsg"> {this.state.err_heducation} </span>
								 :
								 	null
								 }



							</div>
						</div>
						
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="gender"> Gender  <span className="asterik">*</span> </label> <br />
								<input type="radio" name="gender" ref="gender" value="M" 
									   checked={this.state.gender === "M" ? "checked" : false}
									   onChange={this.selectGender.bind(this)}
								/> Male  &nbsp;&nbsp;&nbsp;&nbsp;
								<input type="radio" name="gender" ref="gender"  value="F" 
									   checked={this.state.gender === "F" ? "checked" : false}
 									   onChange={this.selectGender.bind(this)}
								/> Female 
							</div>
								{this.state.err_gender
								 ?
									<span className="errMsg"> {this.state.err_gender} </span>
								 :
								 	null
								 }								

						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="gender"> Pincode {this.state.pincode} <span className="asterik">*</span> </label> <br />
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="number" min="100000" max="999999" className="form-control"  
										   name="pincode" ref="pincode"
									 	   value={this.state.pincode}
										   onBlur={this.pincodeValid.bind(this)}
										   onChange={this.handleChange.bind(this)}
									/>
								</div>
								{this.state.err_pincode
								 ?
									<span className="errMsg"> {this.state.err_pincode} </span>
								 :
								 	null
								 }								
							</div>
						</div>
					</div>
					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="lastName"> Languages  <span className="asterik">*</span> </label>  <br />
								<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-6">
									<input type="checkbox" name="language" ref="language" value="Marathi" 
										   checked={this.state.languages.includes("Marathi") ? "checked" : ""}
										   onChange={this.selectLang.bind(this)}
									/> Marathi  <br />
									<input type="checkbox" name="language" ref="language" value="Hindi"
										   checked={this.state.languages.includes("Hindi") ? "checked" : false}
										   onChange={this.selectLang.bind(this)}
									/> Hindi    <br />
									<input type="checkbox" name="language" ref="language" value="English"
										   checked={this.state.languages.includes("English") ? "checked" : false}
										   onChange={this.selectLang.bind(this)}
									/> English  <br />
								</div>
								<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-6">
									<input type="checkbox" name="language" ref="language" value="Marwadi" 
										   checked={this.state.languages.includes("Marwadi") ? "checked" : false}
										   onChange={this.selectLang.bind(this)}
									/> Marwadi  <br />
									<input type="checkbox" name="language" ref="language" value="Bhojpuri"
										   checked={this.state.languages.includes("Bhojpuri") ? "checked" : false}
										   onChange={this.selectLang.bind(this)}
									/> Bhojpuri    <br />
									<input type="checkbox" name="language" ref="language" value="Sanskrit"
										   checked={this.state.languages.includes("Sanskrit") ? "checked" : false}
										   onChange={this.selectLang.bind(this)}
									/> Sanskrit  <br />
								</div>
							</div>

							{this.state.err_languages
							 ?
								<span className="errMsg"> {this.state.err_languages} </span>
							 :
							 	null
							 }								

						</div>

						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
							<button className="btn btn-primary col-lg-4 subButton pull-right" onClick={this.handleSubmit.bind(this)}> {this.state.buttonText} </button>
						</div>					

					</div>





				</form>

			</section>
		);

	}


}