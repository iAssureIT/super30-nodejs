import React from 'react';
import {Link} from 'react-router-dom';

import './LeftSideBar.css';


function LeftSideBar(){
	return(
			<aside>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftSideBar">
							<ul className="leftmenu">
								<li> <Link to="/"> Home </Link> </li>
								<li> <Link to="/empform"> Employee Form </Link> </li>
								<li> <Link to="/emplist"> Employee List </Link> </li>
							</ul>
					</div>
				</div>
			</aside>
	);
}

export default LeftSideBar