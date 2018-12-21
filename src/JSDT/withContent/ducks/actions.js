import types from './action-types';

const initContent = (ns, instance, newContent) => ({
  type: types.INIT_CONTENT,
  payload: {
    ns, instance, newContent
  }
});

const clrContent = (ns, instance) => ({
  type: types.CLR_CONTENT,
  payload: { ns, instance }
});

export default {
  initContent,
  clrContent
};
