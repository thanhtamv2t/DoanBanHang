import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { addToCart } from '../../actions';

const AddToCart = props => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <React.Fragment>
      <Button
        basic
        color="teal"
        floated="right"
        size="tiny"
        icon
        onClick={async () => {
          setisLoading(true);
          await props.addToCart(props.product);
          message.success('Successful added to cart');
          setisLoading(false);
        }}
        loading={isLoading}
        disabled={isLoading}
      >
        <Icon name="cart" /> Add To Cart
      </Button>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { products: state.cart.products };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(AddToCart);
