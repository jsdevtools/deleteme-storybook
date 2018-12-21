import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storiesOf, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { themes } from '@stardust-ui/react';
import { Themer } from '../Themer';
import store from '../../app/state/store';
import { StoryActionLogger } from '../../JSDT/StoryActionLogger';
import { Button } from '.';

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

storiesOf('stardust/Button', module)
  .add(
    'Button',
    () => (
      <Themer
        instance='themer'
      >
        <React.Fragment>
          <Button
            icon="add"
            iconPosition="after"
            primary
            instance='suirbutton1'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teams
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
          <Button
            icon="add"
            iconPosition="after"
            primary
            instance='suirbutton2'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teamsHighContrast
                }
              }
            }}
            initStyling={{
              color: 'blue'
            }}
            initContent={{
              label: 'Adios'
            }}
          />
        </React.Fragment>
      </Themer>
    ),
    { notes: 'HI' }
  );
