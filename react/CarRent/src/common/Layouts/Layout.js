import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import PageNotFound from '../PageNotFound/PageNotFound.js';
import Header 		from '../Header/Header.js';
import LeftSideBar 	from '../LeftSideBar/LeftSideBar.js';
import Footer 		from '../Footer/Footer.js';

import Dashboard 		from '../../modules/Dashboard/Dashboard.js';
import MasterCategory 	from '../../modules/Masters/MasterCategory/MasterCategory.js';
import BrandModel 		from '../../modules/Masters/BrandModel/BrandModel.js';
import MasterCars 		from '../../modules/Masters/MasterCars/MasterCars.js';


import Signup 			from '../../security/Signup/Signup.js';
import Login 			from '../../security/Login/Login.js';




export default class Layout extends Component{


	render(){
		return(
			<Router>
		    	<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<Header />
					</div>
					<div className="col-lg-2 col-md-2 col-sm-2 xs-hidden">
						<LeftSideBar />
					</div>
					<div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 mainContent">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 page">
							<div className="row">
					    		<Switch>
					    			<Route exact path="/signup" component={Signup} /> 
					    			<Route exact path="/login" component={Login} /> 

					    			<Route exact path="/" component={Dashboard} /> 
					    			<Route exact path="/master-category" component={MasterCategory} /> 
					    			<Route exact path="/master-category/:catg_id" component={MasterCategory} /> 
					    			<Route exact path="/master-brand-model" component={BrandModel} /> 
					    			<Route exact path="/master-brand-model/:type/:id" component={BrandModel} /> 
					    			<Route exact path="/master-cars" component={MasterCars} /> 
					    			<Route component={PageNotFound} />
					    		</Switch>
			    			</div>
			    		</div>
			    	</div>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<Footer />
					</div>
			    </div>
			</Router>
		);
	}


}
