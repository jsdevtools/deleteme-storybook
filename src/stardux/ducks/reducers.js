import types from './action-types';
import { libName, uuid } from '../ns';

const ns = [uuid, libName, ''].join('/');

const starduxReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INIT_STARDUX: {
      // console.log('INIT_STARDUX');
      const { instance, initProps } = action.payload;
      const retVal = state;
      Object.keys(initProps)
        .filter(propName => (
          state[`${ns}${instance}/${propName}`] === undefined
        )).forEach((undefPropName) => {
          retVal[`${ns}${instance}/${undefPropName}`] = initProps[undefPropName];
        });
      // console.log('retVal', retVal);
      return retVal;
    }
    case types.CLR_STARDUX: {
      // console.log('CLR_STARDUX');
      const { instance } = action.payload;
      const retVal = state;
      Object.keys(state)
        .filter(key => (key.includes(`${ns}${instance}`)))
        .forEach((match) => {
          delete retVal[match];
        });
      // console.log('retVal', retVal);
      return retVal;
    }
    case types.CHG_PROPS:
      console.log(`Reached ${action.type}`, action);
      return {
        ...state,
        ...Object.keys(action.payload.newProps).reduce((acc, propName) => ({
          ...acc,
          [`${ns}${action.payload.instance}/${propName}`]: action.payload.newProps[propName]
        }), {})
      };
    case types.OVERLAY_PROPS:
      console.log(`Reached ${action.type}, warning! not implemented.`, action);
      return state;
    default:
      return state;
  }
};

export default starduxReducer;
