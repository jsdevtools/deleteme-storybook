import types from './action-types';

const ruxcReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_RUXC:
      if (state[`${action.payload.ns + action.payload.instance}/content`] === undefined) {
        return {
          ...state,
          [`${action.payload.ns + action.payload.instance}/content`]: action.payload.newLabel,
          [`${action.payload.ns + action.payload.instance}/actions`]: Object.keys(action.payload.actionTypes),
          [`${action.payload.ns + action.payload.instance}/events`]: Object.keys(action.payload.events),
          [`${action.payload.ns + action.payload.instance}/styling`]: action.payload.styling
        };
      }
      if (action.payload.instance !== 'ignore') {
        // eslint-disable-next-line
        console.log(`Warning! - Duplicate instance of ${action.payload.instance}`);
      }
      return state;
    case types.CLR_RUXC:
      console.log('clearing', action.payload.instance);
      // eslint-disable-next-line no-case-declarations
      const retVal = { ...state };
      delete retVal[`${action.payload.ns + action.payload.instance}/content`];
      delete retVal[`${action.payload.ns + action.payload.instance}/actions`];
      delete retVal[`${action.payload.ns + action.payload.instance}/events`];
      delete retVal[`${action.payload.ns + action.payload.instance}/styling`];
      return retVal;
    default:
      return state;
  }
};

export default ruxcReducer;
