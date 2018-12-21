import types from './action-types';

const initActions = (ns, instance, actionTypes) => ({
  type: types.INIT_ACTIONS,
  payload: {
    ns, instance, actionTypes
  }
});

const clrActions = (ns, instance) => ({
  type: types.CLR_ACTIONS,
  payload: { ns, instance }
});

export default {
  initActions,
  clrActions
};
