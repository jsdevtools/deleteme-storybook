import uuidv4 from 'uuid/v4';

const uuid = uuidv4();
const libName = 'stardux-0.1';
const ns = [uuid, libName, ''].join('/');

export {
  uuid,
  libName,
  ns
};
