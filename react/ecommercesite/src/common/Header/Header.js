import React, {Component} from 'react';
import TopStrip 		from '../TopStrip/TopStrip.js';
import SearchStrip 		from '../SearchStrip/SearchStrip.js';
import MenuBar 			from '../MenuBar/MenuBar.js';


export default class Header extends Component{

	render(){
   return(
		<section>
			<TopStrip />
			<SearchStrip />
			<MenuBar />
		</section>
	)
	}
}