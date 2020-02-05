import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';

import './Logout.css';

export default class Logout extends Component{

	constructor(props){
		super();

		localStorage.removeItem("token");

		props.history.push("/");

	}

	render(){
		return(
			<div>
				<h3> You are Successfully Logged Out! </h3>
			</div>
		);
	}

}