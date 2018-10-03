import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class AsyncRoute extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    this.props.loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  component = null;

  render() {
    if (this.state.loaded) {
      return <this.component {...this.props.props} />;
    }
    return <div>Loading....</div>;
  }
}

AsyncRoute.propTypes = {};
AsyncRoute.defaultProps = {};

export default AsyncRoute;
