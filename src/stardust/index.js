import themerReducer, { nsReducer as nsThemerReducer } from './Themer';
import buttonReducer, { nsReducer as nsButtonReducer } from './Button';
import dropdownReducer, { nsReducer as nsDropdownReducer } from './Dropdown';

export default {
  [nsThemerReducer]: themerReducer,
  [nsButtonReducer]: buttonReducer,
  [nsDropdownReducer]: dropdownReducer
};
