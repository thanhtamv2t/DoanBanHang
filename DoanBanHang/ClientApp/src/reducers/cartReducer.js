import {
  ADD_TO_CART,
  TOGGLE_MINICART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  FETCH_CART
} from '../actions/actionType';
import { addItems } from '../utils/cartUtils';

const initState = {
  products: [],
  cartShow: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return { ...state, products: action.payload};
    case ADD_TO_CART:
      return { ...state, products: addItems(state.products, action.payload) };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          item => item.product.combo_id ? item.product.combo_id !== action.payload : item.product.product_id !== action.payload
        )
      };
    case TOGGLE_MINICART:
      return { ...state, cartShow: action.payload };
    case CLEAR_CART:
      return { ...state, products: [] };
    default:
      return state;
  }
};
