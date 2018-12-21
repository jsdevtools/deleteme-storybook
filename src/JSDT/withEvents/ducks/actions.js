import types from './action-types';

const initEvents = (ns, instance, events) => ({
  type: types.INIT_EVENTS,
  payload: {
    ns, instance, events
  }
});

const clrEvents = (ns, instance) => ({
  type: types.CLR_EVENTS,
  payload: { ns, instance }
});

export default {
  initEvents,
  clrEvents
};
