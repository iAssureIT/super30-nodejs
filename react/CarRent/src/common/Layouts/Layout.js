import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import $ from 'jquery';

import PageNotFound from '../PageNotFound/PageNotFound.js';
import Header 		from '../Header/Header.js';
import LeftSideBar 	from '../LeftSideBar/LeftSideBar.js';
import Footer 		from '../Footer/Footer.js';

import AdminDashboard 	from '../../modules/Dashboard/AdminDashboard.js';
import TeacherDashboard from '../../modules/Dashboard/TeacherDashboard.js';
import StudentDashboard from '../../modules/Dashboard/StudentDashboard.js';
import PrincipalDashboard 	from '../../modules/Dashboard/PrincipalDashboard.js';

import MasterCategory 	from '../../modules/Masters/MasterCategory/MasterCategory.js';
import BrandModel 		from '../../modules/Masters/BrandModel/BrandModel.js';
import MasterCars 		from '../../modules/Masters/MasterCars/MasterCars.js';


import Signup 			from '../../security/Signup/Signup.js';
import Login 			from '../../security/Login/Login.js';
import Logout 			from '../../security/Logout/Logout.js';

import "./Layout.css";


export default class Layout extends Component{

	constructor(props){
		super();

		this.state = {
			isLogin : false,
			winHeight : "300px"
		}

	}

	componentDidMount(){
		this.checkLogin();
	}

	checkLogin(){
		var token = localStorage.getItem("token");
		if(token){
			this.setState({isLogin : true});
		}else{
			this.setState({isLogin : false});
		}		
	}

	render(){
		const winHeight = {
		  height: $(window).height()
		};		

		return(
			<Router>
				{
					this.state.isLogin
					?
				    	<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<Header isLogin={this.state.isLogin} />
							</div>
							<div className="col-lg-2 col-md-2 col-sm-2 xs-hidden">
								<LeftSideBar />
							</div>
							<div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 mainContent">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 page">
									<div className="row">
							    		<Switch>
							    			<Route exact path="/signup" component={Signup} /> 
							    			<Route exact path="/" component={Login} /> 
							    			<Route exact path="/logout" component={Logout} /> 

							    			<Route exact path="/admin-dashboard" 	component={AdminDashboard} /> 
							    			<Route exact path="/teacher-dashboard" 	component={TeacherDashboard} /> 
							    			<Route exact path="/student-dashboard" 	component={StudentDashboard} /> 
							    			<Route exact path="/principal-dashboard" component={PrincipalDashboard} /> 
							    			<Route exact path="/master-category" 	component={MasterCategory} /> 
							    			<Route exact path="/master-category/:catg_id" component={MasterCategory} /> 
							    			<Route exact path="/master-brand-model" component={BrandModel} /> 
							    			<Route exact path="/master-brand-model/:type/:id" component={BrandModel} /> 
							    			<Route exact path="/master-cars" 		component={MasterCars} /> 
							    			<Route component={PageNotFound} />
							    		</Switch>
					    			</div>
					    		</div>
					    	</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<Footer />
							</div>
					    </div>

					:
				    	<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 openpage" style={winHeight}>
									<div className="row">
							    		<Switch>
							    			<Route exact path="/signup" component={Signup} /> 
							    			<Route exact path="/" component={Login} /> 
							    		</Switch>
					    			</div>
					    		</div>
					    </div>


				}
			</Router>
		);
	}


}
