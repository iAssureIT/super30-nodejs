import React, {Component} from 'react';
import './Sidebar.css';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


export default class Sidebar extends Component{
	render(){
		return(
			<div className="sidebarsection">
            <h2 className="h2sidebar">Sidebar</h2>
	            <h4>
	            	<Link to="/">Home</Link>
	            </h4>
	            <h4>
	            	<Link to="/student-profile">Student Profile</Link>
	            </h4>            
	            <h4>
	            	<Link to="/student-list">Student List</Link>
	            </h4> 
	            <h4>
	            	<Link to="/dashboard">Dashboard</Link>
	            </h4>           
            </div>
			);
	}
}
