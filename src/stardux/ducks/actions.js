import types from './action-types';

const initStardux = (instance, initProps) => ({
  type: types.INIT_STARDUX,
  payload: {
    instance, initProps
  }
});

const clrStardux = instance => ({
  type: types.CLR_STARDUX,
  payload: { instance }
});

const chgProps = (instance, newProps) => ({
  type: types.CHG_PROPS,
  payload: { instance, newProps }
});

const overlayProps = (instance, newProps) => ({
  type: types.OVERLAY_PROPS,
  payload: { instance, newProps }
});

export default {
  initStardux,
  clrStardux,
  chgProps,
  overlayProps
};
