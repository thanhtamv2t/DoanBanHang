import React from 'react';
import {
  Item,
  Header,
  Button,
  Icon,
  Label,
  Transition,
  Card
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Drawer, Popconfirm } from 'antd';
import { toggleMiniCart, removeFromCart } from '../actions';
import { moneyFormat } from '../utils';
import history from '../history'
class MiniCart extends React.Component {


  handleCheckout = () => {
    history.push('/checkout')
  }

  renderItem = () => {
    const { products } = this.props;
    if (products && products.length > 0)
      return products.map(item => {
        if (!item.product.combo_id)
        {
          return (
              <Item key={item.product.product_id}>
                <Item.Content verticalAlign="middle">
                  <Popconfirm
                    placement="left"
                    title="Are you sure delete this item?"
                    onConfirm={() => this.props.removeFromCart(item.product.product_id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button circular icon basic size="mini" floated="right">
                      <Icon name="times" />
                    </Button>
                  </Popconfirm>
                  <Item.Header>{item.product.product_name}</Item.Header>
                  <Item.Description>
                    <Header color="red">
                      {moneyFormat(item.product.product_price * item.quantity)}
                    </Header>
                  </Item.Description>
                  <Item.Extra>
                    <Label basic color="teal">
                      <Icon name="shopping bag" /> {item.quantity}
                    </Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            )
          
        }
        
        return (
          <Item key={item.product.combo_id}>
            <Item.Content verticalAlign="middle">
              <div>
               <b>Combo: {item.product.combo_name}</b>
              </div>
              <Popconfirm
                placement="left"
                title="Are you sure delete this item?"
                onConfirm={() => this.props.removeFromCart(item.product.combo_id)}
                okText="Yes"
                cancelText="No"
              >
                <Button circular icon basic size="mini" floated="right">
                  <Icon name="times" />
                </Button>
              </Popconfirm>
              <div>
              Includes : {item.product.combo_details.map(it=> it.product.product_name + ' x ' + it.cbd_amount ).join(',')}
              </div>
              <div className="text-red">
                Combo Price: <b>{moneyFormat(item.product.combo_afterDiscount  * item.quantity)}</b>
              </div>
              <Item.Extra>
                  <Label basic color="teal">
                    <Icon name="shopping bag" /> {item.quantity}
                  </Label>
                </Item.Extra>
            </Item.Content>
          </Item>
        )
      });

    return null;
  };

  renderTotal = () => {
    const { products } = this.props;
    if (products && products.length > 0)
      return products
        .map(item => item.product.combo_id ?item.product.combo_afterDiscount * item.quantity : item.product.product_price * item.quantity)
        .reduce((total = 0, current) => total + current);
    return 0;
  };

  render() {
    const { isCheckout } = this.props
    if(!isCheckout)
    return (
      <Drawer
        title={
          <Button
            color="teal"
            content="Checkout"
            icon="cart"
            label={{
              basic: true,
              color: 'teal',
              content: moneyFormat(this.renderTotal())
            }}
            labelPosition="left"
            onClick={this.handleCheckout}
          />
        }
        width={350}
        placement="right"
        closable={true}
        onClose={() => this.props.toggleMiniCart(false)}
        visible={this.props.cartShow}
        bodyStyle={{ position: 'relative' }}
      >
        <Item.Group divided>
          {this.renderItem()}
        </Item.Group>
      </Drawer>
    );

    return (
      <Card className="w-100">
        <Card.Content>
        <Item.Group divided>
          {this.renderItem()}
        </Item.Group>
        </Card.Content>
        <Card.Meta>
        <div className="text-red" style={{padding: '1.2rem'}}>
            Tổng cộng: {moneyFormat(this.renderTotal())}
          </div>
          </Card.Meta>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return { ...state.cart, ...state.auth };
};

export default connect(
  mapStateToProps,
  { toggleMiniCart, removeFromCart }
)((MiniCart));
