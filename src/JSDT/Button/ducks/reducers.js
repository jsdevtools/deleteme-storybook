import types from './action-types';
import { ns } from '..';

const buttonReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CHG_COLOR:
      return Object.keys(state)
        .filter(key => key.includes(`${ns}${action.payload.instance}/styling`))
        .reduce((acc, curr) => {
          const retVal = {
            ...acc,
            [curr]: {
              ...state[curr],
              ...action.payload.newColor
            }
          };
          return retVal;
        }, { ...state });
    case types.CHG_LABEL:
      return Object.keys(state)
        .filter(key => key.includes(`${ns}${action.payload.instance}/content`))
        .reduce((acc, curr) => (
          { ...acc, [curr]: { label: action.payload.newLabel } }
        ), { ...state });
    case types.CHG_THEMEMAP:
      if (state[`${action.payload.ns}${action.payload.instance}/themeMap`] === undefined) {
        return state;
      }
      return {
        ...state,
        [`${action.payload.ns}${action.payload.instance}/themeMap`]: {
          ...state[`${action.payload.ns}${action.payload.instance}/themeMap`],
          ...action.payload.newThemeMap
        }
      };
    default:
      return state;
  }
};

export default buttonReducer;
