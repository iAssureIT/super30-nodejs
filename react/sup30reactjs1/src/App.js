import React from 'react';
import {Link} from 'react-router-dom';

import './App.css';

// import Routes from './Routes.js';

import EmployeeForm from './components/EmployeeForm/EmployeeForm.js';
import Header from './components/common/Header/Header.js';
import LeftSideBar from './components/common/LeftSideBar/LeftSideBar.js';
import Footer from './components/common/Footer/Footer.js';


function App() {
  return (
    <div className="container-fluid">
    	<div className="row">
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<Header />
			</div>
			<div className="col-lg-2 col-md-2 col-sm-2 xs-hidden">
				<LeftSideBar />
			</div>
			<div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 mainContent">
	    		<EmployeeForm />
	    	</div>
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<Footer />
			</div>
	    </div>
    </div>
  );
}


export default App;
