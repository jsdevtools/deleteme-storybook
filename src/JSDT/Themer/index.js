import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './ducks/actions';
import { libName, uuid } from '../ns';

import themes from './theme';

const ThemerContext = React.createContext('themer');

const componentName = 'Themer';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

const mapStateToProps = (state, ownProps) => {
  const retVal = Object.keys(state)
    .filter(prefix => prefix.includes(`${ns}${ownProps.instance}/themer`))
    .reduce(() => (
      {
        theme: state[`${ns}${ownProps.instance}/themer`]
      }), {});
  return retVal;
};

const mapDispatchToProps = dispatch => ({
  dispatchers: {
    initThemer: (instance, theme) => dispatch(actions.initThemer(ns, instance, theme)),
    clrThemer: instance => dispatch(actions.clrThemer(ns, instance)),
    chgThemer: (instance, newProps) => dispatch(actions.chgThemer(ns, instance, newProps)),
    chgTheme: (instance, newTheme) => dispatch(actions.chgTheme(ns, instance, newTheme))
  }
});


class ConnectedThemer extends React.Component {
  componentDidMount() {
    this.props.dispatchers.initThemer(this.props.instance, this.props.initTheme);
  }

  componentWillUnmount() {
    this.props.dispatchers.clrThemer(this.props.instance);
  }

  render() {
    return (
      <ThemerContext.Provider value={this.props.theme}>
        {this.props.children}
      </ThemerContext.Provider>
    );
  }
}

const Themer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedThemer);

Themer.propTypes = {
  instance: PropTypes.string.isRequired
};

Themer.defaultProps = {
  theme: themes.defaultTheme
};

const withThemer = WrappedComponent => (
  class innerComponent extends React.Component {
    render() {
      return (
        <ThemerContext.Consumer>
          {themeVal => (
            <WrappedComponent theme={themeVal} {...this.props}>
              {this.props.children}
            </WrappedComponent>
          )}
        </ThemerContext.Consumer>
      );
    }
  }
);

export {
  ns,
  nsReducer,
  Themer,
  withThemer
};

// eslint-disable-next-line
export { default } from './ducks/reducers.js';
