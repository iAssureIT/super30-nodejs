import React, {Component} from 'react';
// import {useParams} from 'react-router-dom';


export default class EmpProfile extends Component{


	render(){
		var params = this.props.match.params;
		console.log("params = ",params);

		return(
	    	<div className="row">
				<div className="pageTitle col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
					Employee Profile
				</div>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<h1> Employee Id : {params.empid}  </h1>
	    		</div>
		    </div>
		);
	}


}
