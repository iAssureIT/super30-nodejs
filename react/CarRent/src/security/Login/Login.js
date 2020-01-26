import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';
import $ from 'jquery';
import Loader from 'react-loader-spinner';

import './Login.css';

export default class Login extends Component{

	constructor(props){
		super(props);
		this.state = {
			userid : "",
			password : "",
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
			userid 	    : this.state.userid,
			password 	: this.state.password,
		};

		Axios.post("http://localhost:3003/api/users/post/login",formValues)
			.then(response =>{ 
                if(response.data.message === "Successfully Logged In"){
                    Swal.fire("Welcome",response.data.token,"success");
                    this.props.history.push("/");
                }else{
                    Swal.fire(response.data.message,"","error");
                }
			})
			.catch( error => {
				console.log("Error occured in Login", error);
				Swal.fire("Oops...","Something is wrong! <br/>"+ error, "error")
			})

	}

	render(){
		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="pageTitle"> 
					Login
				</div>				

				<div className="loginWrapper">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<form className="loginForm col-lg-6 col-lg-offset-3">
								<h4>Login</h4> 

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="form-group">
										<label htmlFor="userid"> UserId <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="email" className="form-control" name="userid"
													placeholder="Enter Your Email"
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>

								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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


								<div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
									<button className="btn btn-primary col-lg-4 col-lg-offset-4"
											onClick={this.handleSubmit.bind(this)}
									> 
										Login
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