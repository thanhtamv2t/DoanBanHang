import React from 'react';
import { Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import Header from './Header';
import Routes from '../routes';
import { getMe, toggleMiniCart, fetchCategories } from '../actions';
import RouterView from '../utils/RouterView';
import '../scss/style.scss';
import 'antd/dist/antd.css';
import MiniCart from './MiniCart';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  whyDidYouRender(React);
}

class App extends React.Component {
  componentDidMount = async () => {
    const { getMe, fetchCategories, isSignedIn } = this.props;
    if (isSignedIn) await getMe();
    await fetchCategories();
    //Fetch Products
  };

  renderRoutes = () => {
    return Routes.map(({ path, component, isPrivate }) => (
      <RouterView
        path={path}
        isPrivate={isPrivate}
        component={component}
        key={path}
      />
    ));
  };

  render() {
    return (
      <Router history={history}>
        <div className="ui">
          <Header />
          <MiniCart />
          <Switch>{this.renderRoutes()}</Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  visible: state.cart.cartShow
});

export default connect(
  mapStateToProps,
  { getMe, toggleMiniCart, fetchCategories }
)(App);
