import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
// import { ThemeProvider } from 'styled-components';
import { storiesOf, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { Themer } from '../Themer';
import themes from '../Themer/theme';
import store from '../../app/state/store';
import { Button, ColoredButton } from '.';
import { StoryActionLogger } from '../StoryActionLogger';


const ThemeDecorator = storyFn => (
  <Themer instance='default' initTheme={themes.defaultTheme}>
    { storyFn() }
  </Themer>
);

const EmptyThemeDecorator = storyFn => (
  <Themer instance='empty' initTheme={{}}>
    { storyFn() }
  </Themer>
);

const ReduxDecorator = storyFn => (
  <ReduxProvider store={store}>
    <StoryActionLogger/>
      { storyFn() }
  </ReduxProvider>
);

addDecorator(withNotes);
addDecorator(ReduxDecorator);

storiesOf('JSDT/Button/Styling/Themed', module)
  .addDecorator(ThemeDecorator)
  .add(
    'Default Theme Map', () => (
      <React.Fragment>
        <Button
          instance='superbutton1'
          actions={{
            onClick: [
              {
                action: 'chgLabel',
                target: 'superbutton1',
                arguments: { newLabel: 'Theme primary medium sea green' }
              },
              {
                action: 'chgThemer',
                target: 'default',
                arguments: { 'button.primary': 'mediumseagreen' }
              },
              {
                action: 'chgTheme',
                target: 'default',
                arguments: { newTheme: 'defaultTheme' }
              }
            ]
          }}
          initContent={{ label: 'Theme primary medium sea green' }}
        />
        <br/>
        <Button
          instance='superbutton1a'
          actions={{
            onClick: { action: 'chgLabel', target: 'superbutton1', arguments: { newLabel: 'Foo' } }
          }}
          initContent={{ label: 'Change Label' }}
        />
        <br/>
        <Button
          instance='superbutton1b'
          actions={{
            onClick: { action: 'chgThemer', target: 'default', arguments: { 'button.primary': 'red' } }
          }}
          initContent={{ label: 'Change theme values' }}
        />
        <br/>
        <Button
          instance='superbutton1c'
          actions={{
            onClick: { action: 'chgTheme', target: 'default', arguments: { newTheme: 'alternative' } }
          }}
          initContent={{ label: 'Change theme' }}
        />
      </React.Fragment>
    )
  )
  .add(
    'Custom Theme Map', () => (
      <React.Fragment>
        <Button
          instance='superbutton2'
          actions={{
            onClick: [
              {
                action: 'chgLabel',
                target: 'superbutton2',
                arguments: { newLabel: 'Theme secondary magenta' }
              },
              {
                action: 'chgThemer',
                target: 'default',
                arguments: { 'button.secondary': 'magenta' }
              },
              {
                action: 'chgTheme',
                target: 'default',
                arguments: { newTheme: 'defaultTheme' }
              },
              {
                action: 'chgThemeMap',
                target: 'superbutton2',
                arguments: { color: 'button.secondary' }
              }
            ]
          }}
          initContent={{ label: 'Theme secondary magenta' }}
          initThemeMap={{ color: 'button.secondary' }}
        />
        <br/>
        <Button
          instance='superbutton2a'
          actions={{
            onClick: { action: 'chgLabel', target: 'superbutton2', arguments: { newLabel: 'Foo' } }
          }}
          initContent={{ label: 'Change Label' }}
        />
        <br/>
        <Button
          instance='superbutton2b'
          actions={{
            onClick: { action: 'chgThemer', target: 'default', arguments: { 'button.secondary': 'red' } }
          }}
          initContent={{ label: 'Change theme values' }}
        />
        <br/>
        <Button
          instance='superbutton2c'
          actions={{
            onClick: { action: 'chgTheme', target: 'default', arguments: { newTheme: 'alternative' } }
          }}
          initContent={{ label: 'Change theme' }}
        />
        <br/>
        <Button
          instance='superbutton2d'
          actions={{
            onClick: {
              action: 'chgThemeMap',
              target: 'superbutton2',
              arguments: { color: 'button.primary' }
            }
          }}
          initContent={{ label: 'Change Theme Map' }}
        />
      </React.Fragment>
    )
  )
  .add(
    'Override Default Theme Map', () => (
      <Button
        instance='superbutton3'
        actions={{
          onClick: { action: 'chgColor', target: 'superbutton3', arguments: { color: 'orange' } }
        }}
        initContent={{ label: 'Override default theme w/ blue' }}
        initStyling={{ color: 'blue' }}
      />
    )
  )
  .add(
    'Override Custom Theme Map', () => (
      <Button
        instance='superbutton4'
        actions={{
          onClick: { action: 'chgColor', target: 'superbutton4', arguments: { color: 'yellow' } }
        }}
        initContent={{ label: 'Override custom theme w/ orange' }}
        initStyling={{ color: 'orange' }}
        initThemeMap={{ color: 'button.secondary' }}
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
          onClick: { action: 'chgColor', target: 'superbutton5', arguments: { color: 'cyan' } }
        }}
        initContent={{ label: 'Default Pink' }}
      />
    )
  )
  .add(
    'Override', () => (
      <Button
        instance='superbutton6'
        actions={{
          onClick: { action: 'chgColor', target: 'superbutton6', arguments: { color: 'cyan' } }
        }}
        initContent={{ label: 'Override Default Purple' }}
        initStyling={{ color: 'purple' }}
      />
    )
  );
