import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


import Header 		from '../../common/Header/Header.js';
import Footer 		from '../../common/Footer/Footer.js';
import HomePage 		from '../../pages/HomePage/HomePage.js';


export default class Layout extends Component{

	render(){
		return(
			<section>
				<Router>
					<div className="">
						<Header />
					</div>

					<div className="">
						<Switch>
							<Route exact path="/" component={HomePage} />
						</Switch>
					</div>

					<div className="">
						<Footer />
					</div>

				</Router>
			</section>
		)
	}
}