import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
// import Main from '../Main/Main';
// import Test from '../Test';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';

// // import TEMPLATE_COMPONENT from '../components/TEMPLATE';
// import scss from '../components/TEMPLATE.scss';
// import Tabs from '../components/Tabs/Tabs';
// import Tab from '../components/Tabs/Tab';

// import { normal_action, action_with_middleware } from '../redux/actions/action.template'

/**
 * This is the template of a react component that connec with redux.
 *
 * Plugins:
 * classname: This plugin is helping to join different class when you use the css module.
 */

class App extends Component {
  render() {
    console.log(this.props);
    const URLPrefix =
      this.props.match.path === '/' ? '' : this.props.match.path;
    return (
      <div>
        HELLO
      </div>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

/**
 * The normal action will be dispatch the return derectly.
 * The middleAction will not be dispatch until the user call dispatch in the function.
 */
export default connect((state, ownProps) => ({}), {})(App);
