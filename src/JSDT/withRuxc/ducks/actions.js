import types from './action-types';

const initRuxc = (ns, instance, newLabel, events, styling, actionTypes) => ({
  type: types.INIT_RUXC,
  payload: {
    ns, instance, newLabel, events, styling, actionTypes
  }
});

const clrRuxc = (ns, instance) => ({
  type: types.CLR_RUXC,
  payload: { ns, instance }
});

export default {
  initRuxc,
  clrRuxc
};
