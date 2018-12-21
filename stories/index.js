import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';

import { Provider, themes, Button as SUIRButton } from '@stardust-ui/react';

storiesOf('stories/Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('stardust button', () => (
    <Provider theme={themes.teams}>
      <SUIRButton content="Theming" icon="add" iconPosition="after" primary />
    </Provider>
  ));
