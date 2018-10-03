/**
 * This is the redux Store configuration file.
 *
 * Plugin:
 * 1. redux-thunk: This plugin help to use the middleware
 * 2. redux-persist: This plugin help to store the redux state into local storage
 * 3. redux-action-buffer: This plugin help to set a buffer to do some setup before the app trigger the first action.
 *
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { REHYDRATE, PURGE, persistStore } from 'redux-persist'
import createActionBuffer from 'redux-action-buffer';
import persistReducers from '../reducers/index';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


export default () => {
  const store = createStore(
    persistReducers,
    undefined,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  const persistor = persistStore(store, null, () => {console.log("tset")});
  return { store, persistor };
}
// export default createStoreWithMiddleware(persistReducers);
