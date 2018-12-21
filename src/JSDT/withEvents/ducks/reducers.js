import types from './action-types';

const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_EVENTS:
      if (state[`${action.payload.ns + action.payload.instance}/events`] === undefined) {
        return {
          ...state,
          [`${action.payload.ns + action.payload.instance}/events`]: Object.keys(action.payload.events)
        };
      }
      if (action.payload.instance !== 'ignore') {
        // eslint-disable-next-line
        console.warn(`Warning! - Duplicate instance of ${action.payload.instance}`);
      }
      return state;
    case types.CLR_EVENTS:
      // eslint-disable-next-line no-case-declarations
      const retVal = { ...state };
      delete retVal[`${action.payload.ns + action.payload.instance}/events`];
      return retVal;
    default:
      return state;
  }
};

export default eventsReducer;
