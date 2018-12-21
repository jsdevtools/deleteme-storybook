import types from './action-types';

const contentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_CONTENT:
      if (state[`${action.payload.ns + action.payload.instance}/content`] === undefined) {
        return {
          ...state,
          [`${action.payload.ns + action.payload.instance}/content`]: action.payload.newContent
        };
      }
      if (action.payload.instance !== 'ignore') {
        // eslint-disable-next-line
        console.warn(`Warning! - Duplicate instance of ${action.payload.instance}`);
      }
      return state;
    case types.CLR_CONTENT:
      // eslint-disable-next-line no-case-declarations
      const retVal = { ...state };
      delete retVal[`${action.payload.ns + action.payload.instance}/content`];
      return retVal;
    default:
      return state;
  }
};

export default contentReducer;
