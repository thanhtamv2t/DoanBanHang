import { Empty, notification } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Container, Grid, Input, Radio } from 'semantic-ui-react'
import axios from '../api/axios'
import MiniCart from './MiniCart'
import {clearCart } from '../actions/index'
const Checkout = (props) => {
  const [invoice_address, set_invoice_address] = useState('')
  const [invoice_note, set_invoice_note] = useState('')
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = async  (e) => {
      e.preventDefault()
      const { products,clearCart } = props;
      let total = 0;
      if (products && products.length > 0)
      total = products
        .map(item => item.product.combo_id ?item.product.combo_afterDiscount * item.quantity : item.product.product_price * item.quantity)
        .reduce((total = 0, current) => total + current);
      //transform data
      const invoice = {
          invoice_address,
          invoice_note,
          invoice_totalPrice:total,
          details: products.map(it => {
              let detail = {}

              if(it.product.combo_id)
              {
                detail.ind_amountC = it.quantity
                detail.combo_id = it.product.combo_id
              }
              else {
                  detail.ind_amountP = it.quantity
                  detail.product_id = it.product.product_id
              }

              return detail
          })
      }


      const response = await axios.post('user/checkout',invoice);

    const data = response.data;

    if(data.status)
    {
      setIsSuccess(true)
      notification.success({
        description: "Đặt hàng thành công, vui lòng chờ phản hồi từ phía nhân viên!"
      })
      clearCart();
      
    } else {
      notification.error({
        description: "Xảy ra lỗi, vui lòng thử lại sau ít phút"
      })
      }
        
  }
  if (isSuccess) {
    return (
      <Container>
        <div className="text-center">
          <h1 className="teal">
            Đặt hàng thành công
          </h1>
        </div>
      </Container>
    )
  }
  return (
    <Container>
      <Grid>
        <Grid.Column width={8}>
          <h1>Thông tin thanh toán</h1>
          <Card className="w-100">
            <Card.Content>
              <form onSubmit={handleCheckout}>
                <div style={{ margin: '1.2rem 0' }}>Địa chỉ nhận hàng</div>
                <Input onChange={(e) => set_invoice_address(e.target.value)} />
                <div style={{ margin: '1.2rem 0' }}>Ghi chú</div>
                <Input onChange={(e) => set_invoice_note(e.target.value)} />

                <div className='row' style={{ margin: '2.4rem 0' }}>
                  <Radio checked={true}></Radio>
                  Thanh toán khi nhận hàng
                </div>

                <div style={{ margin: '2.4rem 0' }}>
                  <Button disabled={invoice_address.length ===0 || (props.products && props.products.length === 0)} color='teal'>Check out</Button>
                </div>
              </form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <h1>Thông tin đơn hàng</h1>
          
          {(props.products && props.products.length === 0) ? <Empty /> : (
          <MiniCart isCheckout={true} />  
          )}
        </Grid.Column>
      </Grid>
    </Container>
  )
}

const mapStateToProps = state => {
  return { ...state.cart, ...state.auth };
};

export default connect(mapStateToProps, {
  clearCart
})(Checkout)
