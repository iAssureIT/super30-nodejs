import React, {Component} from 'react';

import Banner 		from '../../blocks/Banner/Banner.js';
// import Deals 		from '../../blocks/Deals/Deals.js';
// import FeaturedProducts 		from '../../blocks/FeaturedProducts/FeaturedProducts.js';
import Ad1 			from '../../blocks/Ad1/Ad1.js';
import Ad2 			from '../../blocks/Ad2/Ad2.js';
// import NewRandomProducts 		from '../../blocks/NewRandomProducts/NewRandomProducts.js';
// import USP 			from '../../blocks/USP/USP.js';
// import LatestProducts 		from '../../blocks/LatestProducts/LatestProducts.js';
import Ad3 			from '../../blocks/Ad3/Ad3.js';
// import Testimonials from '../../blocks/Testimonials/Testimonials.js';
// import LatestBlogs 	from '../../blocks/LatestBlogs/LatestBlogs.js';
// import Brands 		from '../../blocks/Brands/Brands.js';
// import BestOffers 	from '../../blocks/BestOffers/BestOffers.js';
// import Subscribe 	from '../../blocks/Subscribe/Subscribe.js';


export default class Homepage extends Component{

	render(){
		return(		
		<div> 
			<Banner />
{/*			<Deals />
			<FeaturedProducts />
*/}			<Ad1 />
			<Ad2 />
{/*			<NewRandomProducts />
			<USP />
			<LatestProducts />*/}
			<Ad3 />
{/*			<Testimonials />
			<LatestBlogs />
			<Brands />
			<BestOffers />
			<Subscribe />*/}
		</div>
		)
	}
}