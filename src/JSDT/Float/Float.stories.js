import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Float from '.';

storiesOf('Float', module)
  .add(
    'Top Left',
    () => <Float placement='topLeft' zIndex={20} margin='10px'/>,
    { notes: 'HI' }
  )
  .add(
    'Top Right',
    () => <Float placement='topRight' zIndex={20} margin='10px'/>
  )
  .add(
    'Top',
    () => <Float placement='top' zIndex={20} margin='10px'/>
  );
