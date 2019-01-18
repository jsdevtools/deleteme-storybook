import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
// import JSDTreducers from '../../JSDT';
// import StardustReducers from '../../stardust';
import StarduxReducers from '../../stardux';

const rootReducer = (state = {}, action) => (
  // Object.values({ ...JSDTreducers, ...StardustReducers, ...StarduxReducers }).reduce((acc, curr) => (
  Object.values({ ...StarduxReducers }).reduce((acc, curr) => (
    curr(acc, action)
  ), state)
);

const store = createStore(rootReducer, devToolsEnhancer(
  // Custom devTools options
));

export default store;
