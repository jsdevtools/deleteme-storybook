import React from 'react';
import { connect } from 'react-redux';
import actions from './ducks/actions';
import reducer from './ducks/reducers';
import { libName, uuid } from '../ns';

const componentName = 'withEvents';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

const withEvents = (WrappedComponent, nsData, wrappedComponentsActions) => {
  const mapStateToProps = () => ({});

  const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatchers: {
      ...ownProps.dispatchers,
      initEvents: (instance, events) => {
        dispatch(actions.initEvents(nsData.ns, instance, events));
      },
      clrEvents: instance => dispatch(actions.clrEvents(nsData.ns, instance))
    }
  });

  class connectedWrappedComponent extends React.Component {
    componentDidMount() {
      this.props.dispatchers.initEvents(
        this.props.instance,
        this.props.actions
      );
    }

    componentWillUnmount() {
      this.props.dispatchers.clrEvents(this.props.instance);
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
  withEvents
};

export default reducer;
