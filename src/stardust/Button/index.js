import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { Button as SUIRButton } from '@stardust-ui/react';
import actions from './ducks/actions';
import types from './ducks/action-types';
import { libName, uuid } from '../ns';
import { withRuxc } from '../../JSDT/withRuxc';


class ConnectedButton extends React.Component {
  render() {
    // eslint-disable-next-line object-curly-newline
    const { initContent, initStyling, content, actions: acts, dispatchers, ...rest } = this.props;
    return (
      <SUIRButton
        {...rest}
        content={content.label}
        {...Object.keys(acts).reduce((acc, curr) => (
          {
            ...acc,
            [curr]: () => {
              dispatchers[acts[curr].action](
                acts[curr].target,
                acts[curr].arguments
              );
            }
          }), {})}
      />
    );
  }
}

const componentName = 'Button';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  dispatchers: {
    chgColor: (instance, args) => dispatch(actions.chgColor(ns, instance, args.newColor)),
    chgLabel: (instance, args) => dispatch(actions.chgLabel(ns, instance, args.newLabel)),
    complexChgLabel: (instances, args) => {
      instances.map(cur => dispatch(actions.chgLabel(ns, cur, args.newLabel)));
    }
  }
});

const Button = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withRuxc(ConnectedButton, { componentName, ns, nsReducer }, types)));

export { ns, nsReducer, Button };

// eslint-disable-next-line
export { default } from './ducks/reducers.js';
