import React, {Component} from 'react';

import './EmployeeForm.css';
// import $ from 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loader from '../common/Loader/Loader.js';




export default class EmployeeForm extends Component{

	handleSubmit(event){
		event.preventDefault();

		var formValues = {
			"firstName" : this.refs.firstName.value,
			"middleName" : this.refs.middleName.value,
			"lastName" : this.refs.lastName.value,
		};

		// event.currentTarget.setAttribute("disabled","disabled");
		event.currentTarget.innerHTML = "Submit <Loader />";
		console.log("formValues = ",formValues);
	}

	render(){
		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12 page">
				<div className="row">
					<div className="pageTitle col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
						Employee Form 
					</div>
				</div>
				<form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 empForm">

					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="firstName"> First Name </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="firstName" ref="firstName"/>
								</div>
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="middleName"> Middle Name </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="middleName" ref="middleName"/>
								</div>
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="lastName"> Last Name </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input type="text" className="form-control" name="lastName" ref="lastName"/>
								</div>
							</div>
						</div>

					</div>


					<div className="formRow col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="btn btn-primary pull-right col-lg-2 subButton" onClick={this.handleSubmit.bind(this)}> Submit {/* <span className="lg-hidden"> <Loader /> </span> */}</button>
					</div>					

				</form>

			</section>
		);

	}


}