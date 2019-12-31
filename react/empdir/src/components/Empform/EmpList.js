import React, {Component} from 'react';

export default class EmpList extends Component{

  constructor(props){
  	super(props);

  	console.log("Emplist Props = ",this.props.empData);


  }

  render(){
  	// console.log("EmpList Props = ",this.props.empData);

  	return(
  		<div>
    		<h1> Employee List </h1>
      		<hr />				
			<table className="empTable">
				<thead>
					<tr>
						<th>Employee Name</th>
						<th>Mobile</th>
						<th>Email</th>
						<th>Dob</th>
						<th>Gender</th>
					</tr>
				</thead>
				<tbody>
					{this.props.empData.firstName !== ""
					?
						<tr>
							<td>
							{
								this.props.empData.firstName + ' ' + this.props.empData.lastName 
							}
							</td>
							<td>{this.props.empData.mobile}</td>
							<td>{this.props.empData.email}</td>
							<td>{this.props.empData.dob}</td>
							<td>{this.props.empData.gender}</td>
						</tr>
					:
						<tr>
							<td colSpan="5"> Data Not Available </td>
						</tr> 
					}
				</tbody>
			</table>  		
  		</div>

  	);
  }


}