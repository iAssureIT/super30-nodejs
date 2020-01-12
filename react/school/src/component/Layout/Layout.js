import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from '../header/Header.js';
import Sidebar from '../sidebar/Sidebar.js';
import AdmissionForm from '../AdmissionForm/AdmissionForm.js';
import StudentProfile from '../StudentProfile/StudentProfile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';


export default class Layout extends Component{

	constructor(){
		super();

	}


	render(){
		return(
			<Router>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="Appheader">
						<Header />
					</div>
					<div className="Appfullcontent">
						<div className="Sidebarcontent"> 
						  <Sidebar />
						</div>
						<div className="Maincontent">
							<Switch> 
								<Route exact path="/" component={AdmissionForm} />
								<Route exact path="/student-profile" component={StudentProfile} />
								<Route exact path="/student-list" />
								<Route exact path="/dashboard" />
								<Route exact path="/calendar" />
								<Route component={PageNotFound} />
							</Switch>
						</div> 
					</div> 
				</div>
			</Router>
		);
	}

}