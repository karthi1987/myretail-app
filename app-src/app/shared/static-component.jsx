
import React from 'react';
import { render } from 'react-dom';

import Moment from 'moment';

import classnames from 'classnames';
import { APP_CONSTANTS, BREAKPOINT } from '../app-constants';


//scss

/* Null Component */
const NullComponent = () => {
	return null;
};

/* Error Component */
const ErrorMessage = ( props ) => {

	if ( !props ) {
		return <NullComponent />;
	} 
	return(
		<div className="server-error-message">
			{ props.message }
		</div>
	);
}


/* Product Title */
const ProductTitle = ( props ) => {
	if ( !props ) {
		return <NullComponent />;
	}
	return( 
		<div className="product-title">
			<span>{ props.title }</span>
		</div>
	);
};

/* Product Image */
const ProductImage = ( { source, width, height } ) => {
	if ( source && width && height ) {
		return (
			<img src={ source } width={ width } height={ height } />
		);
	} else if ( source ) {
		return (
			<img src={ source } />
		);
	}
};

/* Product Price */
const ProductPrice = ( { formattedPriceValue, priceQualifier } ) => {
	if ( !formattedPriceValue ) {
		return <NullComponent />;
	}

	return(
		<div className="product-price">
			{ formattedPriceValue }
			<span className="price-qualifier"> { priceQualifier }</span>
		</div>
	);
};

/* Product Promotions */
const ProductPromotions = ( { Promotions } ) => {
	const promotionalInfo = [];

	Promotions 
	&& Promotions.map( ( promotion, index ) => { 
		if ( promotion.Description && promotion.Description.length > 0 ) {
			promotion.Description.map( ( promo, key ) => {
				promotionalInfo.push( { 'description': promo.shortDescription, 'index': key } );
			});
		}
	} )

	if ( !promotionalInfo.length ) {
		return ( <NullComponent /> );
	}

	return(
		<div className="product-promotions">
			<ul>
				{
					promotionalInfo.map( ( promo, index ) => 
						<li key={ index }> { promo.description } </li>
					)
				}
			</ul>
		</div>
	);
}

/* Product Quantity */
const ProductQuantity = () => {

	return(
		<div className="product-quantity">
			<div className="quantity-label">quantity: </div>
			<div className="quantity-integer">
				<span className="quantity-decrement"> - </span>
				<span className="quantity-number"> 1 </span>
				<span className="quantity-increment"> + </span>
			</div>
		</div>
	);
}

/* Shared Buttons Component */
const Buttons = ( { name, label } ) => {

	if ( name ) {
		return ( 
			<button width="80" height="40" className={ classnames(
				'button-default',
				{
					'pickup-store': name === 'pickupStore',
					'add-to-cart': name === 'addToCart',
					'add-to-registry': name === 'addToRegistry',
					'add-to-list': name === 'addToList',
					'share': name === 'share',
				}
			) }>
				{ label }
			</button>
		);
	} else {
		return(
			<button width="80" height="40">
				default button
			</button>
		);
	}
}

/* Product Buttons */
const ProductButtons = ( { channelCode }) => {

	return(
		<div className="product-buttons">
			{
				( channelCode === APP_CONSTANTS.CAN_BUY || channelCode === APP_CONSTANTS.PICKUP_INSTORE )
				&&
				<Buttons name="pickupStore" label="pick up in store" />
			}
			{
				( channelCode === APP_CONSTANTS.CAN_BUY || channelCode === APP_CONSTANTS.ADD_TOCART )
				&&
				<Buttons name="addToCart" label="add to cart" />
			}
		</div>
	)
}

/* Product Return Policy */
const ProductReturnPolicy = ( { legalCopy } ) => {

	return(
		<div className="product-return-policy">
			<div className="returns-label"> returns </div>
			<div className="returns-legal-copy" dangerouslySetInnerHTML={ { __html: legalCopy } } />
		</div>
	);
}

/* Product Registry Buttons */
const ProductRegistryButtons = ( ) => {

	return(
		<div className="product-registry">
			<Buttons name="addToRegistry" label="add to registry" class="add-to-registry" />
			<Buttons name="addToList" label="add to list" class="add-to-list" />
			<Buttons name="share" label="share" class="share" />
		</div>
	);
}

/* Product Details */
const ProductHighlights = ( { features } ) => {

	return(
		<div className="product-highlights">
			<div className="label"> product highlights </div>
			<div className="specification">
				<ul>
					{
			         	features.map(
     				     ( item, index ) =>
     			          <li className="recognized-list" key={ index } >
     			          	<span dangerouslySetInnerHTML={ { __html: item } }></span>
     			          </li>
     					)
					}
				</ul>
			</div>
		</div>
	);
}

/* Product Reviews */
const ProductReviews = ( { Con, Pro, Reviews, totalReviews, consolidatedOverallRating } ) => {

	let positiveReview = false;
	let negativeReview = false;
	let positiveReviewPosted = null;
	let negativeReviewPosted = null;
	if ( Pro && Pro.length > 0 ) {
		positiveReview = Pro[ 0 ];
		positiveReviewPosted = Moment( positiveReview.datePosted ).format( "MMMM D, YYYY" );
	}
	if ( Con && Con.length > 0 ) {
		negativeReview = Con[ 0 ];
		negativeReviewPosted = Moment( negativeReview.datePosted ).format( "MMMM D, YYYY" )
	}

	return(
		<div className="product-reviews">
			<div className="reviews-header">
				<div className="overall-rating">
					<div className="rating-count">
						<span className="screen-reader-only">{ consolidatedOverallRating }</span>
					</div>
					<div className="overall-label">Overall</div>
				</div>
				<div className="total-reviews">
				 View all
				 	<span className="count">{ totalReviews }</span>
				 reviews </div>
			</div>
			<div className="review-details">
				<div className="pros-cons">
					<div className="pros">
						<label>PRO</label>
						<span>most helpful 4-5 star review</span>
					</div>
					<div className="cons">
						<label>CON</label>
						<span>most helpful 1-2 star review</span>
					</div>
				</div>
				<div className="review-view">
					{
						positiveReview
						&&
						<div className="review-info positive">
							<div className="rating">
								<div className="screen-reader-only"> { positiveReview.overallRating } </div>
							</div>
							<div className="subject"> { positiveReview.title } </div>
							<div className="comments"> { positiveReview.review } </div>
							<div className="review-author">
								<a href="#"> { positiveReview.screenName }</a>, { positiveReviewPosted }
							</div>
						</div>
					}
					{
						negativeReview
						&&
						<div className="review-info negative">
							<div className="rating">
								<div className="screen-reader-only">  { negativeReview.overallRating } </div>
							</div>
							<div className="subject"> { negativeReview.title } </div>
							<div className="comments"> { negativeReview.review } </div>
							<div className="review-author">
								<a href="#"> { negativeReview.screenName }</a>, { negativeReviewPosted }
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	);

}


export {
    ProductTitle as ProductTitle,
    ProductImage as ProductImage,
    ProductPrice as ProductPrice,
    ProductPromotions as ProductPromotions,
    ProductQuantity as ProductQuantity,
    ProductButtons as ProductButtons,
    ProductReturnPolicy as ProductReturnPolicy,
    ProductRegistryButtons as ProductRegistryButtons,
    ProductHighlights as ProductHighlights,
    ProductReviews as ProductReviews,
    NullComponent as NullComponent,
    ErrorMessage as ErrorMessage
}
