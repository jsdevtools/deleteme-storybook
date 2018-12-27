import types from './action-types';
import { ns } from '..';

const buttonReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CHG_COLOR:
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
    case types.CHG_LABEL:
      return Object.keys(state)
        .filter(key => key.includes(`${ns}${action.payload.instance}/content`))
        .reduce((acc, curr) => (
          { ...acc, [curr]: { label: action.payload.newLabel } }
        ), { ...state });
    default:
      return state;
  }
};

export default buttonReducer;
