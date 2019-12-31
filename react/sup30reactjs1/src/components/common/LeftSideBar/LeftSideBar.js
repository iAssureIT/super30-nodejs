import React from 'react';
import {Route,Switch, Link, BrowserRouter as Router} from 'react-router-dom';

import './LeftSideBar.css';

import App from '../../../App.js';
import Empform from '../../Empform/Empform.js';
import EmployeeForm from '../../EmployeeForm/EmployeeForm.js';



function LeftSideBar(){
	return(
		<Router> 
			<aside>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftSideBar">
							<Switch>
								<Route exact path = "/" component = {App} />
								<Route exact path = "/about" component = {Empform} />
								<Route exact path = "/empdata" component = {EmployeeForm} />
							</Switch>

							<ul>
								<li> <Link to="/"> Home </Link> </li>
								<li> <Link to="/empform"> Empform </Link> </li>
								<li> <Link to="/employeeform"> EmployeeForm </Link> </li>
							</ul>
					</div>
				</div>
			</aside>
		</Router>
	);
}

export default LeftSideBar