import React from 'react';
import { connect } from 'react-redux';
import actions from './ducks/actions';
import reducer from './ducks/reducers';
import { libName, uuid } from '../ns';

const componentName = 'withRuxc';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

const withRuxc = (WrappedComponent, nsData, wrappedComponentsActions) => {
  const mapStateToProps = (state, ownProps) => {
    const retVal = Object.keys(state)
      .filter(prefix => prefix.includes(`${nsData.ns}${ownProps.instance}/`))
      .reduce(acc => (
        {
          content: {
            ...acc.content,
            ...state[`${nsData.ns + ownProps.instance}/content`]
          },
          styling: {
            ...acc.styling,
            ...Object.keys(state[`${nsData.ns + ownProps.instance}/styling`])
              .reduce((acc2, curr) => ({
                ...acc2,
                [curr]: state[`${nsData.ns + ownProps.instance}/styling`][curr].effective
              }), {})
          }
        }), { content: {}, styling: {} });
    return ownProps.instance === 'ignore' ? { content: ownProps.initContent } : retVal;
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatchers: {
      ...ownProps.dispatchers,
      initRuxc: (instance, args, events, styling, actionTypes) => {
        dispatch(actions.initRuxc(nsData.ns, instance, args, events, styling, actionTypes));
      },
      clrRuxc: instance => dispatch(actions.clrRuxc(nsData.ns, instance))
    }
  });

  class connectedWrappedComponent extends React.Component {
    componentDidMount() {
      const effectiveTheme = [...new Set(
        Object.keys(this.props.themeMap === undefined ? {} : this.props.themeMap)
          .concat(Object.keys(this.props.defaultThemeMap === undefined ? {} : this.props.defaultThemeMap))
      )].reduce((acc, curr) => {
        if (this.props.themeMap !== undefined) {
          if (this.props.themeMap[curr] !== undefined) {
            if (this.props.theme[this.props.themeMap[curr]] !== undefined) {
              return {
                ...acc,
                [curr]: this.props.theme[this.props.themeMap[curr]]
              };
            }
          }
        }
        if (this.props.defaultThemeMap !== undefined) {
          if (this.props.defaultThemeMap[curr] !== undefined) {
            if (this.props.theme[this.props.defaultThemeMap[curr]] !== undefined) {
              return {
                ...acc,
                [curr]: this.props.theme[this.props.defaultThemeMap[curr]]
              };
            }
          }
        }
        return acc;
      }, {});
      const override = this.props.initStyling === undefined ? {} : this.props.initStyling;
      const defaults = this.props.defaultStyling === undefined ? {} : this.props.defaultStyling;
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
        this.props.instance,
        this.props.initContent,
        this.props.actions,
        styling,
        wrappedComponentsActions
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
