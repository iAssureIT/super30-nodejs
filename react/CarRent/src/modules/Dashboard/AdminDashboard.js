import React, {Component} from 'react';
import { Doughnut, Pie, Bar, Radar, Polar } from 'react-chartjs-2';

import './Dashboard.css';


export default class AdminDashboard extends Component{
	constructor(props){
		super(props);

		this.state = {
			chartData : {
						    datasets: [{
						        
						        data: [100,160, 230, 320],

								backgroundColor: [
					                'rgba(255, 99, 132, 1)',
					                'rgba(155, 199, 132, 1)',
					                'rgba(54, 162, 235, 1)',
					                'rgba(255, 206, 86, 0.9)',
					            ],

						    }],

						    // These labels appear in the legend and in the tooltips when hovering different arcs
						    labels: [
						    	'Alpha Romeo',
						        'Mercedes',
						        'BMW',
						        'Audi'
						    ],
							 options: {
							        scales: {
							            yAxes: [{
							                ticks: {
							                    beginAtZero: true
							                }
							            }]
							        }
							    }						    
						}
		}
	}


	render(){
		return(
				<section>
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboard">
							<div className="pageTitle"> Admin Dashboard </div>
							<Doughnut 
								data={this.state.chartData} 
							/>
							<hr />
							<Pie 
								data={this.state.chartData} 
							/>
							<hr />
							<Bar 
								data={this.state.chartData} 
							/>
							<hr />
							<Radar
								data={this.state.chartData} 
							/>
							<hr />
							<Polar
								data={this.state.chartData} 
							/>
							<hr />
						</div>
					</div>
				</section>
		);		
	}
}

