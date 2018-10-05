import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './RootContainer';



/**
 * Import .httaccess if you are using Apache as the hosting server.
 */
import './.htaccess';



const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

// render(
//   <AppContainer>
//     <RootContainer />
//   </AppContainer>
//   , document.getElementById('root')
// );
render(RootContainer);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./RootContainer.jsx', () => {
    // if you are using harmony modules ({modules:false})
    const NextApp = require('./RootContainer.jsx').default;
    render(NextApp);
    // render(RootContainer);
    // in all other cases - re-require App manually
    // render(require('./containers/RootContainer'))
  });
}



