import types from './action-types';
import { ns } from '..';
import themes from '../theme';

const themerReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_THEMER:
      if (state[`${action.payload.ns + action.payload.instance}/themer`] === undefined) {
        return {
          ...state,
          [`${action.payload.ns + action.payload.instance}/themer`]: action.payload.theme
        };
      }
      if (action.payload.instance !== 'ignore') {
        // eslint-disable-next-line
        console.warn(`Warning! - Duplicate instance of ${action.payload.instance}`);
      }
      return state;
    case types.CHG_THEMER:
      if (state[`${ns + action.payload.instance}/themer`] === undefined) {
        return state;
      }
      return {
        ...state,
        [`${ns + action.payload.instance}/themer`]: {
          ...state[`${ns + action.payload.instance}/themer`],
          ...action.payload.newProps
        }
      };
    case types.CHG_THEME:
      if (state[`${ns + action.payload.instance}/themer`] === undefined) {
        return state;
      }
      return {
        ...state,
        [`${ns + action.payload.instance}/themer`]: themes[action.payload.newTheme]
      };
    case types.CLR_THEMER:
      // eslint-disable-next-line no-case-declarations
      const retVal = { ...state };
      delete retVal[`${action.payload.ns + action.payload.instance}/themer`];
      return retVal;
    default:
      return state;
  }
};

export default themerReducer;
