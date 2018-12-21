import React from 'react';
import { connect } from 'react-redux';
import actions from './ducks/actions';
import reducer from './ducks/reducers';
import { libName, uuid } from '../ns';

const componentName = 'withActions';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

const withActions = (WrappedComponent, nsData, wrappedComponentsActions) => {
  const mapStateToProps = () => ({});

  const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatchers: {
      ...ownProps.dispatchers,
      initActions: (instance, actionTypes) => {
        dispatch(actions.initActions(nsData.ns, instance, actionTypes));
      },
      clrActions: instance => dispatch(actions.clrActions(nsData.ns, instance))
    }
  });

  class connectedWrappedComponent extends React.Component {
    componentDidMount() {
      this.props.dispatchers.initActions(
        this.props.instance,
        wrappedComponentsActions
      );
    }

    componentWillUnmount() {
      this.props.dispatchers.clrActions(this.props.instance);
    }

    render() {
      return <WrappedComponent {...this.props}/>;
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
  withActions
};

export default reducer;
