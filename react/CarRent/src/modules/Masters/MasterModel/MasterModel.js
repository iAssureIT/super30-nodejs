import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';

import './MasterModel.css';

export default class MasterBrand extends Component{

	constructor(){
		super();
		this.state = {
			carBrand : "",
			carModel : "",
			allModels : [],
			allBrands : [],
			selectedBrand : "",
			action : "Insert"
		}
	}

	componentDidMount(){
		if(this.props.params.type === "model"){
			this.setState({model_id : this.props.params.id, action:"Update"});
			this.getOneCarModel(this.props.params.id);
		}
		this.getCarBrands();
		this.getCarModels();
	}

	getOneCarModel(brand_id){
		Axios.get("http://localhost:3003/api/carmodel/get/one/"+brand_id)
			.then(response => {
				if(response.data){
					console.log("getOneCarModel = ",response.data);
					this.setState({
						carModel 	 : response.data.carModelObj.model,
						selectedBrand : response.data.carModelObj.brand_id + "-" + response.data.carModelObj.brand,
					});
				}
			})
			.catch(error=>{
				console.log("Error while getting Car Brand Details", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		

	}

	getCarModels(){
		Axios.get("http://localhost:3003/api/carmodel/get/list")
			.then(response => {
				console.log("getCarModels = ", response.data);
				this.setState({allModels : response.data.carModels});
			})
			.catch(error=>{
				console.log("Error while getting list of all Car Models", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		
	}

	getCarBrands(){
		Axios.get("http://localhost:3003/api/carbrand/get/list/atoz")
			.then(response => {
				console.log("getCarBrands = ", response.data);
				this.setState({allBrands : response.data.carBrands});
			})
			.catch(error=>{
				console.log("Error while getting list of all Car Brands", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		
	}

	handleChange(event){
		var name = event.currentTarget.name;
		this.setState({ [name] : event.currentTarget.value });
	}

	handleSubmit(event){
		event.preventDefault();
		var carBrandAndId = this.state.selectedBrand.split("-");

		var formValues = {
			carBrand_id : carBrandAndId[0],
			carBrand 	: carBrandAndId[1],
			carModel 	: this.state.carModel,
			action 		: this.state.action,
			model_id 	: this.props.params.id ? this.props.params.id : "",
		}

		// console.log("formValues = ",formValues);

		Axios.post("http://localhost:3003/api/carmodel/post",formValues)
			.then(response =>{
				console.log("response = ", response.data);
				if(this.state.action === "Insert"){
					Swal.fire('Congrats!','Car Model Submitted Successfully!' , 'success');	
					this.setState({action: "Insert", carModel: "", selectedBrand:"" });
				}else{
					Swal.fire('Congrats!','Car Model Updated Successfully!' , 'success');	
					this.setState({action: "Insert", carModel: "", selectedBrand:"" });
					this.props.history.push("/master-brand-model");
				}
				this.getCarModels();
			})
			.catch(error=>{
				console.log("Error while Saving Car Brand", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});
	}

	deleteCarModel(event){
		var id = event.currentTarget.id;
		var formValues = {
			id: id
		}

		Swal.fire({
		  title: 'Are you sure you want to Delete this Record?',
		  text: 'You will not be able to recover this record after delete!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#d33',
		  cancelButtonColor: '#3085d6',
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {

			Axios.post("http://localhost:3003/api/carmodel/delete",formValues)
				.then(response =>{
					console.log("response = ", response.data);
					Swal.fire('Deleted!', 'Car Model Deleted Successfully!', 'success');
					this.getCarModels();
				})
				.catch(error=>{
					console.log("Error while Deleting Car Model", error);
					Swal.fire('Oops...', 'Something went wrong!', 'error')
				});

		  } else if (result.dismiss === Swal.DismissReason.cancel) {
		    Swal.fire(
		      'Ok Fine!',
		      'Your record is safe :)',
		      'info'
		    )
		  }
		})		
	}

	render(){
		console.log("this.state.selectedBrand = ",this.state.selectedBrand);

		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<form className="catgForm" onSubmit={this.handleSubmit.bind(this)}>
							<div className="singlefield col-lg-12 col-md-12 col-sm-12 col-xs-12">

								<div className="col-lg-4 col-lg-offset-1 col-md-4 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="selectedBrand"> Car Brand <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<select className="form-control" name="selectedBrand" ref="selectedBrand" 
													onChange={this.handleChange.bind(this)}
													value={this.state.selectedBrand}
											>
												<option> -- Select Brand -- </option>
												{
													this.state.allBrands.length > 0
													?
														this.state.allBrands.map((elem, index)=>{
															return(
																<option key={index} value={elem._id+"-"+elem.brand}> {elem.brand} </option>
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
											<input  type="text" className="form-control" name="carModel" ref="carModel" 
													maxLength="30" value={this.state.carModel}
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>

								<div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
									<div className="form-group">
										<button className="col-lg-12 btn btn-primary modelSubmit"
												onClick={this.handleSubmit.bind(this)}
										> Submit </button>
									</div>
								</div>

							</div>
						</form>


						{/* ===========  Table ============ */} 
						<div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">
							<h4> Car Models </h4>
							{this.state.allModels.length > 0
							 ?
								<table className="table table-hovered table-bordered table-stripped ">
									<thead>
										<tr className="active">
											<th> Sr No </th>
											<th> Car Brand </th>
											<th> Model </th>
											<th> Actions </th>
										</tr>
									</thead>

									<tbody>
										{this.state.allModels.map((element,index)=>{
											if(index === 0){
												var rowClass = "latestRow";
											}else{
												var rowClass = ""  ;
											}
											return(
												<tr key={index} className={rowClass}>
													<td> {index+1} </td>
													<td> {element.brand} </td>
													<td> {element.model} </td>
													<td className="text-center">  
														<a href={"/master-brand-model/model/"+element._id}> <i className="fa fa-edit"> </i> </a>
														&nbsp;&nbsp;
														<i className="fa fa-trash" id={element._id} onClick={this.deleteCarModel.bind(this)}> </i>
													</td>
												</tr>												
											)			
										  })
										}

									</tbody>
								</table>
							 :
							 	<div className="noDataMsg"> 
							 		<i className="fa fa-car"> </i> <br />
							 		Please Add Car Model 
							 	</div>
							 }
						</div>


					</div>
				</div>
				
			</section>
		);
	}


}