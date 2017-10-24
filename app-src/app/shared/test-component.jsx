import React, { Component } from 'react';
import { render } from 'react-dom';

import PropTypes from 'prop-types'; // ES6


class TestComponent extends Component {

	render() {
		return(
			<div onClick={ this.props.clickMe }>
				 Hello World! { this.props.title }
			</div>
		);
	}

}

// Specifies the default values for props:
TestComponent.defaultProps = {
  title: 'Product Title'
};

TestComponent.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default TestComponent;