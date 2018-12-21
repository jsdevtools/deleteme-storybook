import types from './action-types';

const actionsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_ACTIONS:
      if (state[`${action.payload.ns + action.payload.instance}/actions`] === undefined) {
        return {
          ...state,
          [`${action.payload.ns + action.payload.instance}/actions`]: Object.keys(action.payload.actionTypes)
        };
      }
      if (action.payload.instance !== 'ignore') {
        // eslint-disable-next-line
        console.warn(`Warning! - Duplicate instance of ${action.payload.instance}`);
      }
      return state;
    case types.CLR_ACTIONS:
      // eslint-disable-next-line no-case-declarations
      const retVal = { ...state };
      delete retVal[`${action.payload.ns + action.payload.instance}/actions`];
      return retVal;
    default:
      return state;
  }
};

export default actionsReducer;
