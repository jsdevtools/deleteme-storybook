import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storiesOf, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import store from '../../app/state/store';
import { Button, ColoredButton } from '.';
import { StoryActionLogger } from '../StoryActionLogger';

const theme = {
  borderWidth: '2px',
  'button.primary': 'mediumseagreen',
  'button.secondary': 'magenta'
};

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    { storyFn() }
  </ThemeProvider>
);

const ReduxDecorator = storyFn => (
  <ReduxProvider store={store}>
    <StoryActionLogger/>
      { storyFn() }
  </ReduxProvider>
);

addDecorator(withNotes);
addDecorator(ThemeDecorator);
addDecorator(ReduxDecorator);

storiesOf('Button', module)
  .add(
    'Button',
    () => (
          <Button
            instance='superbutton'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'superbutton8',
                arguments: {
                  newLabel: 'Foo'
                }
              }
            }}
            initStyling={{
              color: 'blue'
            }}
            initContent={{
              label: 'Hola'
            }}
          />
    ),
    { notes: 'HI' }
  )
  .add(
    'ColoredButton',
    () => (
        <Button
          instance='superbutton2'
          actions={{
            onClick: {
              action: 'chgLabel',
              target: 'superbutton',
              arguments: {
                newLabel: 'Foo'
              }
            }
          }}
          initContent={{
            label: 'Adios'
          }}
          render={(actions, content, styling) => (
            <ColoredButton actions={actions} styling={styling}>
              {content.label}
            </ColoredButton>
          )}
        />
    )
  );
