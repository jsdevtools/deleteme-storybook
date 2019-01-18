import types from './action-types';

const chgColor = (ns, instance, newColor) => ({
  type: types.CHG_COLOR,
  payload: { ns, instance, newColor }
});

const chgLabel = (ns, instance, newLabel) => ({
  type: types.CHG_LABEL,
  payload: { ns, instance, newLabel }
});

const chgTheme = (ns, instance, newTheme) => ({
  type: types.CHG_THEME,
  payload: { ns, instance, newTheme }
});

export default {
  chgLabel,
  chgColor,
  chgTheme
};
