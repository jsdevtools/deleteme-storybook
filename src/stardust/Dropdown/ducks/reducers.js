import types from './action-types';
import { ns } from '..';

const dropdownReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CHG_SEARCHQUERY:
      console.log('reached case for CHG_SEARCHQUERY');
      return {
        ...state,
        [`${ns}${action.payload.instance}/searchQuery`]: action.payload.searchQuery
      };
    case types.CHG_OPTIONS:
      console.log('reached placeholder for CHG_OPTIONS', ns, action, state);
      return state;
      /*
      return Object.keys(state)
        .filter(key => key.includes(`${ns}${action.payload.instance}/styling`))
        .reduce((acc, curr) => {
          console.log('STARDUST HIT', state, ns, action);
          return {
            ...acc,
            [curr]: {
              ...state[curr],
              color: {
                ...state[curr].color,
                effective: action.payload.newColor
              }
            }
          }
        }, { ...state });
      */
    case types.CHG_SELECTION:
      console.log('reached placeholder for CHG_SELECTION', ns, action, state);
      return state;
      /*
      return Object.keys(state)
        .filter(key => key.includes(`${ns}${action.payload.instance}/content`))
        .reduce((acc, curr) => (
          { ...acc, [curr]: { label: action.payload.newLabel } }
        ), { ...state });
      */
    default:
      return state;
  }
};

export default dropdownReducer;
