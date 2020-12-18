import React from 'react';
import {
  Container,
  Grid,
  Placeholder,
  Header,
  Image,
  Input,
  Divider,
  Icon,
  Button,
  Rating
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchProduct, unmountProduct } from '../actions';
import AddToCart from './Product/AddToCart';

class ProductDetail extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchProduct(this.props.match.params.slug);
  };

  componentWillUnmount = () => {
    this.props.unmountProduct();
  };

  renderPlaceHolder = () => {
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Placeholder style={{ height: '500px', width: '100%' }}>
            <Placeholder.Image
              centered="true"
              style={{ width: '100%' }}
            ></Placeholder.Image>
          </Placeholder>
        </Grid.Column>
        <Grid.Column>
          <Placeholder>
            <Placeholder.Line length="very short"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="very long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="very short"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="very long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
          </Placeholder>
        </Grid.Column>
      </Grid>
    );
  };

  renderProduct = () => {
    const { product } = this.props;
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Image
            centered
            src={product.product_image}
          />
        </Grid.Column>
        <Grid.Column>
          <Header sub color="grey">
            {product.catalog.catalog_name}
          </Header>
          <Header size="huge" className="textHeading">
            {product.product_name}
          </Header>
          <Rating icon="heart" defaultRating={3} maxRating={5} />
          <Header size="large" color="teal">
            <Header sub className="overstrike" color="grey">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(product.product_price)}
            </Header>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(product.product_price)}
          </Header>
          <p basic="true">
          {product.product_details}
          </p>
          <AddToCart product={product}/>
          {/* <Input
            action={{
              color: 'teal',
              labelPosition: 'right',
              icon: 'cart',
              content: 'Add to cart'
            }}
            type="number"
            defaultValue={1}
            onClick=
          /> */}
          <div style={{ marginTop: '12px' }}>
            <Button icon labelPosition="left" color="red" size="small" onClick={()=> alert('Chức năng đang hoàn thiện')}>
              <Icon name="heart" />
              Add To Wishlist
            </Button>
            <Button icon labelPosition="left" size="small" basic onClick={()=> alert('Chức năng đang hoàn thiện')}>
              <Icon name="random" />
              Compare
            </Button>
          </div>
          <Divider />
          {/* <Header sub>Share:</Header> */}
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    return (
      <Container style={{ marginTop: '100px' }}>
        {this.props.product ? this.renderProduct() : this.renderPlaceHolder()}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.product
  };
};
export default connect(
  mapStateToProps,
  { fetchProduct, unmountProduct }
)(ProductDetail);
