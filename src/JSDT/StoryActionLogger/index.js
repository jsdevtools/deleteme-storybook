import React from 'react';
import { connect } from 'react-redux';
import { libName, uuid } from '../ns';

class ConnectedStoryActionLogger extends React.Component {
  render = () => (null);;
}

const componentName = 'StoryActionLogger';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({});

const StoryActionLogger = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedStoryActionLogger);

export { ns, nsReducer, StoryActionLogger };

// eslint-disable-next-line
export { default } from './ducks/reducers.js';
