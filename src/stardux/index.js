import starduxReducer from './ducks/reducers';
import { nsReducer as nsStarduxReducer } from './withStardux';

export default {
  [nsStarduxReducer]: starduxReducer
};
