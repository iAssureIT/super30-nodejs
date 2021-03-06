import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import S3 from 'react-aws-s3';

import "./MasterCars.css";


export default class MasterCars extends Component{

	constructor(){
		super();

		this.state = {
			carCategory 		: "",
			carBrand 			: "",
			carModel 			: "",
			vehicleNumber 		: "",
			totalSeats 			: "",
			transmission 		: "",
			registrationPic 	: [],
			insurancePic 		: [],
			registrationValidityDate : "",
			insuranceValidityDate 	 : "",
			allCategories 		: [],
			allBrands 			: [],
			allModels 			: [],
			action				: "Insert",
			fileArray 			: [],
			s3config : {
			    bucketName	: 'windfaller',
			    dirName		: 'super30Batch1', /* optional */
			    region 		: 'ap-south-1',
			    accessKeyId 	: process.env.REACT_APP_ACCESSKEYID,
			    secretAccessKey	: process.env.REACT_APP_SECRETACCESSKEY,
			}
		}


			console.log("process.env.REACT_APP_ACCESSKEYID = ", process.env.REACT_APP_ACCESSKEYID);
			console.log("process.env.REACT_APP_SECRETACCESSKEY = ", process.env.REACT_APP_SECRETACCESSKEY);

	}

	componentDidMount(){
		console.log("s3config = ", this.state.s3config);

		this.getAllCategories();
		this.getAllBrands();
	}

	getAllCategories(){
		Axios.get("http://localhost:3003/api/carcategory/get/list/atoz")
			.then(categories=>{
				console.log("categories = ", categories.data);
				this.setState({allCategories : categories.data.carCategories});
			})
			.catch(error=>{
				console.log("Error while getting list of Car Categories", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		
	}

	getAllBrands(){
		Axios.get("http://localhost:3003/api/carbrand/get/list/atoz")
			.then(brands=>{
				console.log("brands = ", brands.data);
				this.setState({allBrands : brands.data.carBrands});
			})
			.catch(error=>{
				console.log("Error while getting list of Car Brands", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		
	}

	getAllModels(){
		Axios.get("http://localhost:3003/api/carmodel/get/list/atoz/"+this.state.carBrand)
			.then(models=>{
				console.log("models = ", models.data);
				this.setState({allModels : models.data.carModels});
			})
			.catch(error=>{
				console.log("Error while getting list of Car Models", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		
	}



	handleChange(event){
		var name = event.currentTarget.name;
		this.setState({ [name] : event.currentTarget.value},
					  () => {
					  	if(name === "carBrand"){
					  		this.getAllModels();
					  	}
					  }
			);
		console.log(name, " = ", event.currentTarget.value);
	}

	uploadRegstrationPic(event){
		var file = event.currentTarget.files[0];

		var formValues = new FormData();
		formValues.append("registrationPic",file);

		Axios.post("http://localhost:3003/api/carMaster/post-regimage", formValues)
			.then(response=>{
				console.log("file upload response = ", response.data);
				var fileArray = this.state.registrationPic; 
				fileArray.push(response.data.filepath);
				this.setState({registrationPic : fileArray});

				console.log("registrationPic = ",this.state.registrationPic);
			})
			.catch(error=>{
				console.log("Error while uploading file", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error');
			});		

	}

	uploadInsurancePic(event){
		var newFileName = event.currentTarget.files[0];

		const ReactS3Client = new S3(this.state.s3config);

		ReactS3Client
			.uploadFile(newFileName)
			.then(uploadeds3file => {
				console.log("uploadeds3file = ", uploadeds3file)
				var fileArray = this.state.insurancePic; 
				fileArray.push(uploadeds3file.location);
				this.setState({insurancePic : fileArray});
			})
    		.catch(err => console.error(err))
	}


	deleteInsurancePic(event){
		var fileName = event.currentTarget.id;

		const ReactS3Client = new S3(this.state.s3config);

		ReactS3Client
			.deleteFile("5CDcV9w6EAAvcz97XQfoCr.png")
			.then(deletedS3file => {
				console.log("deletedS3file = ", deletedS3file)
				var fileArray = this.state.insurancePic; 
				var filteredAry = fileArray.filter(e => e !== fileName)
				this.setState({insurancePic : filteredAry});
			})
    		.catch(err => console.error(err))
	}

	handleSubmit(event){
		event.preventDefault();

		var formValues = {
			carCategory 	: this.state.carCategory,
			carBrand 		: this.state.carBrand,
			carModel 		: this.state.carModel,
			vehicleNumber 	: this.state.vehicleNumber,
			totalSeats 		: this.state.totalSeats,
			transmission 	: this.state.transmission,
			registrationPic 		 : this.state.registrationPic,
			insurancePic 			 : this.state.insurancePic,
			registrationValidityDate : this.state.registrationValidityDate,
			insuranceValidityDate 	 : this.state.insuranceValidityDate,
			action 					 : this.state.action,
		}

		Axios.post("http://localhost:3003/api/carmaster/post",formValues)
			.then(response =>{
				Swal.fire('Congrats!', 'Car Details Saved Successfully', 'success')	;
			})
			.catch(error=>{
				console.log("Error while saving car Master", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		

	}

	delImage(event){		
		var formValues = {
			filepath : event.currentTarget.id
		}

		Axios.post("http://localhost:3003/api/carmaster/delimage",formValues)
			.then(response =>{
				var i = this.state.registrationPic.indexOf(formValues.filepath);
				var fileArray = this.state.registrationPic;
				fileArray.splice(i,1);

				this.setState({
					registrationPic : fileArray
				})
			})
			.catch(error=>{
				console.log("Error while deleting image", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		

	}


	render(){

		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

				<div className="pageTitle"> 
					Car Master
				</div>				

				<form className="masterCarsForm" >
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="carCategory"> Car Category <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
									<select className="form-control" name="carCategory" ref="carCategory" 
											onChange={this.handleChange.bind(this)}
											value={this.state.carCategory}
									>
										<option> -- Select Category -- </option>
										{
											this.state.allCategories.length > 0
											?
												this.state.allCategories.map((elem, index)=>{
													return(
														<option key={index} value={elem._id+"-"+elem.carCategory}> {elem.carCategory} </option>
													)

												})
											:
												null
										}

									</select>
								</div>
							</div>
						</div>						

						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="carBrand"> Car Brand <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
									<select className="form-control" name="carBrand" 
											onChange={this.handleChange.bind(this)}
											value={this.state.carBrand}
									>
										<option> -- Select Brand -- </option>
										{
											this.state.allBrands.length > 0
											?
												this.state.allBrands.map((elem, index)=>{
													return(
														<option key={index}> {elem.brand} </option>
													)

												})
											:
												null
										}

									</select>
								</div>
							</div>
						</div>						
						
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="carModel"> Car Model <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
									<select className="form-control" name="carModel"
											onChange={this.handleChange.bind(this)}
											value={this.state.carModel}
									>
										<option> -- Select Model -- </option>
										{
											this.state.allModels.length > 0
											?
												this.state.allModels.map((elem, index)=>{
													return(
														<option key={index} > {elem.model} </option>
													)

												})
											:
												null
										}

									</select>
								</div>
							</div>
						</div>						
						
					</div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="vehicleNumber"> Vehicle Number <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
									<input type="text" className="form-control" name="vehicleNumber" 
											onChange={this.handleChange.bind(this)}
									/>
								</div>
							</div>
						</div>						

						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="totalSeats"> Total Seats <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
									<input type="text"  className="form-control" name="totalSeats" 
											onChange={this.handleChange.bind(this)}
									/>
								</div>
							</div>
						</div>						

						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="transmission"> Transmission <span className="asterik">*</span> </label>
								<div className="input-group">
									<label> 
										<input type="radio" name="transmission" value="automatic" 
												onChange={this.handleChange.bind(this)}
										/> 
										Automatic &nbsp;&nbsp;&nbsp;&nbsp;
									</label>
									<label>	
										<input type="radio" name="transmission" value="manual" 
												onChange={this.handleChange.bind(this)}
										/>
										Manual 
									</label>
								</div>
							</div>
						</div>						
												
					</div>


					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="registrationValidityDate"> Registration Valid Upto <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-calendar"> </i> </span>
									<input type="date" className="form-control" name="registrationValidityDate" 
											onChange={this.handleChange.bind(this)}
									/> 
								</div>
							</div>
						</div>						

						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="registrationPic"> Registration Card <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
									<input type="file" className="form-control" name="registrationPic" 
											onChange={this.uploadRegstrationPic.bind(this)}
									/>
								</div>
							</div>
						</div>						
						
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							{
								this.state.registrationPic.length > 0 
								?
									this.state.registrationPic.map( (elem,index)=>{
										return(
											<div key={index}>
												<img src={"http://localhost:3003/"+elem} alt="" className="regPic"/>
												<div className="delImage" title="Delete This Image" 
													id={elem}
													onClick={this.delImage.bind(this)}
												> &times; </div> 
											</div>	
										)
									} )
								:
									null
							}
						</div>						
						
					</div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="insuranceValidityDate"> Insurance Valid Upto <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-calendar"> </i> </span>
									<input type="date" className="form-control" name="insuranceValidityDate" 
											onChange={this.handleChange.bind(this)}
									/> 
								</div>
							</div>
						</div>						

						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								<label htmlFor="insurancePic"> Insurance Proof <span className="asterik">*</span> </label>
								<div className="input-group">
									<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
									<input type="file" multiple="multiple" className="form-control" name="insurancePic" 
											onChange={this.uploadInsurancePic.bind(this)}
									/>
								</div>
							</div>
						</div>						
						
						<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
							<div className="form-group">
								{
									this.state.insurancePic && this.state.insurancePic.length>0
									?
										this.state.insurancePic.map( (elem,index)=>{
											return(
												<div key={index} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
													<img src={elem} alt="" className="regPic"/>
													<div className="delImage" title="Delete This Image" 
														id={elem}
														onClick={this.deleteInsurancePic.bind(this)}
													> &times; </div> 
												</div>
											)
										} )	
									:
										null
								}
							</div>
						</div>						
						
					</div>

					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<button className="btn btn-primary col-lg-2 pull-right" 
								onClick={this.handleSubmit.bind(this)}> 
								Submit 
						</button>
					</div>


				</form>
			</section>
		);
	}


}