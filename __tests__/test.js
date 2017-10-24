/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var serverConfig = __webpack_require__(1);
	var app = __webpack_require__(2);

	var ApiTest = __webpack_require__(4);
	var TestComponents = __webpack_require__(8);

	/*
	                                          * Start the server and run the tests
	                                          */

	var server = app.listen(serverConfig.LOCAL_PATH, function (error) {
		if (error) {
			logger.error(error);
		} else {
			var port = serverConfig.PORT;
			logger.info('Listening on port ' + port);
		}
	});

	/*
	    * Render the UI Components
	    */
	TestComponents();

	/*
	                   * Close the server
	                   */
	server.close();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';var serverConfig = {
		LOCAL_PATH: 'localhost',
		PORT: 8080 };


	module.exports = serverConfig;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var express = __webpack_require__(3);

	var app = express();

	module.exports = app;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var asset = __webpack_require__(5);
	var expect = __webpack_require__(6).expect;
	var request = __webpack_require__(7);

	var ApiTest = function ApiTest(server) {

	};

	module.exports = ApiTest;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("supertest");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _base = __webpack_require__(9);var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

	var TestComponents = function TestComponents() {
		(0, _base2.default)();
	};

	module.exports = TestComponents;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chai = __webpack_require__(6);

	var _enzyme = __webpack_require__(10);

	var _react = __webpack_require__(11);var _react2 = _interopRequireDefault(_react);





	var _testComponent = __webpack_require__(12);var _testComponent2 = _interopRequireDefault(_testComponent);
	var _productButtons = __webpack_require__(19);var _productButtons2 = _interopRequireDefault(_productButtons);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}__webpack_require__(20).polyfill(); //import { sinon, spy } from 'sinon';
	var sinon = __webpack_require__(21); //Mock Data
	var products = __webpack_require__(22); //Shared Component
	/*
	 *  Test Components with UI functions
	 */
	var TestProductsComponent = function TestProductsComponent() {

		describe('Render Component', function () {
			var fetchProductData = sinon.spy();
			var fetchProductButtons = sinon.spy();

			var mountProductTitle = function mountProductTitle() {
				return (0, _enzyme.mount)(
				_react2.default.createElement(_testComponent2.default, { clickMe: fetchProductData, title: 'product title' }));

			};

			it('calls fetchProductData', function (done) {
				var productTitle = mountProductTitle();
				productTitle.find('div').simulate('click');
				(0, _chai.expect)(fetchProductData.calledOnce).to.be.true;

				done();
			});

			var productButtons = (0, _enzyme.mount)(
			_react2.default.createElement(_productButtons2.default, {
				buttons: products,
				triggerClick: fetchProductButtons }));



			it('check if the purchasingChannelCode is 0 then Add to cart and Pick up instore should be displayed', function (done) {

				productButtons.setProps({
					buttons: {
						purchasingChannelCode: "0" } });



				(0, _chai.expect)(productButtons.find('.pickup-store')).to.have.length(1);
				(0, _chai.expect)(productButtons.find('.add-to-cart')).to.have.length(1);

				done();
			});

			it('check if the purchasingChannelCode is 2 then display only Pick up instore', function (done) {

				productButtons.setProps({
					buttons: {
						purchasingChannelCode: "2" } });



				(0, _chai.expect)(productButtons.find('.pickup-store')).to.have.length(1);
				(0, _chai.expect)(productButtons.find('.add-to-cart')).to.have.length(0);

				done();
			});

			it('check if the purchasingChannelCode is 1 then display only Add to cart', function (done) {

				productButtons.setProps({
					buttons: {
						purchasingChannelCode: "1" } });



				(0, _chai.expect)(productButtons.find('.pickup-store')).to.have.length(0);
				(0, _chai.expect)(productButtons.find('.add-to-cart')).to.have.length(1);

				done();
			});


		});
	};

	module.exports = TestProductsComponent;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("enzyme");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = __webpack_require__(11);var _react2 = _interopRequireDefault(_react);
	var _reactDom = __webpack_require__(13);

	var _propTypes = __webpack_require__(14);var _propTypes2 = _interopRequireDefault(_propTypes);

	var _staticComponent = __webpack_require__(15);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

	/*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Product Title Test
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */var
	ProductTestComponent = function (_Component) {_inherits(ProductTestComponent, _Component);function ProductTestComponent() {_classCallCheck(this, ProductTestComponent);return _possibleConstructorReturn(this, (ProductTestComponent.__proto__ || Object.getPrototypeOf(ProductTestComponent)).apply(this, arguments));}_createClass(ProductTestComponent, [{ key: 'render', value: function render()

	    {
	      return (
	        _react2.default.createElement('div', { onClick: this.props.clickMe }, 'Product Title ',
	          this.props.title));


	    } }]);return ProductTestComponent;}(_react.Component);



	// Specifies the default values for props:
	ProductTestComponent.defaultProps = {
	  title: 'Product Title' };


	ProductTestComponent.propTypes = {
	  title: _react2.default.PropTypes.oneOfType([
	  _react2.default.PropTypes.string,
	  _react2.default.PropTypes.number]) };exports.default =



	ProductTestComponent;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("prop-types");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ErrorMessage = exports.NullComponent = exports.ProductReviews = exports.ProductHighlights = exports.ProductRegistryButtons = exports.ProductReturnPolicy = exports.ProductButtons = exports.ProductQuantity = exports.ProductPromotions = exports.ProductPrice = exports.ProductImage = exports.ProductTitle = undefined;
	var _react = __webpack_require__(11);var _react2 = _interopRequireDefault(_react);
	var _reactDom = __webpack_require__(13);

	var _moment = __webpack_require__(16);var _moment2 = _interopRequireDefault(_moment);

	var _classnames = __webpack_require__(17);var _classnames2 = _interopRequireDefault(_classnames);
	var _appConstants = __webpack_require__(18);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


	//scss

	/* Null Component */
	var NullComponent = function NullComponent() {
		return null;
	};

	/* Error Component */
	var ErrorMessage = function ErrorMessage(props) {

		if (!props) {
			return _react2.default.createElement(NullComponent, null);
		}
		return (
			_react2.default.createElement('div', { className: 'server-error-message' },
				props.message));


	};


	/* Product Title */
	var ProductTitle = function ProductTitle(props) {
		if (!props) {
			return _react2.default.createElement(NullComponent, null);
		}
		return (
			_react2.default.createElement('div', { className: 'product-title' },
				_react2.default.createElement('span', null, props.title)));


	};

	/* Product Image */
	var ProductImage = function ProductImage(_ref) {var source = _ref.source,width = _ref.width,height = _ref.height;
		if (source && width && height) {
			return (
				_react2.default.createElement('img', { src: source, width: width, height: height }));

		} else if (source) {
			return (
				_react2.default.createElement('img', { src: source }));

		}
	};

	/* Product Price */
	var ProductPrice = function ProductPrice(_ref2) {var formattedPriceValue = _ref2.formattedPriceValue,priceQualifier = _ref2.priceQualifier;
		if (!formattedPriceValue) {
			return _react2.default.createElement(NullComponent, null);
		}

		return (
			_react2.default.createElement('div', { className: 'product-price' },
				formattedPriceValue,
				_react2.default.createElement('span', { className: 'price-qualifier' }, ' ', priceQualifier)));


	};

	/* Product Promotions */
	var ProductPromotions = function ProductPromotions(_ref3) {var Promotions = _ref3.Promotions;
		var promotionalInfo = [];

		Promotions &&
		Promotions.map(function (promotion, index) {
			if (promotion.Description && promotion.Description.length > 0) {
				promotion.Description.map(function (promo, key) {
					promotionalInfo.push({ 'description': promo.shortDescription, 'index': key });
				});
			}
		});

		if (!promotionalInfo.length) {
			return _react2.default.createElement(NullComponent, null);
		}

		return (
			_react2.default.createElement('div', { className: 'product-promotions' },
				_react2.default.createElement('ul', null,

					promotionalInfo.map(function (promo, index) {return (
							_react2.default.createElement('li', { key: index }, ' ', promo.description, ' '));}))));





	};

	/* Product Quantity */
	var ProductQuantity = function ProductQuantity() {

		return (
			_react2.default.createElement('div', { className: 'product-quantity' },
				_react2.default.createElement('div', { className: 'quantity-label' }, 'quantity: '),
				_react2.default.createElement('div', { className: 'quantity-integer' },
					_react2.default.createElement('span', { className: 'quantity-decrement' }, ' - '),
					_react2.default.createElement('span', { className: 'quantity-number' }, ' 1 '),
					_react2.default.createElement('span', { className: 'quantity-increment' }, ' + '))));



	};

	/* Shared Buttons Component */
	var Buttons = function Buttons(_ref4) {var name = _ref4.name,label = _ref4.label;

		if (name) {
			return (
				_react2.default.createElement('button', { className: (0, _classnames2.default)(
						'button-default',
						{
							'pickup-store': name === 'pickupStore',
							'add-to-cart': name === 'addToCart',
							'add-to-registry': name === 'addToRegistry',
							'add-to-list': name === 'addToList',
							'share': name === 'share' }) },


					label));


		} else {
			return (
				_react2.default.createElement('button', { width: '80', height: '40' }, 'default button'));



		}
	};

	/* Product Buttons */
	var ProductButtons = function ProductButtons(_ref5) {var channelCode = _ref5.channelCode;

		return (
			_react2.default.createElement('div', { className: 'product-buttons' },

				(channelCode === _appConstants.APP_CONSTANTS.CAN_BUY || channelCode === _appConstants.APP_CONSTANTS.PICKUP_INSTORE) &&

				_react2.default.createElement(Buttons, { name: 'pickupStore', label: 'pick up in store' }),


				(channelCode === _appConstants.APP_CONSTANTS.CAN_BUY || channelCode === _appConstants.APP_CONSTANTS.ADD_TOCART) &&

				_react2.default.createElement(Buttons, { name: 'addToCart', label: 'add to cart' })));



	};

	/* Product Return Policy */
	var ProductReturnPolicy = function ProductReturnPolicy(_ref6) {var legalCopy = _ref6.legalCopy;

		return (
			_react2.default.createElement('div', { className: 'product-return-policy' },
				_react2.default.createElement('div', { className: 'returns-label' }, ' returns '),
				_react2.default.createElement('div', { className: 'returns-legal-copy', dangerouslySetInnerHTML: { __html: legalCopy } })));


	};

	/* Product Registry Buttons */
	var ProductRegistryButtons = function ProductRegistryButtons() {

		return (
			_react2.default.createElement('div', { className: 'product-registry' },
				_react2.default.createElement(Buttons, { name: 'addToRegistry', label: 'add to registry', 'class': 'add-to-registry' }),
				_react2.default.createElement(Buttons, { name: 'addToList', label: 'add to list', 'class': 'add-to-list' }),
				_react2.default.createElement(Buttons, { name: 'share', label: 'share', 'class': 'share' })));


	};

	/* Product Details */
	var ProductHighlights = function ProductHighlights(_ref7) {var features = _ref7.features;

		return (
			_react2.default.createElement('div', { className: 'product-highlights' },
				_react2.default.createElement('div', { className: 'label' }, ' product highlights '),
				_react2.default.createElement('div', { className: 'specification' },
					_react2.default.createElement('ul', null,

						features.map(
						function (item, index) {return (
								_react2.default.createElement('li', { className: 'recognized-list', key: index },
									_react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: item } })));})))));







	};

	/* Product Reviews */
	var ProductReviews = function ProductReviews(_ref8) {var Con = _ref8.Con,Pro = _ref8.Pro,Reviews = _ref8.Reviews,totalReviews = _ref8.totalReviews,consolidatedOverallRating = _ref8.consolidatedOverallRating;

		var positiveReview = false;
		var negativeReview = false;
		var positiveReviewPosted = null;
		var negativeReviewPosted = null;
		if (Pro && Pro.length > 0) {
			positiveReview = Pro[0];
			positiveReviewPosted = (0, _moment2.default)(positiveReview.datePosted).format("MMMM D, YYYY");
		}
		if (Con && Con.length > 0) {
			negativeReview = Con[0];
			negativeReviewPosted = (0, _moment2.default)(negativeReview.datePosted).format("MMMM D, YYYY");
		}

		return (
			_react2.default.createElement('div', { className: 'product-reviews' },
				_react2.default.createElement('div', { className: 'reviews-header' },
					_react2.default.createElement('div', { className: 'overall-rating' },
						_react2.default.createElement('div', { className: 'rating-count' },
							_react2.default.createElement('span', { className: 'screen-reader-only' }, consolidatedOverallRating)),

						_react2.default.createElement('div', { className: 'overall-label' }, 'Overall')),

					_react2.default.createElement('div', { className: 'total-reviews' }, 'View all',

						_react2.default.createElement('span', { className: 'count' }, totalReviews), 'reviews ')),


				_react2.default.createElement('div', { className: 'review-details' },
					_react2.default.createElement('div', { className: 'pros-cons' },
						_react2.default.createElement('div', { className: 'pros' },
							_react2.default.createElement('label', null, 'PRO'),
							_react2.default.createElement('span', null, 'most helpful 4-5 star review')),

						_react2.default.createElement('div', { className: 'cons' },
							_react2.default.createElement('label', null, 'CON'),
							_react2.default.createElement('span', null, 'most helpful 1-2 star review'))),


					_react2.default.createElement('div', { className: 'review-view' },

						positiveReview &&

						_react2.default.createElement('div', { className: 'review-info positive' },
							_react2.default.createElement('div', { className: 'rating' },
								_react2.default.createElement('div', { className: 'screen-reader-only' }, ' ', positiveReview.overallRating, ' ')),

							_react2.default.createElement('div', { className: 'subject' }, ' ', positiveReview.title, ' '),
							_react2.default.createElement('div', { className: 'comments' }, ' ', positiveReview.review, ' '),
							_react2.default.createElement('div', { className: 'review-author' },
								_react2.default.createElement('a', { href: '#' }, ' ', positiveReview.screenName), ', ', positiveReviewPosted)),




						negativeReview &&

						_react2.default.createElement('div', { className: 'review-info negative' },
							_react2.default.createElement('div', { className: 'rating' },
								_react2.default.createElement('div', { className: 'screen-reader-only' }, '  ', negativeReview.overallRating, ' ')),

							_react2.default.createElement('div', { className: 'subject' }, ' ', negativeReview.title, ' '),
							_react2.default.createElement('div', { className: 'comments' }, ' ', negativeReview.review, ' '),
							_react2.default.createElement('div', { className: 'review-author' },
								_react2.default.createElement('a', { href: '#' }, ' ', negativeReview.screenName), ', ', negativeReviewPosted))))));








	};exports.



	ProductTitle = ProductTitle;exports.
	ProductImage = ProductImage;exports.
	ProductPrice = ProductPrice;exports.
	ProductPromotions = ProductPromotions;exports.
	ProductQuantity = ProductQuantity;exports.
	ProductButtons = ProductButtons;exports.
	ProductReturnPolicy = ProductReturnPolicy;exports.
	ProductRegistryButtons = ProductRegistryButtons;exports.
	ProductHighlights = ProductHighlights;exports.
	ProductReviews = ProductReviews;exports.
	NullComponent = NullComponent;exports.
	ErrorMessage = ErrorMessage;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var BREAKPOINT = exports.BREAKPOINT = {
		DESKTOP: 1601,
		LAPTOP: 1281,
		LB: 1200,
		LARGE_TABLET: 992,
		TABLET: 767,
		MOBILE_LANDSCAPE: 550,
		MOBILE: 386 };


	var APP_CONSTANTS = exports.APP_CONSTANTS = {
		CAN_BUY: '0',
		PICKUP_INSTORE: '2',
		ADD_TOCART: '1',
		DATA_LOADING: 'Please wait, data loading...',
		NO_DATA_AVAILABLE: 'DATA NOT AVAILABLE FOR THIS PRODUCT, PLEASE TRY DIFFERENT PRODUCT.',
		SERVER_FAILED: 'SERVER FAILED TO RESPONSE, PLEASE TRY AGAIN LATER...',
		SUCCESS: 'SUCCESSFULLY DATA LOADED' };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _react = __webpack_require__(11);var _react2 = _interopRequireDefault(_react);
	var _reactDom = __webpack_require__(13);

	var _propTypes = __webpack_require__(14);var _propTypes2 = _interopRequireDefault(_propTypes);


	var _staticComponent = __webpack_require__(15);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // ES6
	//Shared component
	/*
	 * Product Buttons Component
	 */var

	ProductButtonsComponent = function (_Component) {_inherits(ProductButtonsComponent, _Component);function ProductButtonsComponent() {_classCallCheck(this, ProductButtonsComponent);return _possibleConstructorReturn(this, (ProductButtonsComponent.__proto__ || Object.getPrototypeOf(ProductButtonsComponent)).apply(this, arguments));}_createClass(ProductButtonsComponent, [{ key: 'render', value: function render()

	    {

	      return (
	        _react2.default.createElement('div', { onClick: this.props.clickMe },
	          _react2.default.createElement(_staticComponent.ProductButtons, { channelCode: this.props.buttons.purchasingChannelCode })));


	    } }]);return ProductButtonsComponent;}(_react.Component);



	// Specifies the default values for props:
	_staticComponent.ProductButtons.defaultProps = {
	  buttons: {
	    purchasingChannelCode: "0" } };



	_staticComponent.ProductButtons.propTypes = {
	  buttons: _react2.default.PropTypes.oneOfType([
	  _react2.default.PropTypes.object,
	  _react2.default.PropTypes.number,
	  _react2.default.PropTypes.string]) };exports.default =



	ProductButtonsComponent;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("es6-promise");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("sinon");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {
		"CatalogEntryView": [
			{
				"CustomerReview": [
					{
						"Con": [
							{
								"RatableAttributes": [
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "4"
									},
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "1"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "1"
									}
								],
								"datePosted": "Mon Mar 11 13:13:55 UTC 2013",
								"overallRating": "1",
								"review": "Less than 2 months after purchase it completely stopped working. First it wouldn't detect the pitcher when trying to blend a significant amount, a couple weeks later it wouldn't detect the single serve cup. ",
								"reviewKey": "b326b0d6-e6ae-4ec5-8080-720f0ad741af",
								"screenName": "New York",
								"title": "Very unhappy"
							}
						],
						"ConsolidatedRatableAttributes": [
							{
								"description": "Quality",
								"name": "QUALITY",
								"value": "4"
							},
							{
								"description": "Easy to Use",
								"name": "EASY_TO_USE",
								"value": "4.5"
							},
							{
								"description": "Value",
								"name": "VALUE",
								"value": "3.5"
							}
						],
						"Pro": [
							{
								"RatableAttributes": [
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "5"
									}
								],
								"datePosted": "Thu Apr 18 19:42:19 UTC 2013",
								"overallRating": "5",
								"review": "This blender works amazingly, and blends within seconds.  The single serve cups also work really well for smoothies or protein shakes!",
								"reviewKey": "d602bcdf-53be-4769-94da-3b3fd2517d21",
								"screenName": "Eric",
								"title": "Fantastic Blender"
							}
						],
						"Reviews": [
							{
								"RatableAttributes": [
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "4"
									},
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "1"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "1"
									}
								],
								"city": "NYC",
								"customerId": "110657105",
								"datePosted": "Mon Mar 11 13:13:55 UTC 2013",
								"helpfulVotes": "39",
								"overallRating": "1",
								"review": "Less than 2 months after purchase it completely stopped working. First it wouldn't detect the pitcher when trying to blend a significant amount, a couple weeks later it wouldn't detect the single serve cup. ",
								"reviewKey": "b326b0d6-e6ae-4ec5-8080-720f0ad741af",
								"screenName": "New York",
								"state": "NY",
								"title": "Very unhappy",
								"totalComments": "0",
								"totalVotes": "52"
							},
							{
								"Comments": [
									{
										"city": "",
										"commentKey": "CommentKey:ffcefb66-381a-4985-b869-9fcfdd26e7cc",
										"commentText": "Separating the men from the boys,  separating the amateurs from the professionals when it comes to blenders, when you revealed to us that, -It doesn&#x27;t pulverize seeds-.I really need a good blender, but there is No way that I would buy this blender now. Thank you so much, Jon",
										"postedDate": "Thu Oct 10 04:17:50 UTC 2013",
										"screenName": "JON",
										"userKey": "118863321",
										"userTier": "Trusted"
									}
								],
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "2"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "3"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "2"
									}
								],
								"city": "Idaho Falls",
								"customerId": "116317693",
								"datePosted": "Sun Sep 01 03:18:11 UTC 2013",
								"helpfulVotes": "16",
								"overallRating": "2",
								"review": "This blender is not superior to other smoothie blenders, It doesn't pulverize seeds and leaves green smoothies chunky with a lot of pulp. The single serve concept is amazing, however, my single serve cup began to break right from the start. The prongs became chipped because of the difficulty of screwing it in and out of the base. It won't blend for more than a minute without smelling like burned rubber. While the single serve seemed to blend more smoothly, it didn't hold much, especially when adding ice. I was very disappointed and so I returned it,",
								"reviewKey": "399853f3-4451-40a8-bcd6-bda2d814d9f4",
								"screenName": "London",
								"state": "ID",
								"title": "Very Disappointed",
								"totalComments": "1",
								"totalVotes": "21"
							},
							{
								"RatableAttributes": [
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "5"
									}
								],
								"city": "Oakland",
								"customerId": "100025104",
								"datePosted": "Thu Apr 18 19:42:19 UTC 2013",
								"helpfulVotes": "10",
								"overallRating": "5",
								"review": "This blender works amazingly, and blends within seconds.  The single serve cups also work really well for smoothies or protein shakes!",
								"reviewKey": "d602bcdf-53be-4769-94da-3b3fd2517d21",
								"screenName": "Eric",
								"state": "CA",
								"title": "Fantastic Blender",
								"totalComments": "0",
								"totalVotes": "10"
							},
							{
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "5"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "5"
									}
								],
								"city": "Cambridge",
								"customerId": "172227",
								"datePosted": "Sat Jan 18 01:20:36 UTC 2014",
								"helpfulVotes": "9",
								"overallRating": "5",
								"review": "I am blown away by this blender. It obliterates ice and frozen fruit - and blends fresh fruits to smooth perfection. It even makes quick work of fresh ginger and tough greens. I did a ton of research before settling on the Ninja. This was a splurge for me - and I spent the extra money to get the single serve cups, thinking I'd take my smoothie to work every morning. But my husband is totally hooked on smoothies now too, so the big pitcher is getting regular use. Tried it out for margaritas tonight... half a lime, half a lemon, half an orange with tequila, honey and ice... unbelievably good. Haven't tried it for soup or sauce yet, but can hardly wait.\n\nI'm impressed by features such as the suction cup feet, the snap-seal lid, and the sensor that prevents the machine from being turned on without the top in place. It cleans up nicely too. \n\nBottom line: I can't stop raving about this thing and have recommended it to all my friends and family.",
								"reviewKey": "d8e9ac59-6c3a-47be-8b87-f912715ccd18",
								"screenName": "E",
								"state": "MA",
								"title": "Couldn't be happier",
								"totalComments": "0",
								"totalVotes": "9"
							},
							{
								"Comments": [
									{
										"city": "",
										"commentKey": "CommentKey:a5b92fc8-ec2a-4772-b4ea-3cf4d473015b",
										"commentText": "THANK YOU, THANK YOU&#x21;&#x21;&#x21;&#x21;&#x21; YOU JUST GAVE ME THE BEST REASON TO -- NOT BUY -- THIS THING &#x21; THANK YOU, JON",
										"postedDate": "Thu Oct 10 03:44:47 UTC 2013",
										"screenName": "JON",
										"userKey": "118863321",
										"userTier": "Trusted"
									}
								],
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "1"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "1"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "1"
									}
								],
								"city": "new york",
								"customerId": "116426870",
								"datePosted": "Thu Jun 06 04:49:37 UTC 2013",
								"helpfulVotes": "38",
								"overallRating": "1",
								"review": " Upon using this blender  it turns out that the food gets into a deep hole at the bottom of the blade assembly , which fits on top of the rotating spindle, which cannot be cleaned.  No amount of rinsing or dish washer washing can get to it. A special thin and long brush would be required. Such food deposits can quickly become a place for bacteria growth and accumulate soap from dishwasher etc. A radical design change and going back to the drawing board is required, which Ninja would be unwilling to do.  Very poor and harmful product",
								"reviewKey": "49add669-1256-4894-9fce-9e0464342887",
								"screenName": "gourmet",
								"state": "NY",
								"title": "bacteria hazard",
								"totalComments": "1",
								"totalVotes": "69"
							},
							{
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "5"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "5"
									}
								],
								"city": "Wilmington ",
								"customerId": "115016455",
								"datePosted": "Sun Mar 16 13:54:36 UTC 2014",
								"helpfulVotes": "5",
								"overallRating": "5",
								"review": "Right out of the box I love this thing. You have to read the instructions: it indicates you must pulse several times THEN blend in order to get the smooth consistency. I'm going now to google soups to make. I'll add on to my review once I've tried more stuff. I know some folks had problems, I can say with total confidence that Ninja backs up what they make. I have a vacuum, steamer and iron and I broke the vacuum and they still fixed it for free. Easy peasy. Be sure to register your purchase. Peace. ",
								"reviewKey": "bf2283a9-37a1-46e2-b9b4-3edb757d5375",
								"screenName": "Sandra",
								"state": "DE",
								"title": "Great Blender",
								"totalComments": "0",
								"totalVotes": "5"
							},
							{
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "5"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "5"
									}
								],
								"city": "Tucson",
								"customerId": "119946555",
								"datePosted": "Thu Jan 30 18:50:22 UTC 2014",
								"helpfulVotes": "6",
								"overallRating": "5",
								"review": "My daughter received this Ninja blender and she absolutely loves it. My grandson has Autisim and has very sensitive taste buds. With the Ninja my daughter is able to puree his homemade soups, &amp; refried beans. Life is a little easier for my daughter &amp; him. She is in heaven. \n",
								"reviewKey": "7c7ef8c0-e227-45a5-86cd-c29adeb0bd2a",
								"screenName": "Flora",
								"state": "AZ",
								"title": "Ninja Blender",
								"totalComments": "0",
								"totalVotes": "7"
							},
							{
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "4"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "5"
									}
								],
								"city": "Minneapolis",
								"customerId": "109690154",
								"datePosted": "Sun Jan 12 17:41:43 UTC 2014",
								"helpfulVotes": "4",
								"overallRating": "5",
								"review": "I have to assume that the negative reviewers received an unfortunate &quot;lemon&quot; blender... that, or they didn't read the instruction manual, because I love my Ninja and definitely recommend it.\n\nI've had this blender for over a year and it still works as wonderfully as the day I bought it. I use it primarily for making smoothies, everything from green monsters to peanut butter protein shakes to frozen fruit &amp; yogurt smoothies with chia seeds on top.\n\nIt's like having Jamba Juice in my kitchen, but without the long line of snap-chatting teenagers.\n\nI frequently use the to-go cups to blend and take with me in the car. If you are in the camp lamenting that it doesn't hold enough, you probably also expect that once blended, it will be as full as you originally (over)stuffed it.\n\nRespect the max fill line, people, or use the full-size blender if you are going for NYC Big Gulp size.\n\nI will say, that if you are looking to seriously juice, this is not the blender for you. \n\nIt might take a little experimentation to get the right ratio of liquid to solid/frozen for a perfectly smooth blend, but once you figure out what works for you, it's easy!",
								"reviewKey": "9e0322d2-256e-46a5-80dc-b4468e58359b",
								"screenName": "Kari",
								"state": "MN",
								"title": "Love this blender!",
								"totalComments": "0",
								"totalVotes": "4"
							},
							{
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "5"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "5"
									}
								],
								"city": "Houston",
								"customerId": "116412794",
								"datePosted": "Wed Jun 05 14:26:21 UTC 2013",
								"helpfulVotes": "5",
								"overallRating": "5",
								"review": "[...]\nAll the parts are well made and good quality. The only thing that seems a little flimsy would be the drinking tops for the single serve cups, but those don't even matter because all you are doing is drinking from the tops.  All the rest of the machine is top notch.\n\nThis blender is powerful, quiet and very easy to clean.   \n\n[...]\nYou will not regret buying this machine.  ",
								"reviewKey": "4cc67e87-6754-4cab-8eb7-fb3bd738c16c",
								"screenName": "Te-Ann",
								"state": "TX",
								"title": "LOVE LOVE LOVE!!!!",
								"totalComments": "0",
								"totalVotes": "6"
							},
							{
								"RatableAttributes": [
									{
										"description": "quality",
										"name": "QUALITY",
										"value": "5"
									},
									{
										"description": "easy_to_use",
										"name": "EASY_TO_USE",
										"value": "5"
									},
									{
										"description": "value",
										"name": "VALUE",
										"value": "4"
									}
								],
								"city": "CENTREVILLE",
								"customerId": "102170259",
								"datePosted": "Thu Jan 30 05:33:15 UTC 2014",
								"helpfulVotes": "3",
								"overallRating": "5",
								"review": "I'm not sure why there are so many negative reviews about this blender on Target's website, but it's a great blender.  The first blender I've own that actually crushes the ice completely! Perfect for shakes!",
								"reviewKey": "3e810dba-638f-4146-aee8-190a741d86d5",
								"screenName": "SL",
								"state": "VA",
								"title": "Fantastic blender!!",
								"totalComments": "0",
								"totalVotes": "3"
							}
						],
						"consolidatedOverallRating": "4",
						"totalPages": "2",
						"totalReviews": "14"
					}
				],
				"DPCI": "072-04-1840",
				"Images": [
					{
						"AlternateImages": [
							{
								"image": "http://target.scene7.com/is/image/Target/14263758_Alt01"
							},
							{
								"image": "http://target.scene7.com/is/image/Target/14263758_Alt02"
							},
							{
								"image": "http://target.scene7.com/is/image/Target/14263758_Alt03"
							},
							{
								"image": "http://target.scene7.com/is/image/Target/14263758_Alt04"
							},
							{
								"image": "http://target.scene7.com/is/image/Target/14263758_Alt05"
							},
							{
								"image": "http://target.scene7.com/is/image/Target/14263758_Alt06"
							},
							{
								"image": "http://target.scene7.com/is/image/Target/14263758_Alt07"
							}
						],
						"PrimaryImage": [
							{
								"image": "http://target.scene7.com/is/image/Target/14263758"
							}
						],
						"imageCount": "8",
						"source": "internal"
					}
				],
				"ItemDescription": [
					{
						"features": [
							"<strong>Wattage Output:</strong> 1100 Watts",
							"<strong>Number of Speeds:</strong> 3 ",
							"<strong>Capacity (volume):</strong> 72.0 Oz.",
							"<strong>Appliance Capabilities:</strong> Blends",
							"<strong>Includes:</strong> Travel Lid",
							"<strong>Material:</strong> Plastic",
							"<strong>Finish:</strong> Painted",
							"<strong>Metal Finish:</strong> Chrome",
							"<strong>Safety and Security Features:</strong> Non-Slip Base",
							"<strong>Care and Cleaning:</strong> Easy-To-Clean, Dishwasher Safe Parts"
						]
					}
				],
				"Offers": [
					{
						"OfferPrice": [
							{
								"currencyCode": "USD",
								"formattedPriceValue": "$139.99",
								"priceQualifier": "Online Price",
								"priceValue": "13999"
							}
						]
					}
				],
				"POBoxProhibited": "We regret that this item cannot be shipped to PO Boxes.",
				"PackageDimension": [
					{
						"name": "length",
						"unit": "IN",
						"value": "17.4"
					},
					{
						"name": "width",
						"unit": "IN",
						"value": "12.4"
					},
					{
						"name": "height",
						"unit": "IN",
						"value": "9.9"
					},
					{
						"name": "weight",
						"unit": "LB",
						"value": "10.85"
					}
				],
				"Promotions": [
					{
						"Description": [
							{
								"legalDisclaimer": "Offer available online only. Offer applies to purchases of $50 or more of eligible items across all categories. Look for the &quot;SPEND $50: SHIPS FREE&quot; logo on eligible items. Some exclusions apply. Items that are not eligible are subject to shipping charges. $50 purchase is based on eligible merchandise subtotal. Items that are not eligible, GiftCards, e-GiftCards, gift wrap, tax and shipping and handling charges will not be included in determining merchandise subtotal. Offer valid for orders shipping within the 48 contiguous states, as well as APO/FPO and for Standard and To the Door shipping methods only. Not valid on previous orders.",
								"shortDescription": "SPEND $50, GET FREE SHIPPING"
							}
						],
						"endDate": "2014-05-25 06:59:00.001",
						"promotionIdentifier": "10736506",
						"promotionType": "Buy catalog entries from category X, get shipping at a fixed price",
						"startDate": "2014-05-18 07:00:00.001"
					},
					{
						"Description": [
							{
								"legalDisclaimer": "Receive a $25 gift card when you buy a Ninja Professional Blender with single serve blending cups or a Ninja MEGA Kitchen System. Not valid on previous orders. On your order summary, the item subtotal will reflect the price of the qualifying item plus the amount of the free gift card, followed by a discount given for the amount of the free gift card. &nbsp;Your price on the order summary will be the price of the qualifying item (the total charges for the qualifying item and gift card). &nbsp;Your account will actually be charged the amount of the qualifying item reduced by the amount of the gift card, and a separate charge for the amount of the gift card. The gift card will be sent to the same address as your order and will ship separately. If you want to return the item you purchased to a Target Store, you may either keep the gift card and just return the qualifying item (you will be refunded the amount of the qualifying item reduced by the amount of the gift card), or you can return the qualifying item and the gift card &nbsp;for a full refund using the online receipt. If you return the item you purchased by mail, keep the gift card; you will be refunded the amount of the qualifying item reduced by the amount of the gift card. Offer expires 05/24/14 at 11:59pm PST.",
								"shortDescription": "$25 gift card with purchase of a select Ninja Blender"
							}
						],
						"endDate": "2014-05-25 06:59:00.001",
						"promotionIdentifier": "10730501",
						"promotionType": "Multiple Items Free Gift",
						"startDate": "2014-05-11 07:00:00.001"
					}
				],
				"ReturnPolicy": [
					{
						"ReturnPolicyDetails": [
							{
								"guestMessage": "View our return policy",
								"policyDays": "100",
								"user": "Regular Guest"
							},
							{
								"guestMessage": "View our return policy",
								"policyDays": "120",
								"user": "Best Guest"
							}
						],
						"legalCopy": "refund/exchange policy<br/><br/><p style=\"font-size:13px;\">Most unopened items in new condition returned within 90 days will receive a refund or exchange. Some items have a modified return policy that is less than 90 days.&nbsp;Those items will either show a \"return by\" date or \"return within\" day range under the item on your receipt or packing slip and in the \"Item details, shipping\" tab if purchased on Target.com. Items that are opened or damaged or do not have a packing slip or receipt may be denied a refund or exchange. All bundled items must be returned with all components for a full refund. Bundle components may not all have the same return policy; please check your packing slip for details.&nbsp; Some items, such as gift cards, digital items&nbsp;are never returnable.&nbsp;<br /><br />See the <a href=\"http://www.target.com/HelpContent?help=/sites/html/TargetOnline/help/returns_and_refunds/returns_and_refunds.html\">Target return policy</a> for complete information.</p><br/>"
					}
				],
				"UPC": "622356532099",
				"applyCouponLink": "false",
				"buyable": "true",
				"callOutMsg": "FREE $25 GIFT CARD",
				"catEntryId": "205273068",
				"classId": "04",
				"department": "072",
				"eligibleFor": "ADD_TO_CART",
				"inventoryCode": "0",
				"inventoryStatus": "Online",
				"itemId": "1840",
				"itemType": "ItemBean",
				"manufacturer": "Euro Pro",
				"manufacturerPartNumber": "BL660",
				"packageQuantity": "null ",
				"partNumber": "14263758",
				"purchasingChannel": "Sold Online + in Stores",
				"purchasingChannelCode": "0",
				"shortDescription": "For the first time EVER - you get the same professional performance power in the Single Serve as well as the XL 72 oz pitcher! The Ninja™ Professional Blender with Single Serve Blending Cups allow you to crush ice into snow, blend whole fruits and vegetables into nutritious beverages, and create resort style blended drinks! Full size blender performance now in individual cups.",
				"title": "Ninja™ Professional Blender with Single Serve Blending Cups",
				"webclass": "Small Appliances"
			}
		]
	};

/***/ }
/******/ ]);