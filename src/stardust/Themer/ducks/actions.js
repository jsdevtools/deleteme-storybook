// eslint-disable-next-line no-unused-vars
import types from './action-types';

const chgTheme = (ns, instance, newTheme) => ({
  type: types.CHG_THEME,
  payload: { ns, instance, newTheme }
});

export default {
  chgTheme
};
