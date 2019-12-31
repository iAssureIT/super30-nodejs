import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

import './App.css';


import App from './App.js';
import Empform from './components/Empform/Empform.js';
import EmployeeForm from './components/EmployeeForm/EmployeeForm.js';


function Routes() {
  return (
    <div>
		<Router>
			<Route exact path = "/" component = {App}> </Route>
			<Route path = "/empform" component = {Empform}> </Route>
			<Route path = "/employeeform" component = {EmployeeForm}> </Route>
		</Router>
    </div>
  );
}


export default Routes;
