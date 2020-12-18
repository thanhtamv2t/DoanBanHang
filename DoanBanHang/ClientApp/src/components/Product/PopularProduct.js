import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import Product from './Product';
import { fetchPopularProduct } from '../../actions';
import axios from '../../api/axios';

class PopularProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrList: []
    }
  }
  componentDidMount = async () => {
    const response = await axios.get('/products/top')
    if (response.data) {
      this.setState({ arrList: response.data });
    }
  };

  renderPopularProducts = () => {
    const { arrList } = this.state
    if (arrList.length > 0)
      return arrList.map(product => (
        <Product key={product._id} data={product} />
      ));

    return (
      <React.Fragment>
        <Product />
        <Product />
        <Product />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Card.Group itemsPerRow={3}>{this.renderPopularProducts()}</Card.Group>
    );
  }
}

const mapStateToProps = state => ({ ...state.products });

export default connect(
  mapStateToProps,
  { fetchPopularProduct }
)(PopularProduct);
