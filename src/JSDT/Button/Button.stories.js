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

const emptyTheme = {};

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    { storyFn() }
  </ThemeProvider>
);

const EmptyThemeDecorator = storyFn => (
  <ThemeProvider theme={emptyTheme}>
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
addDecorator(ReduxDecorator);

storiesOf('JSDT/Button', module)
  .addDecorator(ThemeDecorator)
  .add(
    'Button', () => (
      <Button
        instance='superbutton'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton8', arguments: { newLabel: 'Foo' } }
        }}
        initStyling={{ color: 'blue' }}
        initContent={{ label: 'Hola' }}
      />
    ), { notes: 'HI' }
  )
  .add(
    'ColoredButton', () => (
      <Button
        instance='superbutton2'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton', arguments: { newLabel: 'Foo' } }
        }}
        initContent={{ label: 'Adios' }}
        render={(actions, content, styling) => (
          <ColoredButton actions={actions} styling={styling}>
            {content.label}
          </ColoredButton>
        )}
      />
    )
  );

storiesOf('JSDT/Button/Styling/Themed', module)
  .addDecorator(ThemeDecorator)
  .add(
    'Default Theme Map', () => (
      <Button
        instance='superbutton1'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton', arguments: { newLabel: 'Foo' } }
        }}
        initContent={{ label: 'Theme primary medium sea green' }}
        render={(actions, content, styling) => (
          <ColoredButton actions={actions} styling={styling}>
            {content.label}
          </ColoredButton>
        )}
      />
    )
  )
  .add(
    'Custom Theme Map', () => (
      <Button
        instance='superbutton2'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton', arguments: { newLabel: 'Foo' } }
        }}
        initContent={{ label: 'Theme secondary magenta' }}
        themeMap={{ color: 'button.secondary' }}
        render={(actions, content, styling) => (
          <ColoredButton actions={actions} styling={styling}>
            {content.label}
          </ColoredButton>
        )}
      />
    )
  )
  .add(
    'Override Default Theme Map', () => (
      <Button
        instance='superbutton3'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton', arguments: { newLabel: 'Foo' } }
        }}
        initContent={{ label: 'Override default theme w/ blue' }}
        initStyling={{ color: 'blue' }}
        render={(actions, content, styling) => (
          <ColoredButton actions={actions} styling={styling}>
            {content.label}
          </ColoredButton>
        )}
      />
    )
  )
  .add(
    'Override Custom Theme Map', () => (
      <Button
        instance='superbutton4'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton', arguments: { newLabel: 'Foo' } }
        }}
        initContent={{ label: 'Override custom theme w/ orange' }}
        initStyling={{ color: 'orange' }}
        themeMap={{ color: 'button.secondary' }}
        render={(actions, content, styling) => (
          <ColoredButton actions={actions} styling={styling}>
            {content.label}
          </ColoredButton>
        )}
      />
    )
  );

storiesOf('JSDT/Button/Styling/No Theme', module)
  .addDecorator(EmptyThemeDecorator)
  .add(
    'Default', () => (
      <Button
        instance='superbutton5'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton', arguments: { newLabel: 'Foo' } }
        }}
        initContent={{ label: 'Default Pink' }}
        render={(actions, content, styling) => (
          <ColoredButton actions={actions} styling={styling}>
            {content.label}
          </ColoredButton>
        )}
      />
    )
  )
  .add(
    'Override', () => (
      <Button
        instance='superbutton6'
        actions={{
          onClick: { action: 'chgLabel', target: 'superbutton', arguments: { newLabel: 'Foo' } }
        }}
        initContent={{ label: 'Override Default Purple' }}
        initStyling={{ color: 'purple' }}
        render={(actions, content, styling) => (
          <ColoredButton actions={actions} styling={styling}>
            {content.label}
          </ColoredButton>
        )}
      />
    )
  );
