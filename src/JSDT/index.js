import ruxcReducer, { nsReducer as nsRuxcReducer } from './withRuxc';
import actionsReducer, { nsReducer as nsActionsReducer } from './withActions';
import contentReducer, { nsReducer as nsContentReducer } from './withContent';
import eventsReducer, { nsReducer as nsEventsReducer } from './withEvents';
import stylingReducer, { nsReducer as nsStylingReducer } from './withStyling';
import storyActionLoggerReducer, { nsReducer as nsStoryActionLoggerReducer } from './StoryActionLogger';
import themerReducer, { nsReducer as nsThemerReducer } from './Themer';
import buttonReducer, { nsReducer as nsButtonReducer } from './Button';

export default {
  [nsRuxcReducer]: ruxcReducer,
  [nsActionsReducer]: actionsReducer,
  [nsContentReducer]: contentReducer,
  [nsEventsReducer]: eventsReducer,
  [nsStylingReducer]: stylingReducer,
  [nsStoryActionLoggerReducer]: storyActionLoggerReducer,
  [nsThemerReducer]: themerReducer,
  [nsButtonReducer]: buttonReducer
};
