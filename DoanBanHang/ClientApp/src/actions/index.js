import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  FETCH_CATEGORIES,
  TOGGLE_CATEGORIES,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_POPULAR_PRODUCT,
  UNMOUNT_PAGE,
  TOGGLE_MINICART,
  UNMOUNT_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  FETCH_CART,
  SEARCH_PRODUCT
} from './actionType';
import axios from '../api/axios';
import { notification } from 'antd';
// import _ from 'lodash';

// Authentication Action Creator

export const signUp = formValues => async dispatch => {
  let response = {};
  try {
    response = await axios.post('/user/register', { ...formValues });
    response = response.data;
  } catch (e) {
    response.error = e.repsonse.data;
  }
  dispatch({ type: SIGN_UP, payload: response });

  return response;
};

export const signIn = ({email,password}) => async dispatch => {
  let response;
  try {
    response = await axios.post('/user/login', { cus_username: email, cus_password: password  });
    response = response.data;
    console.log("🚀 ~ file: index.js ~ line 43 ~ response", response.user)

    localStorage.setItem('token', response.token);
    dispatch({ type: SIGN_IN, payload: response.user });
    notification.success({
      title: "Đăng nhập thành công!",
      description:"Bạn sẽ được chuyển hướng trong giây lát!~"
    })
  } catch (e) {
    response = { error: e.response.data };
    console.log(response);
    notification.error({
      title: "Lỗi",
      description:"Sai thông tin đăng nhập!"
    })
  }

  //Dispatch get cart
  //dispatch()

  return response;
};

export const signOut = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: SIGN_OUT });
  dispatch({ type: CLEAR_CART });
};

export const getMe = () => async dispatch => {
  const token = localStorage.getItem('token');

  if (token) {
    // get User and dispatch
    try {
      const response = await axios.get('/user/me');
      dispatch({ type: SIGN_IN, payload: response.data.user });
      dispatch(fetchCart());
    } catch (e) {
      dispatch({ type: SIGN_OUT });
    }
  }
};

// Categories Action Creator
export const toggleMiniCart = visible => dispatch => {
  dispatch({ type: TOGGLE_MINICART, payload: visible });
};

export const toggleCategories = visible => async dispatch => {
  dispatch({ type: TOGGLE_CATEGORIES, payload: visible });
};

export const fetchCategories = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/categories');
    dispatch({ type: FETCH_CATEGORIES, payload: response.data });
  } catch (e) {
    console.log(e);
  }

  return response;
};

// Products Action Creator
// const _fetchProducts = _.memoize(async (params, dispatch) => {});
export const fetchProducts = params => async dispatch => {
  try {
    const response = await axios.get(`/products/categories/${params}`);
    dispatch({ type: FETCH_PRODUCTS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const fetchProduct = slug => async dispatch => {
  try {
    const response = await axios.get(`/products/${slug}`);
    dispatch({ type: FETCH_PRODUCT, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const fetchPopularProduct = () => async dispatch => {
  try {
    const response = await axios.get(`/products?sort=-sold&limit=8`);
    dispatch({ type: FETCH_POPULAR_PRODUCT, payload: response.data.data });
  } catch (e) {
    console.log(e);
  }
};

export const searchProduct = (keyword) => async dispatch => {
  try {
    const response = await axios.post('/products/search', { keyword });
    const { data } = response.data;
    dispatch({type: SEARCH_PRODUCT, payload: data});
  } catch(e) {
    console.log(e);
  }
}

export const unmountProducts = () => dispatch => {
  dispatch({ type: UNMOUNT_PAGE });
};

export const unmountProduct = () => dispatch => {
  dispatch({ type: UNMOUNT_PRODUCT });
};

export const addToCart = product => async dispatch => {
console.log("🚀 ~ file: index.js ~ line 156 ~ product", product)
  // await axios.post(`/cart`, { productId: product._id });

  dispatch({ type: ADD_TO_CART, payload: product });

  return true;
};

export const removeFromCart = productId => async dispatch => {

  dispatch({ type: REMOVE_FROM_CART, payload: productId });

  return true;
};


export const clearCart = () => dispatch => {
  dispatch({ type: CLEAR_CART });
}
export const fetchCart  = () => async dispatch => {
  const response = await axios.get('/cart');
  const { data } = response.data;
  dispatch({type: FETCH_CART, payload: data})
}