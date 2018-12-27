import types from './action-types';

const chgColor = (ns, instance, newColor) => ({
  type: types.CHG_COLOR,
  payload: { ns, instance, newColor }
});

const chgLabel = (ns, instance, newLabel) => ({
  type: types.CHG_LABEL,
  payload: { ns, instance, newLabel }
});

const chgThemer = (ns, instance, newProps) => ({
  type: types.CHG_THEMER,
  payload: { ns, instance, newProps }
});

const chgTheme = (ns, instance, newTheme) => ({
  type: types.CHG_THEME,
  payload: { ns, instance, newTheme }
});

const chgThemeMap = (ns, instance, newThemeMap) => ({
  type: types.CHG_THEMEMAP,
  payload: { ns, instance, newThemeMap }
});


export default {
  chgLabel,
  chgColor,
  chgThemer,
  chgTheme,
  chgThemeMap
};
