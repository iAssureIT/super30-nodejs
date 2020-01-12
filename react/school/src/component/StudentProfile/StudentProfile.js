import React, {Component} from 'react';
import './StudentProfile.css';

export default class StudentProfile extends Component{

	constructor(){
		super();
	}

	render(){
		return(
            <section className="page col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <h3>Student Profile</h3>
               <hr/>
            	<div className="profileheader col-lg-12 col-md-12 col-sm-12 col-xs-12">
            		<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            			<h3 >First name Last name</h3>
            		</div>
            		<div className="schoolinfo col-lg-6 col-md-6 col-sm-6 col-xs-12">
            			<h3>New Zeus School</h3>
            			<p>tel:87654654</p>
            		</div>
            	</div>
            	<hr/>
            	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			      <div className="col-md-4 col-md-4 col-sm-4 col-xs-12">            			
            			<img src="profilephoto.jpg" alt="profilephoto" className="profilephoto"/>
            		</div>
            		<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            			<h4>Grade</h4>
            			<p>1st Grade</p>
            			<h3>Date of birth</h3>
            			<p>4 May 2016</p>
            			<h3>Phone</h3>
            			<p>8765432</p> 
            			<h3>Address</h3>
            			<p>Pune</p>           			
            		</div>
            		<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            			<h4>Gender</h4>
            			<p>Female</p>
            			<h3>Email</h3>
            			<p>abc@gmail.com</p>
                              <h3>Languages</h3>
            			<p>English,Hindi,Marathi,French</p>
            		</div>            
            	</div>
            	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            	      <h3>Student Information</h3>
            	      <hr />
            	</div>
            </section>
	     );
	}
}