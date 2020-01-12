import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import PageNotFound from '../PageNotFound/PageNotFound.js';
import Header 		from '../Header/Header.js';
import LeftSideBar 	from '../LeftSideBar/LeftSideBar.js';
import Footer 		from '../Footer/Footer.js';

import Workspace 		from '../../modules/workspaceManagement/Workspace/Workspace.js';




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

				    		<Switch>
				    			<Route exact path="/" 				 	component={Workspace} /> 
				    			<Route component={PageNotFound} />
				    		</Switch>

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
