import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'jquery-validation';



import './Workspace.css';

export default class Workspace extends Component{

	constructor(props){
		super();
		this.state = {
			cafeName 			: "",			
			address 			: "",
			landmark 			: "",
			area 				: "",
			city 				: "",
			state 				: "",
			country 			: "",
			pincode 			: "",				
			numSeats 			: "",
			amenities 			: [],
			adminName 			: "",
			adminMobile 		: "",
			adminEmail 			: "",
			beverage			: "",
			openingTime			: "",
			closingTime			: "",
			accHolderName 		: "",
			bankName 			: "",
			accNumber 			: "",
			ifscCode 			: "",
			branch 	 			: "",
			cafeImage 			: "",
		}
	}
	componentDidMount(){
		$("#cafeForm").validate({
			rules:{
				cafeName : {
					required : true,
				}
			}
		});
	}

	handleSubmit(event){
		event.preventDefault();

		$("#cafeForm").validate({
			rules:{
				cafeName : {
					required : true,
				}
			}
		});


		console.log("this.state.cafeImage = ",this.state.cafeImage);

		var formValues = {
				"cafeName"  	: this.state.cafeName,
				"address"  		: this.state.address,
				"area"  		: this.state.area,
				"landmark"  	: this.state.landmark,
				"city"  		: this.state.city,
				"state"  		: this.state.state,
				"country"		: this.state.country,
				"pincode"  		: this.state.pincode,
				"numSeats"		: this.state.numSeats,
				"adminName"		: this.state.adminName,
				"adminMobile"	: this.state.adminMobile,
				"adminEmail" 	: this.state.adminEmail,
				"beverage" 		: this.state.beverage,
				"openingTime"	: this.state.openingTime,
				"closingTime"	: this.state.closingTime,
				"accHolderName"	: this.state.accHolderName,
				"bankName"		: this.state.bankName,
				"accNumber"		: this.state.accNumber,
				"ifscCode"		: this.state.ifscCode,
				"branch"		: this.state.branch,
				// "cafeImage"		: this.state.cafeImage,
			};	


		Axios.post("http://localhost:3003/api/cafe/post",formValues)
			.then((response)=>{
				console.log("Response from API = ", response);
				Swal.fire("Congrats!","Workspace Data Submitted Successfully");
			})
			.catch((error)=>{
				console.log("Error while inserting Form = ", error);
				Swal.fire("Oops...","Something went wrong <br/>"+error,"error");
			});
	
	}

	handleChange(event){
		var name = event.currentTarget.name;
		if(name === 'amenities'){
			this.state.amenities.push(event.currentTarget.value);
		}else{
			this.setState({[name] : event.currentTarget.value.trim() });	
		}
	}

	uploadFile(event){
		var name = event.currentTarget.name;
		var file = event.currentTarget.files[0];

		const formValues = new FormData();
		formValues.append('cafeImage', file);

		Axios.post("http://localhost:3003/api/cafe/post-image",formValues)
			.then((response)=>{
				if(response.data){
					this.setState({cafeImage : response.data.filepath});
					console.log("Response from File Upload = ", response.data);
				}
			})
			.catch((error)=>{
				console.log("Error in Image Upload = ", error);
				Swal.fire("Oops...","Something went wrong <br/>"+error,"error");
			});
	}

	deleteImage(event){		
		var formValues = {
			filepath : this.state.cafeImage
		};

		Axios.post("http://localhost:3003/api/cafe/delete-image",formValues)
			.then((response)=>{
				if(response.data){
					console.log("Response from File delete = ", response.data);
					this.setState({cafeImage : ""});	
				}
			})
			.catch((error)=>{
				console.log("Error in Image Upload = ", error);
				Swal.fire("Oops...","Something went wrong <br/>"+error,"error");
			});
	



	}

	render(){
		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

				<div className="pageTitle"> 
					Workspace Details 
				</div>				

				<form id="cafeForm"  enctype="multipart/form-data" 
					  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 workspaceForm">
					<h5><b> Basic Info </b></h5>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="cafeName"> Name of Cafe <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-coffee"> </i> </span>
									<input  type="text" className="form-control" name="cafeName" ref="cafeName" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="address"> Address  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt" aria-hidden="true"></i> </span>
									<input type="text" className="form-control" name="address" ref="address"
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="landmark"> Nearby Landmark  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt"> </i> </span>
									<input  type="text" className="form-control" name="landmark" ref="landmark" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-6 col-md-6 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="area"> Area  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt" aria-hidden="true"></i> </span>
									<input type="text" className="form-control" name="area" ref="area"
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="field col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<div className="form-group">
								<label htmlFor="city"> City  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt"> </i> </span>
									<input  type="text" className="form-control" name="city" ref="city" 
											maxLength="15" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<div className="form-group">
								<label htmlFor="area"> State  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt" aria-hidden="true"></i> </span>
									<input type="text" className="form-control" name="state" ref="state"
											maxLength="15" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<div className="form-group">
								<label htmlFor="country"> Country  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt"> </i> </span>
									<input  type="text" className="form-control" name="country" ref="country" 
											maxLength="15" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-3 col-md-3 col-sm-3 col-xs-6">
							<div className="form-group">
								<label htmlFor="pincode"> Pincode  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt" aria-hidden="true"></i> </span>
									<input type="text" className="form-control" name="pincode" ref="pincode"
											maxLength="15"
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
					</div>

					<h5><b> Work Amenities </b></h5>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="field col-lg-3 col-md-3 col-sm-3 col-xs-12">
							<div className="form-group">
								<label htmlFor="numSeats"> Number of Seats <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-chair"> </i> </span>
									<input  type="text" className="form-control" name="numSeats" ref="numSeats" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-9 col-md-9 col-sm-9 col-xs-12">
							<div className="form-group amenities">
								<label htmlFor="amenities"> Amenities  <span className="asterik">*</span></label>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="Wi-Fi" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-wifi"> </i> Wi-Fi
									</div> 
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="AC" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-fan"> </i> AC
									</div> 
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="restroom" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-restroom"> </i> Restroom
									</div> 
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="Printer" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-wifi"> </i> Printer
									</div> 
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="power" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-plug"> </i> Charger
									</div> 
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="Music" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-music"> </i> Music
									</div> 
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="notepad" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-flag"> </i> Notepad
									</div> 
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
										<input type="checkbox" name="amenities" value="Dance" 
											onChange={this.handleChange.bind(this)} 
										required/>  <i className="fa fa-flag"> </i> Dance
									</div> 
								</div>
							</div>
						</div>
					

					<h5><b> Cafe Admin Details</b></h5>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="adminName"> Name <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
									<input  type="text" className="form-control" name="adminName" ref="adminName" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="adminMobile"> Mobile <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-phone" aria-hidden="true"></i> </span>
									<input type="text" className="form-control" name="adminMobile" ref="adminMobile"
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>		
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="adminEmail"> Email  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-envelope"> </i> </span>
									<input  type="text" className="form-control" name="adminEmail" ref="adminEmail" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>					

					</div>

					<h5><b> Others</b></h5>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="beverage"> Beverage cost(in Rs.) <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-rupee-sign"> </i> </span>
									<input  type="text" className="form-control" name="beverage" ref="beverage" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="openingTime"> Opening Time <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-clock" aria-hidden="true"></i> </span>
									<input type="text" className="form-control" name="openingTime" ref="openingTime"
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>		
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="closingTime"> Closing Time  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-clock"> </i> </span>
									<input  type="text" className="form-control" name="closingTime" ref="closingTime" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>					

					</div>

					<h5><b> Banking Details</b></h5>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="accHolderName"> Account Holder Name <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-university"> </i> </span>
									<input  type="text" className="form-control" name="accHolderName" ref="accHolderName" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="bankName"> Bank Name <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-university" aria-hidden="true"></i> </span>
									<input type="text" className="form-control" name="bankName" ref="bankName"
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>		
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="accNumber"> Account Number  <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-university"> </i> </span>
									<input  type="text" className="form-control" name="accNumber" ref="accNumber" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>	
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="ifscCode"> IFSC Code<span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-university"> </i> </span>
									<input  type="text" className="form-control" name="ifscCode" ref="ifscCode" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
						<div className="field col-lg-4 col-md-4 col-sm-4 col-xs-12">
							<div className="form-group">
								<label htmlFor="branch"> Branch Name <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-map-marker-alt"> </i> </span>
									<input  type="text" className="form-control" name="branch" ref="branch" 
											maxLength="30" 
											onChange={this.handleChange.bind(this)} 
									required/>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
						{this.state.cafeImage 
						 ?
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<img className="thumbnailImg" src={"http://localhost:3003/" + this.state.cafeImage} />
								<span className="delImage" title="Delete This Image" onClick={this.deleteImage.bind(this)}> <i className="fa fa-times-circle" aria-hidden="true"></i> </span>
							</div>
						 :
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="form-group">
									<label htmlFor="cafeImage"> Upload Cafe Image <span className="asterik">*</span> </label>
									<div className="input-group">
										<span className="input-group-addon"> <i className="fa fa-image"> </i> </span>
										<input  type="file" className="form-control" name="cafeImage" ref="cafeImage" 
												onChange={this.uploadFile.bind(this)} 
										required/>
									</div>
								</div>
							</div>

						}
					</div>
					


					
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
							<input type="submit" className="btn btn-primary col-lg-4 subButton pull-right" onClick={this.handleSubmit.bind(this)} />
						</div>	

					</div>
				</form>
			</section>
		);
	}


}