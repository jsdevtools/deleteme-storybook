import types from './action-types';

const initRuxc = (ns, args) => ({
  type: types.INIT_RUXC,
  payload: {
    ns, args
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
