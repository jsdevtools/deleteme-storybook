import buttonReducer, { nsReducer as nsButtonReducer } from './Button';
import themerReducer, { nsReducer as nsThemerReducer } from './Themer';

export default {
  [nsButtonReducer]: buttonReducer,
  [nsThemerReducer]: themerReducer
};
