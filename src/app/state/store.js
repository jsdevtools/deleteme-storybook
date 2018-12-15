import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import JSDTreducers from '../../JSDT';
// import JSDT2reducers from '../../JSDT2';

const rootReducer = (state = {}, action) => (
  Object.values({ ...JSDTreducers }).reduce((acc, curr) => (
    curr(acc, action)
  ), state)
);

const store = createStore(rootReducer, devToolsEnhancer(
  // Custom devTools options
));

export default store;
