import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { Provider, themes } from '@stardust-ui/react';
// eslint-disable-next-line no-unused-vars
import actions from './ducks/actions';
import types from './ducks/action-types';
import { libName, uuid } from '../ns';
import { withRuxc } from '../../JSDT/withRuxc';


class ConnectedThemer extends React.Component {
  render() {
    return (
      <Provider theme={this.props.content.label || themes.teamsHighContrast}>
        {this.props.children}
      </Provider>
    );
  }
}

const componentName = 'Themer';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = dispatch => ({
  dispatchers: {
    /* shouldn't need to dispatch
    chgColor: (instance, args) => dispatch(actions.chgColor(ns, instance, args.newColor)),
    chgLabel: (instance, args) => dispatch(actions.chgLabel(ns, instance, args.newLabel)),
    complexChgLabel: (instances, args) => {
      instances.map(cur => dispatch(actions.chgLabel(ns, cur, args.newLabel)));
    }
    */
  }
});

const Themer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withRuxc(ConnectedThemer, { componentName, ns, nsReducer }, types)));

Themer.defaultProps = {
  actions: {},
  initStyling: {},
  initContent: {
    label: themes.teams
  }
};

export { ns, nsReducer, Themer };

// eslint-disable-next-line
export { default } from './ducks/reducers.js';
