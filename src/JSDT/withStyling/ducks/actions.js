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

const initThemeMap = (ns, instance, themeMap) => ({
  type: types.INIT_THEMEMAP,
  payload: {
    ns, instance, themeMap
  }
});

const clrThemeMap = (ns, instance) => ({
  type: types.CLR_THEMEMAP,
  payload: {
    ns, instance
  }
});

export default {
  initStyling,
  clrStyling,
  initThemeMap,
  clrThemeMap
};
