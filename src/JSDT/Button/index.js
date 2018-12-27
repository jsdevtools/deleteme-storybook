import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withTheme } from 'styled-components';
import { withThemer } from '../Themer';
import actions from './ducks/actions';
// import operations from './ducks/operations';
import types from './ducks/action-types';
import { libName, uuid } from '../ns';
import ColoredButton from './ColoredButton.jsx';
// import { withRuxc } from '../withRuxc';
import { withActions } from '../withActions';
import { withContent } from '../withContent';
import { withEvents } from '../withEvents';
import { withStyling } from '../withStyling';

class ConnectedButton extends React.Component {
  render() {
    return (
      <ColoredButton
        styling={this.props.styling}
        {...Object.keys(this.props.actions).reduce((acc, curr) => (
          {
            ...acc,
            [curr]: () => {
              if (Array.isArray(this.props.actions[curr])) {
                this.props.actions[curr].forEach((dispatcher) => {
                  this.props.dispatchers[dispatcher.action](
                    dispatcher.target,
                    dispatcher.arguments
                  );
                });
              } else {
                this.props.dispatchers[this.props.actions[curr].action](
                  this.props.actions[curr].target,
                  this.props.actions[curr].arguments
                );
              }
            }
          }), {})}
      >
        {this.props.content.label}
      </ColoredButton>
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
    chgColor: (instance, args) => dispatch(actions.chgColor(ns, instance, args)),
    chgLabel: (instance, args) => dispatch(actions.chgLabel(ns, instance, args.newLabel)),
    chgThemer: (instance, args) => dispatch(actions.chgThemer(ns, instance, args)),
    chgTheme: (instance, args) => dispatch(actions.chgTheme(ns, instance, args.newTheme)),
    chgThemeMap: (instance, args) => dispatch(actions.chgThemeMap(ns, instance, args)),
    complexChgLabel: (instances, args) => {
      instances.map(cur => dispatch(actions.chgLabel(ns, cur, args.newLabel)));
    }
  }
});

const Button = connect(
  mapStateToProps,
  mapDispatchToProps
)(withThemer(
  withStyling(
    ...withEvents(
      ...withContent(
        ...withActions(ConnectedButton, { componentName, ns, nsReducer }, types)
      )
    )
  )[0]
));
// )(withTheme(withRuxc(ConnectedButton, { componentName, ns, nsReducer }, types)));

Button.propTypes = {
  instance: PropTypes.string.isRequired
};

Button.defaultProps = {
  defaultStyling: {
    color: 'pink',
    background: 'none'
  },
  defaultThemeMap: {
    color: 'button.primary'
  }
};

export { ns, nsReducer, Button };
export { default as ColoredButton } from './ColoredButton.jsx';

// eslint-disable-next-line
export { default } from './ducks/reducers.js';
