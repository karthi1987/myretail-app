require('es6-promise').polyfill();

import { expect } from 'chai';
//import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
const sinon = require('sinon');
import React from 'react';

//Mock Data
const products = require('json-loader!../../mock/json/app-home.json');

//Shared Component
import TestComponent from 'app/shared/test-component';
import ProductButtonsComponent from 'app/shared/product-buttons';

/*
 *  Test Components with UI functions
 */

const TestProductsComponent = () => {

	describe( 'Render Component', () => {
		const fetchProductData = sinon.spy();
		const fetchProductButtons = sinon.spy();

		const mountProductTitle = () => {
			return mount(
				<TestComponent clickMe={ fetchProductData } title="product title" />
			);
		};

		it ( 'calls fetchProductData', ( done ) => {
			const productTitle = mountProductTitle();
			productTitle.find( 'div' ).simulate('click');
			expect( fetchProductData.calledOnce ).to.be.true;

			done();
		});

		const productButtons = mount(
			<ProductButtonsComponent 
				buttons={ products }
				triggerClick={ fetchProductButtons }
			/>
		);

		it ( 'check if the purchasingChannelCode is 0 then Add to cart and Pick up instore should be displayed', ( done ) => {

			productButtons.setProps({
				buttons: {
					purchasingChannelCode: "0"
				}
			})

			expect( productButtons.find('.pickup-store') ).to.have.length( 1 );
			expect( productButtons.find('.add-to-cart') ).to.have.length( 1 );

			done();
		} )

		it ( 'check if the purchasingChannelCode is 2 then display only Pick up instore', ( done ) => {

			productButtons.setProps({
				buttons: {
					purchasingChannelCode: "2"
				}
			})

			expect( productButtons.find('.pickup-store') ).to.have.length( 1 );
			expect( productButtons.find('.add-to-cart') ).to.have.length( 0 );

			done();
		} )

		it ( 'check if the purchasingChannelCode is 1 then display only Add to cart', ( done ) => {

			productButtons.setProps({
				buttons: {
					purchasingChannelCode: "1"
				}
			})

			expect( productButtons.find('.pickup-store') ).to.have.length( 0 );
			expect( productButtons.find('.add-to-cart') ).to.have.length( 1 );

			done();
		} )


	});
}

module.exports = TestProductsComponent;