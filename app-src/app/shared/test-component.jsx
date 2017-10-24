import React, { Component } from 'react';
import { render } from 'react-dom';

import PropTypes from 'prop-types';

import { ProductTitle } from './static-component';

/*
 * Product Title Test
 */
class ProductTestComponent extends Component {

	render() {
		return(
			<div onClick={ this.props.clickMe }>
				Product Title { this.props.title }
			</div>
		);
	}

}

// Specifies the default values for props:
ProductTestComponent.defaultProps = {
  title: 'Product Title'
};

ProductTestComponent.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default ProductTestComponent;