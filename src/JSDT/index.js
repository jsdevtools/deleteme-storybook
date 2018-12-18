import ruxcReducer, { nsReducer as nsRuxcReducer } from './withRuxc';
import storyActionLoggerReducer, { nsReducer as nsStoryActionLoggerReducer } from './StoryActionLogger';

export default {
  [nsRuxcReducer]: ruxcReducer,
  [nsStoryActionLoggerReducer]: storyActionLoggerReducer
};
