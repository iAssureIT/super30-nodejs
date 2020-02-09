import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';

import {connect} from "react-redux";


import './MasterBrand.css';

class MasterBrand extends Component{

	constructor(props){
		super(props);
		this.state = {
			carBrand : "",
			allBrands : [],
			brand_id : "",
			action : "Insert"
		}

	}

	componentDidMount(){
		// Axios.defaults.headers.common['Authorisation'] = "Bearer " + localStorage.getItem("token");

		if(this.props.params.type === "brand"){
			this.setState({brand_id : this.props.params.id, action:"Update"});
			this.getOneCarBrand(this.props.params.id);
		}
		this.getCarBrands();
	}

	getOneCarBrand(brand_id){
		const options = {
				headers :  {
								'Content-Type': 'application/json',
                            	'Authorisation': 'Bearer ' + localStorage.getItem("token"),
                        	}
              };

		Axios.get("http://localhost:3003/api/carbrand/get/one/"+brand_id, options)
			.then(response => {
				if(response.data){
					console.log("response.data = ",response.data);
					this.setState({carBrand :response.data.carBrandObj.brand});
				}
			})
			.catch(error=>{
				console.log("Error while getting Car Brand Details", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		

	}

	getCarBrands(){
		const options = {
				headers :  {
								'Content-Type': 'application/json',
                            	'Authorisation': 'Bearer ' + localStorage.getItem("token"),
                        	}
              };

		Axios.get("http://localhost:3003/api/carbrand/get/list", options)
			.then(response => {
				console.log(response.data);
				this.setState({allBrands : response.data.carBrands });
			})
			.catch(error=>{
				console.log("Error while Saving Car Brand", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		
	}

	handleChange(event){
		var name = event.currentTarget.name;
		this.setState({ [name] : event.currentTarget.value });
	}

	handleSubmit(event){
		event.preventDefault();
		var formValues = {
			carBrand : this.state.carBrand,
			action : this.state.action,
			brand_id : this.state.brand_id,
		}

		console.log("formValues = ",formValues);

		Axios.post("http://localhost:3003/api/carbrand/post",formValues)
			.then(response =>{
				console.log("response = ", response.data);
				if(this.state.action === "Insert"){
					Swal.fire('Congrats!','Car Brand Submitted Successfully!' , 'success');	
					this.props.sendActivityLog("Car Brand "+ formValues.carBrand +" Added");
				}else{
					this.props.sendActivityLog("Car Brand Updated");
					Swal.fire('Congrats!','Car Brand Updated Successfully!' , 'success');	
					this.props.history.push("/master-brand-model");
				}
				this.setState({action: "Insert", brand_id: "", carBrand:"" });
				this.getCarBrands();
			})
			.catch(error=>{
				console.log("Error while Updating Car Brand", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});
	}

	deleteCarBrand(event){
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

			Axios.post("http://localhost:3003/api/carbrand/delete",formValues)
				.then(response =>{
					console.log("response = ", response.data);
					// Swal.fire('Deleted!', 'Car Brand Deleted Successfully!', 'success');
					this.getCarBrands();
				})
				.catch(error=>{
					console.log("Error while Deleting Car Brand", error);
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

		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<form className="catgForm" onSubmit={this.handleSubmit.bind(this)}>
							<div className="singlefield col-lg-12 col-md-12 col-sm-12 col-xs-12">

								<div className="col-lg-6 col-lg-offset-3 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="carBrand"> Car Brand <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="text" className="form-control" name="carBrand" ref="carBrand" 
													maxLength="30" value={this.state.carBrand}
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>

							</div>
						</form>


						{/* ===========  Table ============ */} 
						<div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">
							<h4> Car Brands </h4>
							
							<h3> {this.props.actLog} </h3>

							{this.state.allBrands && this.state.allBrands.length > 0
							 ?
								<table className="table table-hovered table-bordered table-stripped ">
									<thead>
										<tr className="active">
											<th> Sr No </th>
											<th> Car Brand </th>
											<th> Actions </th>
										</tr>
									</thead>

									<tbody>
										{this.state.allBrands.map((element,index)=>{
											if(index === 0){
												var rowClass = "latestRow";
											}else{
												var rowClass = ""  ;
											}
											return(
												<tr key={index} className={rowClass}>
													<td> {index+1} </td>
													<td> {element.brand} </td>
													<td className="text-center">  
														<a href={"/master-brand-model/brand/"+element._id}> <i className="fa fa-edit"> </i> </a>
														&nbsp;&nbsp;
														<i className="fa fa-trash" id={element._id} onClick={this.deleteCarBrand.bind(this)}> </i>
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
							 		Please Add Car Brand 
							 	</div>
							 }
						</div>


					</div>
				</div>
				
			</section>
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		actLog : state.actLog,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendActivityLog : (aLog)=>dispatch({
			type : "SET_ACTIVITY_LOG",
			aLog : aLog,
		}),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterBrand);