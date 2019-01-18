import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { storiesOf, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import store from '../../app/state/store';
import { StoryActionLogger } from '../../JSDT/StoryActionLogger';
import Stardux from '.';
import Float from '../../JSDT/Float';

const ThemeDecorator = storyFn => (
  <Stardux.Provider
    instance='themer'
    theme='teams'
    eventHandlers={{
      onChange: [{
        handler: 'chgProps',
        target: 'suirdropdown',
        arguments: {
          value: undefined
        }
      }]
    }}
  >
    <div style={{ padding: '15px', background: '#bbb' }}>
      <Float placement='topRight' zIndex={20} margin='10px'>
        <Stardux.Dropdown
          instance='suirdropdown'
          placeholder={'Make a selection...'}
          toggleButton
          eventHandlers={{
            onSelectedChange: [{
              handler: 'chgProps',
              target: 'themer',
              arguments: {
                theme: undefined
              }
            }]
          }}
          items={[
            'teams',
            'teamsDark',
            'teamsHighContrast'
          ]}
        />
      </Float>
      { storyFn() }
    </div>
  </Stardux.Provider>
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

storiesOf('stardux/Button', module)
  .add(
    'Default',
    () => (
      <React.Fragment>
        <Stardux.Text size='large' weight='bold' content='Default:'/>
        <br/>
        <Stardux.Button
          instance='button1a'
          content='Change Content'
          eventHandlers={{
            onClick: {
              handler: 'chgProps',
              target: 'button1a',
              arguments: {
                content: 'Kazaam!'
              }
            }
          }}
        />
        <Stardux.Button
          content='onClick'
          onClick={() => console.log('clicked')}
        />
        <br/>
        <Stardux.Button
          instance='button1c'
          eventHandlers={{
            onClick: [{
              handler: 'chgProps',
              target: 'themer',
              arguments: {
                theme: 'teams'
              }
            }]
          }}
          content='Change Theme Prop'
        />
        <Stardux.Button
          instance='button1d'
          eventHandlers={{
            onClick: {
              handler: 'chgProps',
              target: 'themer',
              arguments: {
                theme: 'teams'
              }
            }
          }}
        >
          Content as Children
        </Stardux.Button>
        <br/>
        <Stardux.Button
          instance='button1e'
          eventHandlers={{
            onClick: {
              handler: 'chgProps',
              target: 'themer',
              arguments: {
                theme: 'teamsHighContrast'
              }
            }
          }}
          content='See how this very long text shows up on the button'
        />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Emphasis:'/>
      <br/>
      <Stardux.Button
        primary
        instance='button2a'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
        content='Primary'
      />
      <Stardux.Button
        secondary
        instance='button2b'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
        content='Secondary'
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Icon:'/>
      <br/>
      <Stardux.Button
        primary
        icon='book'
        instance='button3a'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
      />
      <Stardux.Button
        secondary
        icon='book'
        instance='button3b'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Icon Only:'/>
      <br/>
      <Stardux.Button
        primary
        icon='book'
        iconOnly
        instance='button4a'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
      />
      <Stardux.Button
        secondary
        icon='book'
        iconOnly
        instance='button4b'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Icon and Content:'/>
      <br/>
      <Stardux.Button
        primary
        icon='book'
        iconPosition='before'
        instance='button5a'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
        content='Click me before'
      />
      <Stardux.Button
        primary
        icon='book'
        iconPosition='after'
        instance='button5b'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
        content='Click me after'
      />
      <br/>
      <Stardux.Button
        secondary
        icon='book'
        iconPosition='before'
        instance='button5c'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
        content='Click me before'
      />
      <Stardux.Button
        secondary
        icon='book'
        iconPosition='after'
        instance='button5d'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
        content='Click me after'
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Fluid:'/>
      <br/>
      <Stardux.Button
        instance='button6a'
        fluid
        primary
        icon='book'
        iconPosition='before'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
        content='Fits to container'
      />
      <br/>
      <Stardux.Button
        instance='button6b'
        fluid
        secondary
        icon='smile'
        iconPosition='after'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
        content='See how this very long text shows up on the button'
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Circular:'/>
      <br/>
      <Stardux.Button
        instance='button7a'
        circular
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
        content='C'
      />
      <Stardux.Button
        instance='button7b'
        circular
        icon='book'
        iconPosition='after'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
        content='Confusingly long'
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Circular Emphasis:'/>
      <br/>
      <Stardux.Button
        instance='button8a'
        circular
        primary
        icon='coffee'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
      />
      <Stardux.Button
        instance='button8b'
        circular
        secondary
        icon='money'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Text:'/>
      <br/>
      <Stardux.Button
        instance='button9a'
        text
        icon='book'
        iconPosition='before'
        content='Default'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
      />
      <Stardux.Button
        instance='button9b'
        text
        primary
        content='Primary'
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teams'
            }
          }
        }}
      />
      <Stardux.Button
        instance='button9c'
        text
        secondary
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
        content='Secondary'
      />
      <Stardux.Button
        instance='button9d'
        text
        icon='compass outline'
        iconOnly
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast'
            }
          }
        }}
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Group:'/>
      <br/>
      <Stardux.ButtonGroup
        instance='button10a'
        buttons={[
          {
            key: 'book',
            icon: 'book',
            iconOnly: true,
            eventHandlers: {
              onClick: {
                handler: 'chgProps',
                target: 'themer',
                arguments: {
                  theme: 'teamsHighContrast',
                  comment: 'book'
                }
              }
            }
          },
          {
            key: 'coffee',
            icon: 'coffee',
            iconOnly: true,
            eventHandlers: {
              onClick: {
                handler: 'chgProps',
                target: 'themer',
                arguments: {
                  theme: 'teamsHighContrast',
                  comment: 'coffee'
                }
              }
            }
          },
          {
            key: 'play',
            icon: 'play',
            iconOnly: true,
            eventHandlers: {
              onClick: {
                handler: 'chgProps',
                target: 'themer',
                arguments: {
                  theme: 'teamsHighContrast',
                  comment: 'play'
                }
              }
            }
          }
        ]}
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast',
              comment: 'group10a'
            }
          }
        }}
      />
      <br/>
      <br/>
      <Stardux.Text size='large' weight='bold' content='Circular Group:'/>
      <br/>
      <Stardux.ButtonGroup
        instance='button10b'
        circular
        buttons={[
          {
            key: 'book',
            icon: 'book',
            primary: true,
            eventHandlers: {
              onClick: {
                handler: 'chgProps',
                target: 'themer',
                arguments: {
                  theme: 'teamsHighContrast',
                  comment: 'book'
                }
              }
            }
          },
          {
            key: 'coffee',
            icon: 'coffee',
            eventHandlers: {
              onClick: {
                handler: 'chgProps',
                target: 'themer',
                arguments: {
                  theme: 'teamsHighContrast',
                  comment: 'coffee'
                }
              }
            }
          },
          {
            key: 'play',
            icon: 'play',
            primary: true,
            eventHandlers: {
              onClick: {
                handler: 'chgProps',
                target: 'themer',
                arguments: {
                  theme: 'teamsHighContrast',
                  comment: 'play'
                }
              }
            }
          }
        ]}
        eventHandlers={{
          onClick: {
            handler: 'chgProps',
            target: 'themer',
            arguments: {
              theme: 'teamsHighContrast',
              comment: 'group10b'
            }
          }
        }}
      />
    </React.Fragment>
    ),
    { notes: 'Various Buttons.' }
  );
