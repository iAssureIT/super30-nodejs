import React, {Component} from 'react';
import Axios from 'axios'; 
import Swal from 'sweetalert2';
import $ from 'jquery';
import Loader from 'react-loader-spinner';

import MasterBrand from "../MasterBrand/MasterBrand.js";
import MasterModel from "../MasterModel/MasterModel.js";

import './BrandModel.css';

export default class BrandModel extends Component{

	constructor(props){
		super(props);
		this.state = {
			brand_id : "",
			model_id : "",
		}

	}

	componentDidMount(){
		var type = this.props.match.params.type;
		if(type === "brand"){
			this.setState({ brand_id : this.props.match.params.id });
			$(".nav-pills").children().removeClass("active");
			$(".tab-pane").removeClass("active");
			$(".tab-pane").removeClass("in");
			$("#pill1").addClass("active");

			$("#carBrand").addClass("in");
			$("#carBrand").addClass("active");
		}

		if(type === "model"){
			this.setState({ model_id : this.props.match.params.id });
			$(".nav-pills").children().removeClass("active");
			$(".tab-pane").removeClass("active");
			$(".tab-pane").removeClass("in");
			$("#pill2").addClass("active");
			$("#carModel").addClass("in");
			$("#carModel").addClass("active");
		}


	}


	render(){
		return(
			<section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="pageTitle"> 
					Car Brand & Model Master 
				</div>				

				<ul className="nav nav-pills menuTabs col-lg-6 col-lg-offset-3">
				  <li id="pill1" className="active"><a data-toggle="pill" href="#carBrand">Car Brand</a></li>
				  <li id="pill2"><a data-toggle="pill" href="#carModel">Car Model</a></li>
				</ul>

				<div className="tab-content">
					<div id="carBrand" className="tab-pane fade in active">
						<MasterBrand history={this.props.history} params={this.props.match.params}/>
					</div>
					<div id="carModel" className="tab-pane fade">
						<MasterModel history={this.props.history} params={this.props.match.params}/>					
					</div>
				</div>				
			</section>
		);
	}


}