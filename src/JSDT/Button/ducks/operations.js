import actions from './actions';

// This is a link to an action defined in actions.js.
const simpleChgLabel = actions.chgLabel;

// This is a thunk which dispatches multiple actions from actions.js
const complexChgLabel = (ns, instances, newLabel, dispatch) => dispatch(
  actions.chgLabel(ns, instances[0], newLabel)
).then(
  dispatch(actions.chgLabel(ns, instances[1], newLabel))
);

export default {
  simpleChgLabel,
  complexChgLabel
};
