import types from './action-types';

const stylingReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_STYLING:
      if (state[`${action.payload.ns + action.payload.instance}/styling`] === undefined) {
        return {
          ...state,
          [`${action.payload.ns + action.payload.instance}/styling`]: action.payload.styling
        };
      }
      if (action.payload.instance !== 'ignore') {
        // eslint-disable-next-line
        console.warn(`Warning! - Duplicate instance of ${action.payload.instance}`);
      }
      return state;
    case types.CLR_STYLING:
      // eslint-disable-next-line no-case-declarations
      const retVal = { ...state };
      delete retVal[`${action.payload.ns + action.payload.instance}/styling`];
      return retVal;
    default:
      return state;
  }
};

export default stylingReducer;
