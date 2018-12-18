import { action } from '@storybook/addon-actions';
import types from '../../withRuxc/ducks/action-types';

const StoryActionLoggerReducer = (state = {}, actionArg) => {
  switch (actionArg.type) {
    case types.INIT_RUXC:
      return state;
    case types.CLR_RUXC:
      return state;
    default:
      switch (actionArg.type.slice(0, 2)) {
        case '@@':
          return state;
        default:
          action(actionArg.type)(actionArg.payload.instance, actionArg.payload);
          return state;
      }
  }
};

export default StoryActionLoggerReducer;
