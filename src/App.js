import React from 'react';
import { Route, NavLink, Switch, withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/Index'
import User from './containers/User';
import { Layout } from './components/Layout/Layout';
import LayoutShopping from './components/Layout/LayoutShopping';
import LayoutSearch from './components/Layout/LayoutSearch';
import { LayoutCompare } from './components/Layout/LayoutCompare';
import LayoutShoppingMain from './components/Layout/LayoutShoppingMain';

class App extends React.Component {

  // TODO: disable this property
  state = {
    is_test: false,
  }

  componentDidMount(){
    console.log(this.props);
    this.props.initLogState();
  }

  render() {
    

    let startpage = (
      <div className="App-header">

        <Layout></Layout>

        <nav className="App-link">
          <NavLink to="/login">Login/Signup</NavLink>
        </nav>
        <Switch>
          <Route path="/login" component={Auth}/>
        </Switch>
      </div>
    );

    // auth
    if(this.props.isAuthenticated && !this.state.is_test) {
      startpage = (
      <div>
        <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="node_modules/jquery/dist/jquery.slim.min.js"></script>

        <div>
        
          <Switch>
              <Route path="/search" component={LayoutSearch}/>
              <Route path="/shopping" component={LayoutShoppingMain}/>
              <Redirect to="/search"></Redirect>
          </Switch>
        </div>
      </div>
      )
    }
    else
    // page 
    if(this.state.is_test){
      startpage = (
        <div>
          testpage
        </div>
      );
    }

    return startpage;
  }
}

const mapStateToProps = state => ({
    logo: state.auth.logo,
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    initLogState: ()=>actions.authCheckState()(dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
