import types from './action-types';

const initStyling = (ns, instance, styling) => ({
  type: types.INIT_STYLING,
  payload: {
    ns, instance, styling
  }
});

const clrStyling = (ns, instance) => ({
  type: types.CLR_STYLING,
  payload: { ns, instance }
});

export default {
  initStyling,
  clrStyling
};
