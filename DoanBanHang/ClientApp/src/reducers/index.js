import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import categoriesReducer from './categoriesReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  categories: categoriesReducer,
  products: productReducer,
  cart: cartReducer
});
