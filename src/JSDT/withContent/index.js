import React from 'react';
import { connect } from 'react-redux';
import actions from './ducks/actions';
import reducer from './ducks/reducers';
import { libName, uuid } from '../ns';

const componentName = 'withContent';
const ns = [uuid, libName, componentName, ''].join('/');
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

const withContent = (WrappedComponent, nsData, wrappedComponentsActions) => {
  const mapStateToProps = (state, ownProps) => {
    const retVal = Object.keys(state)
      .filter(prefix => prefix.includes(`${nsData.ns}${ownProps.instance}/`))
      .reduce(acc => (
        {
          content: {
            ...acc.content,
            ...state[`${nsData.ns + ownProps.instance}/content`]
          }
        }), { content: {} });
    return ownProps.instance === 'ignore' ? { content: ownProps.initContent } : retVal;
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatchers: {
      ...ownProps.dispatchers,
      initContent: (instance, args) => {
        dispatch(actions.initContent(nsData.ns, instance, args));
      },
      clrContent: instance => dispatch(actions.clrContent(nsData.ns, instance))
    }
  });

  class connectedWrappedComponent extends React.Component {
    componentDidMount() {
      this.props.dispatchers.initContent(
        this.props.instance,
        this.props.initContent
      );
    }

    componentWillUnmount() {
      this.props.dispatchers.clrContent(this.props.instance);
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
  withContent
};

export default reducer;
