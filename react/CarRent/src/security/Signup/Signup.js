import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';
import $ from 'jquery';
import Loader from 'react-loader-spinner';

import './Signup.css';

export default class Signup extends Component{

	constructor(props){
		super(props);
		this.state = {
			firstName : "",
			lastName : "",
			email : "",
			phone : "",
			password : "",
			confPassword : "",
		}

	}

	componentDidMount(){
	}

	handleChange(event){
		var name = event.currentTarget.name;
		this.setState({ [name] : event.currentTarget.value});
	}

	handleSubmit(event){
		event.preventDefault();

		var formValues = {
			firstName 	: this.state.firstName,
			lastName 	: this.state.lastName,
			email 		: this.state.email,
			phone 		: this.state.phone,
			password 	: this.state.password,
		};

		Axios.post("http://localhost:3003/api/users/post/signup",formValues)
			.then(response =>{ 
				Swal.fire("Congrats!", "Your account has been created","success");
				this.props.history.push("/login");
			})
			.catch( error => {
				console.log("Error occured during Signup", error);
				Swal.fire("Oops...","Something is wrong! <br/>"+ error, "error")
			})

	}

	render(){
		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="pageTitle"> 
					Signup
				</div>				

				<div className="signupWrapper">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<form className="signupForm col-lg-6 col-lg-offset-3">
								<h4>Create New Account</h4> 
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="firstName"> First Name <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="text" className="form-control" name="firstName" ref="carBrand" 
													maxLength="30" 
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="lastName"> Last Name <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="text" className="form-control" name="lastName" ref="carBrand" 
													maxLength="30" 
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>


								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="email"> Email <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="email" className="form-control" name="email"
													maxLength="30" 
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="phone"> Phone <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="phone" className="form-control" name="phone"
													maxLength="30" 
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>

								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="password"> Password <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="password" className="form-control" name="password" 
													maxLength="30" 
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="confPassword"> Confirm Password <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="password" className="form-control" name="confPassword" 
													maxLength="30" 
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>


								<div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
									<button className="btn btn-primary center-block"
											onClick={this.handleSubmit.bind(this)}
									> 
										Signup 
									</button>
								</div>



							</form>
						</div>
					</div>
				</div>				
			</section>
		);
	}


}