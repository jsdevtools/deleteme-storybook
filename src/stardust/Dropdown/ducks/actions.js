import types from './action-types';

const chgOptions = (ns, instance, newOptions) => ({
  type: types.CHG_OPTIONS,
  payload: { ns, instance, newOptions }
});

const chgSelected = (ns, instance, selection) => ({
  type: types.CHG_SELECTED,
  payload: { ns, instance, selection }
});

const chgSearchQuery = (ns, instance, searchQuery) => ({
  type: types.CHG_SEARCHQUERY,
  payload: { ns, instance, searchQuery }
});

export default {
  chgOptions,
  chgSelected,
  chgSearchQuery
};
