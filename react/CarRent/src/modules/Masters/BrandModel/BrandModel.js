import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';


import MasterBrand from "../MasterBrand/MasterBrand.js";
import MasterModel from "../MasterModel/MasterModel.js";

import './BrandModel.css';

export default class BrandModel extends Component{

	constructor(){
		super();
		this.state = {
		}
	}

	componentDidMount(){
	}


	render(){

		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="pageTitle"> 
					Car Brand & Model Master 
				</div>				

				<ul className="nav nav-pills menuTabs col-lg-6 col-lg-offset-3">
				  <li ><a data-toggle="pill" href="#carBrand">Car Brand</a></li>
				  <li className="active"><a data-toggle="pill" href="#carModel">Car Model</a></li>
				</ul>

				<div className="tab-content">
					<div id="carBrand" className="tab-pane fade">
						<MasterBrand />
					</div>
					<div id="carModel" className="tab-pane fade in active">
						<MasterModel />					
					</div>
				</div>				
			</section>
		);
	}


}