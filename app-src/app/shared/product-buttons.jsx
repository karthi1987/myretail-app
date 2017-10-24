import React, { Component } from 'react';
import { render } from 'react-dom';

import PropTypes from 'prop-types'; // ES6

//Shared component
import { ProductButtons } from './static-component';

/*
 * Product Buttons Component
 */

class ProductButtonsComponent extends Component {

	render() {

		return(
			<div onClick={ this.props.clickMe }>
				 <ProductButtons channelCode={ this.props.buttons.purchasingChannelCode }/>
			</div>
		);
	}

}

// Specifies the default values for props:
ProductButtons.defaultProps = {
  buttons: {
	purchasingChannelCode: "0"
  }
};

ProductButtons.propTypes = {
  buttons: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.number,
    React.PropTypes.string
  ])
};

export default ProductButtonsComponent;