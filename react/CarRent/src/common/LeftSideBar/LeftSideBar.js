import React from 'react';
import {Link} from 'react-router-dom';

import './LeftSideBar.css';


function LeftSideBar(){
	return(
			<aside>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftSideBar">
							<ul className="leftmenu">
								<li> <Link to="/admin-dashboard"> Home </Link> </li>
								<li> <Link to="/master-category"> Master Category </Link> </li>
								<li> <Link to="/master-brand-model"> Master Brand </Link> </li>
								<li> <Link to="/master-cars"> Master Cars </Link> </li>
							</ul>
					</div>
				</div>
			</aside>
	);
}

export default LeftSideBar