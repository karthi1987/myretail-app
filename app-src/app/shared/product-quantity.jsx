import React, { Component } from 'react';
import { render } from 'react-dom';

//scss
import './shared.scss';
import '../nav/nav.scss';

/*
 * Product Quantity
 */

class ProductQuantity extends Component {

  constructor( props ){
      super( props );
      this.state = { 
        quantity: 1,
      }

      this.increaseQuantity = this.increaseQuantity.bind( this );
      this.decreaseQuantity = this.decreaseQuantity.bind( this );
  }

  decreaseQuantity() {
    const { quantity } = this.state;
    if ( quantity <= 0 ) {
      return;
    }
    this.setState( { quantity: quantity - 1 } );
  }

  increaseQuantity() {
    const { quantity } = this.state;
    if ( quantity < 0 ) {
      return;
    }
    this.setState( { quantity: quantity + 1 } );
  }

  render() {

    const {
      state: {
        quantity
      }
    } = this;

    return(
      <div className="product-quantity">
        <div className="quantity-label">quantity: </div>
        <div className="quantity-integer">
          <span className="quantity-decrement" onClick={ this.decreaseQuantity }> - </span>
          <span className="quantity-number"> { quantity }</span>
          <span className="quantity-increment" onClick={ this.increaseQuantity }> + </span>
        </div>
      </div>
    )
  }

}

export default ProductQuantity;