import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import actions from './ducks/actions';
// import operations from './ducks/operations';
import types from './ducks/action-types';
import { libName, uuid } from '../ns';
import ColoredButton from './ColoredButton.jsx';
import { withRuxc } from '../withRuxc';

class ConnectedButton extends React.Component {
  render() {
    return (
      <ColoredButton
        styling={this.props.styling}
        {...Object.keys(this.props.actions).reduce((acc, curr) => (
          {
            ...acc,
            [curr]: () => {
              this.props.dispatchers[this.props.actions[curr].action](
                this.props.actions[curr].target,
                this.props.actions[curr].arguments
              );
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

Button.propTypes = {
  instance: PropTypes.string.isRequired
};

Button.defaultProps = {
  defaultStyling: {
    color: 'pink'
  },
  defaultThemeMap: {
    color: 'button.primary'
  }
};

export { ns, nsReducer, Button };
export { default as ColoredButton } from './ColoredButton.jsx';

// eslint-disable-next-line
export { default } from './ducks/reducers.js';
