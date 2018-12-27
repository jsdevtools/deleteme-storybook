import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storiesOf, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { themes, Text } from '@stardust-ui/react';
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
    'Default',
    () => (
      <Themer
        instance='themer'
      >
        <React.Fragment>
          <br/>
          <Text size='large' weight='bold' content='Default:'/>
          <br/>
          <Button
              instance='suirbutton1a'
              actions={{
                onClick: {
                  action: 'chgLabel',
                  target: 'themer',
                  arguments: {
                    newLabel: themes.teams
                  }
                }
              }}
              initContent={{
                label: 'Click Here'
              }}
            />
            <Button
              instance='suirbutton1b'
              actions={{
                onClick: {
                  action: 'chgLabel',
                  target: 'themer',
                  arguments: {
                    newLabel: themes.teamsHighContrast
                  }
                }
              }}
              initContent={{
                label: 'See how this very long text shows up on the button'
              }}
            />
          <br/>
          <br/>
          <Text size='large' weight='bold' content='Emphasis:'/>
          <br/>
          <Button
            primary
            instance='suirbutton2a'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teams
                }
              }
            }}
            initContent={{
              label: 'Primary'
            }}
          />
          <Button
            secondary
            instance='suirbutton2b'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teamsHighContrast
                }
              }
            }}
            initContent={{
              label: 'Secondary'
            }}
          />
          <br/>
          <br/>
          <Text size='large' weight='bold' content='Icon:'/>
          <br/>
          <Button
            primary
            icon='book'
            instance='suirbutton3a'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teams
                }
              }
            }}
          />
          <Button
            secondary
            icon='book'
            instance='suirbutton3b'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teamsHighContrast
                }
              }
            }}
          />
          <br/>
          <br/>
          <Text size='large' weight='bold' content='Icon Only:'/>
          <br/>
          <Button
            primary
            icon='book'
            iconOnly
            instance='suirbutton4a'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teams
                }
              }
            }}
          />
          <Button
            secondary
            icon='book'
            iconOnly
            instance='suirbutton4b'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teamsHighContrast
                }
              }
            }}
          />
          <br/>
          <br/>
          <Text size='large' weight='bold' content='Icon and Content:'/>
          <br/>
          <Button
            primary
            icon='book'
            iconPosition='before'
            instance='suirbutton5a'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teams
                }
              }
            }}
            initContent={{
              label: 'Click me before'
            }}
          />
          <Button
            primary
            icon='book'
            iconPosition='after'
            instance='suirbutton5b'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teams
                }
              }
            }}
            initContent={{
              label: 'Click me after'
            }}
          />
          <Button
            secondary
            icon='book'
            iconPosition='before'
            instance='suirbutton5c'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teamsHighContrast
                }
              }
            }}
            initContent={{
              label: 'Click me before'
            }}
          />
          <Button
            secondary
            icon='book'
            iconPosition='after'
            instance='suirbutton5d'
            actions={{
              onClick: {
                action: 'chgLabel',
                target: 'themer',
                arguments: {
                  newLabel: themes.teamsHighContrast
                }
              }
            }}
            initContent={{
              label: 'Click me after'
            }}
          />
        </React.Fragment>
      </Themer>
    ),
    { notes: 'A default button.' }
  );
