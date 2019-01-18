import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { themes, Dropdown as SUIRDropdown } from '@stardust-ui/react';
import actions from './ducks/actions';
import themerActions from '../Themer/ducks/actions';
import types from './ducks/action-types';
import { libName, uuid } from '../ns';
import { withRuxc } from '../../JSDT/withRuxc';


class ConnectedDropdown extends React.Component {
  render() {
    const {
      initContent, initStyling, initItems, items, actions: acts, dispatchers, ...rest
    } = this.props;
    return (
      <SUIRDropdown
        // pass through SUI options
        {...rest}
        // items is saved in state for manipulation
        items={items}
        // event dispatchers
        {...Object.keys(acts).reduce((acc, curr) => (
          {
            ...acc,
            [curr]: (e, v) => {
              dispatchers[acts[curr].action](
                acts[curr].target,
                curr === 'onSelectedChange'
                  ? { selection: v.value.slice(-1)[0] }
                  : acts[curr].arguments
              );
            }
          }), {})}
      />
    );
  }
}

const componentName = 'Dropdown';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  dispatchers: {
    chgOptions: (instance, args) => dispatch(actions.chgOptions(ns, instance, args.newOptions)),
    chgSelected: (instance, args) => dispatch(themerActions.chgTheme(ns, instance, themes[args.selection])),
    chgSearchQuery: (instance, args) => dispatch(actions.chgSearchQuery(ns, instance, args.query))
  }
});

const Dropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(withRuxc(ConnectedDropdown, { componentName, ns, nsReducer }, types)));

export { ns, nsReducer, Dropdown };

// eslint-disable-next-line
export { default } from './ducks/reducers.js';
