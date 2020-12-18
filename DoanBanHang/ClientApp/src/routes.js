import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import UserProfile from './components/User/UserProfile';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Combos from './components/Combos';
import Checkout from './components/Checkout';
const Routes = [
  {
    path: '/checkout',
    component: Checkout
  },
  {
    path: '/combos',
    component: Combos
  },
  {
    path: '/auth/signin',
    component: SignIn
  },
  {
    path: '/auth/signup',
    component: SignUp
  },
  {
    path: '/users',
    component: UserProfile,
    isPrivate: true
  },
  {
    path: '/products/:slug',
    component: ProductDetail
  },
  {
    path: '/categories/:slug/:page?',
    component: ProductList
  },
  {
    path: '/',
    component: Home
  }
];

export default Routes;
