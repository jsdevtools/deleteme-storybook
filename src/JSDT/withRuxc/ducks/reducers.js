import types from './action-types';

const ruxcReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_RUXC:
      if (state[`${action.payload.ns + action.payload.args.instance}/content`] === undefined) {
        return {
          ...state,
          [`${action.payload.ns + action.payload.args.instance}/content`]: action.payload.args.content,
          [`${action.payload.ns + action.payload.args.instance}/actions`]:
            Object.keys(action.payload.args.actionTypes),
          [`${action.payload.ns + action.payload.args.instance}/events`]:
            Object.keys(action.payload.args.events),
          [`${action.payload.ns + action.payload.args.instance}/styling`]: action.payload.args.styling,
          [`${action.payload.ns + action.payload.args.instance}/items`]: action.payload.args.items
        };
      }
      if (action.payload.instance !== 'ignore') {
        // eslint-disable-next-line
        console.warn(`Warning! - Duplicate instance of ${action.payload.instance}`);
      }
      return state;
    case types.CLR_RUXC:
      // eslint-disable-next-line no-case-declarations
      const retVal = { ...state };
      delete retVal[`${action.payload.ns + action.payload.instance}/content`];
      delete retVal[`${action.payload.ns + action.payload.instance}/actions`];
      delete retVal[`${action.payload.ns + action.payload.instance}/events`];
      delete retVal[`${action.payload.ns + action.payload.instance}/styling`];
      delete retVal[`${action.payload.ns + action.payload.instance}/items`];
      return retVal;
    default:
      return state;
  }
};

export default ruxcReducer;
