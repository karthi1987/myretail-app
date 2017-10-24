require('es6-promise').polyfill();

import { expect } from 'chai';
//import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';

const sinon = require('sinon');

import React from 'react';
//import clone from 'lodash/clone';

const products = require('json-loader!../../mock/json/app-home.json');

//import { ProductTitle } from 'app/shared/static-component';

import TestComponent from 'app/shared/test-component';
import ProductButtonsComponent from 'app/shared/product-buttons';

const testBaseUI = () => {

	describe('a passing test', () => {
	  it('should pass', () => {
	    expect(true).to.be.true;
	  });
	});

	describe( 'Render Component', () => {
		const fetchProductData = sinon.spy();
		const fetchProductButtons = sinon.spy();

		const mountProductTitle = () => {
			const productsInfo = "Name";
			return mount(
				<TestComponent clickMe={ fetchProductData } title="name" />
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
				clickMe={ fetchProductButtons }
			/>
		);

		it ( 'check if the purchasingChannelCode is 0 then Add to cart and pick up in store should be displayed', ( done ) => {

			productButtons.setProps({
				buttons: {
					purchasingChannelCode: "0"
				}
			})

			expect( productButtons.find('.pickup-store') ).to.have.length( 1 );
			expect( productButtons.find('.add-to-cart') ).to.have.length( 1 );

			done();
		} )

	});
}

module.exports = testBaseUI;
