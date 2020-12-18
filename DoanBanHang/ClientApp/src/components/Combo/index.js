import React from 'react';
import { Card } from 'semantic-ui-react';
import { moneyFormat } from '../../utils';
import AddToCart from '../Product/AddToCart';

const Combo = ({item}) => {
    return (
        <Card className="combo-card">
            <div className="text-center">
                <div>
                    Combo
                </div>
                <h1>
                    {item.combo_name}
                </h1>
                <h3 class="stroke-line">
                    {moneyFormat(item.combo_totalPrice)}
                </h3>
                <h2 className="text-red">
                    {moneyFormat(item.combo_afterDiscount)}
                </h2>
                <hr />
                <ul className="combo-list">
                    {item.combo_details.map(it => (
                        <li className="combo-list-item">
                            <div className="combo-list-item-image">
                                <img src={it.product.product_image} alt=""/>
                            </div>
                            <div className="combo-list-item-content">
                                <div>
                                    {it.product.product_name}
                                </div>
                                <div>
                                    x {it.cbd_amount}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                
            </div>
            <div className="add-to-cart-container">
            <AddToCart product={item} />
            </div>
        </Card>
    )
}

export default Combo