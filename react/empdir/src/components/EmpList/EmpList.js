import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

import './EmpList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default class EmpList extends Component{

	constructor(props){
		super(props);

		this.state = {
			empDetails : [],
		}
	}


	componentDidMount(){
		this.getEmpData();
	}

	getEmpData(){
		Axios.get("http://localhost:3003/api/employee/get/list")
			 .then((response)=>{
			 	console.log("response = ",response.data);
			 	if(response.data.employees){
			 		this.setState({
			 			empDetails : response.data.employees,
			 		});
			 	}
			 })
			 .catch((error)=>{
			 	console.log("Error during get Data = ", error);
			 	Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
			 });		
	}


	deleteEmp(event){
		event.preventDefault();	
		var empid = event.currentTarget.id.substr(2);
		console.log("empid = ",empid);

		Swal.fire({
		  title: 'Are you sure, you want to Delete this Employee?',
		  text: 'You will not be able to recover this record!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#d33',
  		  cancelButtonColor: '#3085d6',		  
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
		  	Axios.delete("http://localhost:3003/api/employee/delete/"+empid)
		  		.then((data)=>{
		  			console.log("data = ",data);
		  			if(data.data.deletedCount > 0){
						this.getEmpData();
					    Swal.fire(
					      'Deleted!',
					      'Employee Record has been deleted successfully',
					      'success'
					    )
		  			}else{
					    Swal.fire(
					      'Sorry, Something is Wrong!',
					      'Employee Record NOT deleted',
					      'error'
					    )		  				
		  			}
		  		})
		  		.catch((err)=>{
		  			console.log("error while deleting employee = ",err);
					    Swal.fire(
					      'Some Error Occured!',
					      ''+err,
					      'error'
					    )							  			
		  		});

		  // For more information about handling dismissals please visit
		  // https://sweetalert2.github.io/#handling-dismissals
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
		    Swal.fire(
		      'Cancelled',
		      'Your Employee Record is NOT Deleted :)',
		      'error'
		    )
		  }
		})		
	}

	render(){
		return(

	    	<div className="row">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<h3> Employee List </h3>
					<table className="table table-stripped table-hovered table-bordered"> 
						<thead> 
							<tr>
								<th>Sr</th>
								<th>Employee Name</th>
								<th>Date of birth</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Gender</th>
								<th>Highest Education</th>
								<th>Pincode</th>
								<th>Languages</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.empDetails.length > 0
								?
									this.state.empDetails.map((emp,index)=>{
										return(
											<tr key={index}>
												<td>{index+1}</td>
												<td>{emp.fName+" "+emp.mName+" "+emp.lName}</td>
												<td>{moment(emp.dob).format("Do MMM YYYY")}</td>
												<td>{emp.email}</td>
												<td>{emp.phone}</td>
												<td>{emp.gender === 'M' ? "Male" : "Female"}</td>
												<td>{emp.highestEdu}</td>
												<td>{emp.pincode}</td>
												<td> <div className="colText"> {emp.languages.toString().replace(/,/g, ', ')} </div> </td>
												<td> 
													<a href={"/empform/"+emp._id}> <i id={"e-"+emp._id} className="fa fa-edit" title="Click to Edit"> </i> </a> &nbsp;&nbsp;
													<i id={"d-"+emp._id} className="fa fa-trash" title="Click to Delete" onClick={this.deleteEmp.bind(this)}> </i>
												</td>
											</tr>
										)
									})
								:
									<tr> 
										<td colSpan="9"> Sorry... No Data available! </td>
									</tr>
							}
						</tbody>
					</table>
	    		</div>
	    	</div>
		);
	}

}


/*

		    	<FirstComponent name="Shankar" 	phone="8687669280"/>
		    	<FirstComponent name="Prince" 	phone="8687669280"/>
		    	<FirstComponent name="Chandra" 	phone="8687669280"/>
		    	<FirstComponent name="Ranjan" 	phone="8687669280"/>
		    	<FirstComponent name="Sanket" 	phone="8687669280"/>			

*/