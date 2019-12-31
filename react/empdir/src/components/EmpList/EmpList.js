import React, {Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import './EmpList.css';

export default class EmpList extends Component{

	constructor(props){
		super(props);

		this.state = {
			empDetails : [],
		}
	}


	componentDidMount(){
		Axios.get("http://localhost:3003/api/employee/get")
			 .then((response)=>{
			 	console.log("response = ",response);
			 	if(response.data.data){
			 		this.setState({
			 			empDetails : response.data.data,
			 		});
			 	}
			 })
			 .catch((error)=>{
			 	console.log("Error during get Data = ", error);
			 	Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
			 });
	}

	render(){
		return(

	    	<div className="row">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<h3> Employee List </h3>
					{
						this.state.empDetails.length > 0
						?
							this.state.empDetails.map((emp,index)=>{
								return(
									<div> {(index+1) + " " + emp.fName + " " + emp.lName} </div>
								)
							})
						:
							<h3> Sorry... No Data available! </h3>
					}
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