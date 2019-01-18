import React from 'react';
import { connect } from 'react-redux';
import actions from './ducks/actions';
import reducer from './ducks/reducers';
import { libName, uuid } from '../ns';

const componentName = 'withRuxc';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

const withRuxc = (WrappedComponent, nsData, wrappedComponentsActions) => {
  const mapStateToProps = (state, ownProps) => (
    ownProps.instance === 'ignore'
      ? { content: ownProps.initContent, items: ownProps.initItems, styling: ownProps.initStyling }
      : {
        content: state[`${nsData.ns + ownProps.instance}/content`] || {},
        items: state[`${nsData.ns + ownProps.instance}/items`] || [],
        styling: state[`${nsData.ns + ownProps.instance}/styling`]
          ? Object.keys(state[`${nsData.ns + ownProps.instance}/styling`])
            .reduce((acc, cur) => ({
              ...acc,
              [cur]: state[`${nsData.ns + ownProps.instance}/styling`][cur].effective
            }), {})
          : {}
      }
  );

  const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatchers: {
      ...ownProps.dispatchers,
      initRuxc: args => dispatch(actions.initRuxc(nsData.ns, args)),
      clrRuxc: instance => dispatch(actions.clrRuxc(nsData.ns, instance))
    }
  });

  class connectedWrappedComponent extends React.Component {
    componentDidMount() {
      const effectiveTheme = [...new Set(
        Object.keys(this.props.themeMap || {})
          .concat(Object.keys(this.props.defaultThemeMap || {}))
      )].reduce((acc, curr) => {
        if (
          this.props.themeMap
          && this.props.themeMap[curr]
          && this.props.theme[this.props.themeMap[curr]]
        ) {
          return {
            ...acc,
            [curr]: this.props.theme[this.props.themeMap[curr]]
          };
        }
        if (
          this.props.defaultThemeMap
          && this.props.defaultThemeMap[curr]
          && this.props.theme[this.props.defaultThemeMap[curr]]
        ) {
          return {
            ...acc,
            [curr]: this.props.theme[this.props.defaultThemeMap[curr]]
          };
        }
        return acc;
      }, {});
      const override = this.props.initStyling || {};
      const defaults = this.props.defaultStyling || {};
      const styling = [...new Set(
        Object.keys(override)
          .concat(Object.keys(effectiveTheme))
          .concat(Object.keys(defaults))
      )].reduce((acc, curr) => ({
        ...acc,
        [curr]: {
          override: override[curr],
          theme: effectiveTheme[curr],
          default: defaults[curr],
          // eslint-disable-next-line no-nested-ternary
          effective: defaults[curr] === undefined ? ''
          // eslint-disable-next-line no-nested-ternary
            : override[curr] !== undefined ? override[curr]
              : effectiveTheme[curr] !== undefined ? effectiveTheme[curr]
                : defaults[curr]
        }
      }), {});

      this.props.dispatchers.initRuxc(
        {
          instance: this.props.instance,
          content: this.props.initContent,
          events: this.props.actions,
          styling,
          actionTypes: wrappedComponentsActions,
          items: this.props.initItems
        }
      );
    }

    componentWillUnmount() {
      this.props.dispatchers.clrRuxc(this.props.instance);
    }

    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(connectedWrappedComponent);
};

export {
  ns,
  nsReducer,
  withRuxc
};

export default reducer;
