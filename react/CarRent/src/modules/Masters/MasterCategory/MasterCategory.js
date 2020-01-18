import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';

import './MasterCategory.css';

export default class MasterCategory extends Component{

	constructor(){
		super();
		this.state = {
			carCategory : "",
			allCategories : [],
			catg_id : "",
			action : "Insert"
		}
	}

	componentDidMount(){
		var catg_id = this.props.match.params.catg_id;
		console.log("catg_id = ",catg_id);
		if(catg_id){
			this.setState({catg_id : catg_id, action:"Update"});
			this.getOneCarCategory(catg_id);
		}

		this.getCarCategories();
	}

	getOneCarCategory(catg_id){

		Axios.get("http://localhost:3003/api/carcategory/get/one/"+catg_id)
			.then(response => {
				if(response.data){
					console.log("response.data = ",response.data);
					this.setState({carCategory :response.data.carCategoryObj.carCategory});
				}
			})
			.catch(error=>{
				console.log("Error while getting Car Category Details", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});		

	}

	getCarCategories(){
		Axios.get("http://localhost:3003/api/carcategory/get/list")
			.then(response => {
				console.log(response.data);
				this.setState({allCategories : response.data.carCategories });
			})
			.catch(error=>{
				console.log("Error while Saving Car Category", error);
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
			carCategory : this.state.carCategory,
			action : this.state.action,
			catg_id : this.state.catg_id,
		}

		console.log("formValues = ",formValues);

		Axios.post("http://localhost:3003/api/carcategory/post",formValues)
			.then(response =>{
				console.log("response = ", response.data);
				if(this.state.action === "Insert"){
					Swal.fire('Congrats!','Car Category Submitted Successfully!' , 'success');	
				}else{
					Swal.fire('Congrats!','Car Category Updated Successfully!' , 'success');	
					this.setState({action: "Insert", catg_id: "", carCategory:"" });
					this.props.history.push("/master-category");
				}
				
				this.setState({carCategory : "" });
				this.getCarCategories();
			})
			.catch(error=>{
				console.log("Error while Saving Car Category", error);
				Swal.fire('Oops...', 'Something went wrong!', 'error')
			});
	}

	deleteCarCatg(event){
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

			Axios.post("http://localhost:3003/api/carcategory/delete",formValues)
				.then(response =>{
					console.log("response = ", response.data);
					Swal.fire('Deleted!', 'Car Category Deleted Successfully!', 'success');
					this.getCarCategories();
				})
				.catch(error=>{
					console.log("Error while Saving Car Category", error);
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

				<div className="pageTitle"> 
					Car Category Master 
				</div>				

				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<form className="catgForm" onSubmit={this.handleSubmit.bind(this)}>
							<div className="singlefield col-lg-12 col-md-12 col-sm-12 col-xs-12">

								<div className="col-lg-6 col-lg-offset-3 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<label htmlFor="carCategory"> Car Category <span className="asterik">*</span> </label>
										<div className="input-group">
											<span className="input-group-addon"> <i className="fa fa-car"> </i> </span>
											<input  type="text" className="form-control" name="carCategory" ref="carCategory" 
													maxLength="30" value={this.state.carCategory}
													onChange={this.handleChange.bind(this)}
											required/>
										</div>
									</div>
								</div>

{/*								<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
									<div className="form-group">
										<button className="col-lg-4 btn btn-primary catgSubmit"
												onClick={this.handleSubmit.bind(this)}
										> Submit </button>
									</div>
								</div>
*/}

							</div>
						</form>


						{/* ===========  Table ============ */} 
						<div className="col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12">
							<h4> Car Categories </h4>
							{this.state.allCategories.length > 0
							 ?
								<table className="table table-hovered table-bordered table-stripped ">
									<thead>
										<tr className="active">
											<th> Sr No </th>
											<th> Car Category </th>
											<th> Actions </th>
										</tr>
									</thead>

									<tbody>
										{this.state.allCategories.map((element,index)=>{
											if(index === 0){
												var rowClass = "latestRow";
											}else{
												var rowClass = ""  ;
											}
											return(
												<tr key={index} className={rowClass}>
													<td> {index+1} </td>
													<td> {element.carCategory} </td>
													<td className="text-center">  
														<a href={"/master-category/"+element._id}> <i className="fa fa-edit"> </i> </a>
														&nbsp;&nbsp;
														<i className="fa fa-trash" id={element._id} onClick={this.deleteCarCatg.bind(this)}> </i>
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
							 		Please Add Car Category 
							 	</div>
							 }
						</div>


					</div>
				</div>
				
			</section>
		);
	}


}