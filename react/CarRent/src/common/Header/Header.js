import React, {Component} from 'react';
import './Header.css';





export default class Header extends Component{

	constructor(props){
		super(props);
		this.state = {
			isLogin : false
		}
	}

	componentDidMount(){
		if(this.props.isLogin){
			this.setState({isLogin : true});
		}else{
			this.setState({isLogin : false});
		}
	}

	render(){
		return(
			<header>			
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headerBar">
						{
							this.state.isLogin
							?
								<a href="/logout"> 
									<div className="col-lg-1 col-lg-offset-11 loginLink"> Logout </div>
								</a>														
							:
								<a href="/login"> 
									<div className="col-lg-1 col-lg-offset-11 loginLink"> Login </div>
								</a>							
						}
					</div>
				</div>
			</header>
		);

	}
}
