import React, { Component } from 'react';
import { render } from 'react-dom';

/*
 * Shared Component
 */ 
import { 
	ProductTitle, 
	ProductPrice, 
	ProductPromotions, 
	ProductQuantity, 
	ProductButtons,
	ProductReturnPolicy,
	ProductRegistryButtons,
	ProductHighlights,
	ProductReviews,
	NullComponent 
} from '../shared/static-component';
import HeroImageAndItsChildren from '../shared/image-carousel';

/*
 * scss
 */
import './nav.scss';

class Nav extends Component {

	constructor( props ){
        super( props );

        this.state = {
        	//To do:
        }
    }

   render() {

   		if ( !this.props ) {
   			return <NullComponent />;
   		}

		const { 
			CustomerReview,
			Images, 
			ItemDescription, 
			Offers, 
			Promotions,
			ReturnPolicy,
			inventoryCode,
			title,
			partNumber,
			purchasingChannelCode
		} = this.props;

        return(

    		<div className="content-wrapper">
				<div className="content-left">
					<ProductTitle title={ title }/>
					{
						Images && Images.length > 0
						&& <HeroImageAndItsChildren { ...Images[ 0 ] } />
					}
    			</div>
    			<div className="content-right">
    				{
    					Offers && Offers.length > 0
    					&& Offers[ 0 ] && Offers[ 0 ].OfferPrice
    					&& Offers[ 0 ].OfferPrice.length > 0
    					&& <ProductPrice { ...Offers[ 0 ].OfferPrice[ 0 ] } />
    				}
    				{
    					Promotions && Promotions.length > 0
    					&& <ProductPromotions Promotions={ Promotions } />
    				}
    				<ProductQuantity />
    				{
    					purchasingChannelCode
    					&&
	    				<ProductButtons channelCode={ purchasingChannelCode }/>
    				}
    				{
    					ReturnPolicy
    					&& ReturnPolicy.length > 0
    					&& ReturnPolicy[ 0 ]
    					&& <ProductReturnPolicy { ...ReturnPolicy[ 0 ] } />
    				}
    				<ProductRegistryButtons />
    				{
    					ItemDescription
    					&& ItemDescription.length > 0
    					&& ItemDescription[ 0 ] && ItemDescription [ 0 ].features
    					&& ItemDescription [ 0 ].features.length > 0 
    					&& <ProductHighlights { ...ItemDescription [ 0 ] } />
    				}
				</div>
    			<div className="content-bottom">
    				{
    					CustomerReview
    					&& CustomerReview.length > 0
    					&& CustomerReview[ 0 ]
    					&& <ProductReviews { ...CustomerReview[ 0 ] } />
    				}
    			</div>
	    	</div>
        )
    }

}

export default Nav;