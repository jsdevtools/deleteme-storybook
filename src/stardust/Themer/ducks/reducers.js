import types from './action-types';
// import { ns } from '..';

const themerReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CHG_LABEL:
      return Object.keys(state)
        .filter(key => key.includes(`${action.payload.instance}/content`))
        .reduce((acc, curr) => (
          { ...acc, [curr]: { label: action.payload.newLabel } }
        ), { ...state });
    default:
      return state;
  }
};

export default themerReducer;
