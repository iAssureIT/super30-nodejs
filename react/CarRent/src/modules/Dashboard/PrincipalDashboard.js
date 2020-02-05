import React from 'react';

import './Dashboard.css';


function PrincipalDashboard(){
	return(
			<section>
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<img src="db1.jpeg" alt="" className="dashboard" />
						{
							localStorage.getItem("token") 
							?
								<h3> Welcome to Principal Dashboard </h3>
							:
								<h3> Sorry, you are not authorised to visit this page!! </h3>
						}
						
					</div>
				</div>
			</section>
	);
}

export default PrincipalDashboard ;