import React from 'react';
import { connect } from 'react-redux';
import actions from './ducks/actions';
import reducer from './ducks/reducers';
import { libName, uuid } from '../ns';

const componentName = 'withStyling';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

const calcStyling = (props) => {
  const effectiveTheme = [...new Set(
    Object.keys(props.themeMap === undefined ? {} : props.themeMap)
      .concat(Object.keys(props.defaultThemeMap === undefined ? {} : props.defaultThemeMap))
  )].reduce((acc, curr) => {
    if (props.themeMap !== undefined) {
      if (props.themeMap[curr] !== undefined) {
        if (props.theme[props.themeMap[curr]] !== undefined) {
          return {
            ...acc,
            [curr]: props.theme[props.themeMap[curr]]
          };
        }
      }
    }
    if (props.defaultThemeMap !== undefined) {
      if (props.defaultThemeMap[curr] !== undefined) {
        if (props.theme[props.defaultThemeMap[curr]] !== undefined) {
          return {
            ...acc,
            [curr]: props.theme[props.defaultThemeMap[curr]]
          };
        }
      }
    }
    return acc;
  }, {});
  const override = props.overrides === undefined ? {} : props.overrides;
  const defaults = props.defaultStyling === undefined ? {} : props.defaultStyling;
  const retVal = [...new Set(
    Object.keys(override)
      .concat(Object.keys(effectiveTheme))
      .concat(Object.keys(defaults))
  )].reduce((acc, curr) => ({
    ...acc,
    // eslint-disable-next-line no-nested-ternary
    [curr]: defaults[curr] === undefined ? ''
    // eslint-disable-next-line no-nested-ternary
      : override[curr] !== undefined ? override[curr]
        : effectiveTheme[curr] !== undefined ? effectiveTheme[curr]
          : defaults[curr]
  }), {});
  return retVal;
};

const withStyling = (WrappedComponent, nsData, wrappedComponentsActions) => {
  const mapStateToProps = (state, ownProps) => {
    const overrides = Object.keys(state)
      .filter(prefix => prefix.includes(`${nsData.ns}${ownProps.instance}/styling`))
      .slice(0, 1)
      .reduce(() => (
        { overrides: state[`${nsData.ns}${ownProps.instance}/styling`] }
      ), {});
    const themeMap = Object.keys(state)
      .filter(prefix => prefix.includes(`${nsData.ns}${ownProps.instance}/themeMap`))
      .slice(0, 1)
      .reduce(() => (
        { themeMap: state[`${nsData.ns}${ownProps.instance}/themeMap`] }
      ), {});
    return ownProps.instance === 'ignore' ? {} : { ...overrides, ...themeMap };
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatchers: {
      ...ownProps.dispatchers,
      initStyling: (instance, styling) => {
        dispatch(actions.initStyling(nsData.ns, instance, styling));
      },
      clrStyling: instance => dispatch(actions.clrStyling(nsData.ns, instance)),
      initThemeMap: (instance, styling) => {
        dispatch(actions.initThemeMap(nsData.ns, instance, styling));
      },
      clrThemeMap: instance => dispatch(actions.clrThemeMap(nsData.ns, instance))
    }
  });

  class connectedWrappedComponent extends React.Component {
    componentDidMount() {
      this.props.dispatchers.initStyling(
        this.props.instance,
        this.props.initStyling
      );
      this.props.dispatchers.initThemeMap(
        this.props.instance,
        this.props.initThemeMap
      );
    }

    componentWillUnmount() {
      this.props.dispatchers.clrStyling(this.props.instance);
      this.props.dispatchers.clrThemeMap(this.props.instance);
    }

    render() {
      return <WrappedComponent {...this.props} styling={calcStyling(this.props)}/>;
    }
  }

  return [
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(connectedWrappedComponent),
    nsData,
    wrappedComponentsActions
  ];
};

export {
  ns,
  nsReducer,
  withStyling
};

export default reducer;
