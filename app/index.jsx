import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import RootContainer from './RootContainer';
// import './scss/vendors/_index.scss';
// import './vendors/materialize/js/bin/materialize';


/**
 * Import .httaccess if you are using Apache as the hosting server.
 */
import './.htaccess';
// import 'index.html';

// Import each of the images in the images folder.


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



