import types from './action-types';

const initThemer = (ns, instance, theme) => ({
  type: types.INIT_THEMER,
  payload: { ns, instance, theme }
});

const clrThemer = (ns, instance) => ({
  type: types.CLR_THEMER,
  payload: { ns, instance }
});

const chgThemer = (ns, instance, newProps) => ({
  type: types.CHG_THEMER,
  payload: { ns, instance, newProps }
});

const chgTheme = (ns, instance, newTheme) => ({
  type: types.CHG_THEME,
  payload: { ns, instance, newTheme }
});

export default {
  initThemer,
  clrThemer,
  chgThemer,
  chgTheme
};
