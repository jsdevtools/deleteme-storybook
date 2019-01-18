import React from 'react';
import { connect } from 'react-redux';
// import { themes } from '@stardust-ui/react';
import actions from '../ducks/actions';
import reducer from '../ducks/reducers';
import { libName, uuid, ns } from '../ns';

const componentName = 'withStardux';
const nsReducer = [uuid, libName, componentName, 'Reducer'].join('');

function rewriteHandlers(eventHandlers, dispatchers) {
  const retVal = {};
  if (eventHandlers !== undefined) {
    Object.keys(eventHandlers).forEach((eventHandler) => {
      const acts = [];
      const eventHandlersArray = Array.isArray(eventHandlers[eventHandler])
        ? eventHandlers[eventHandler]
        : [eventHandlers[eventHandler]];
      eventHandlersArray.forEach((eventhandler) => {
        const hdlr = eventhandler.handler;
        const tgt = eventhandler.target;
        const args = eventhandler.arguments;
        acts.push((ea, va) => {
          const constr = args;
          Object.keys(args).forEach((arg) => {
            if (va !== undefined && va.value !== undefined) constr[arg] = va.value;
          });
          dispatchers[hdlr](tgt, constr);
        });
      });
      retVal[eventHandler] = (eb, vb) => acts.forEach(act => act(eb, vb));
    });
  }
  return retVal;
}

const withStardux = (WrappedComponent) => {
  const mapStateToProps = (state, ownProps) => {
    const retVal = ownProps.instance === 'ignore'
      ? {}
      : Object.keys(state)
        .filter(key => (key.includes(`${ns}${ownProps.instance}`)))
        .reduce((acc, cur) => (
          {
            ...acc,
            [cur.split('/').slice(-1)[0]]: state[cur]
          }
        ), {});
    return retVal;
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatchers: {
      ...ownProps.dispatchers,
      initStardux: args => dispatch(actions.initStardux(args.instance, args.initProps)),
      clrStardux: instance => dispatch(actions.clrStardux(instance)),
      chgProps: (instance, args) => {
        console.log('chgProps', instance, args);
        dispatch(actions.chgProps(instance, args));
      }
    }
  });

  class connectedWrappedComponent extends React.Component {
    componentDidMount() {
      const { instance, ...rest } = this.props;
      if (instance) {
        this.props.dispatchers.initStardux(
          {
            instance,
            initProps: rest
          }
        );
      }
    }

    componentWillUnmount() {
      this.props.dispatchers.clrStardux(this.props.instance);
    }

    render() {
      const {
        eventHandlers, dispatchers, buttons, ...rest
      } = this.props;
      const modEventHandlers = rewriteHandlers(eventHandlers, dispatchers);
      const modButtons = buttons ? buttons.reduce((acc, curr) => {
        const {
          eventHandlers: currButtonHandlers, ...restButtonProps
        } = curr;
        const modCurrButtonHandlers = currButtonHandlers || {};
        return [].concat(acc).concat([{
          ...restButtonProps,
          ...rewriteHandlers(modCurrButtonHandlers, dispatchers)
        }]);
      }, []) : [];

      return this.props.eventHandlers
        ? (
            <WrappedComponent
              {...rest}
              {...modEventHandlers}
              buttons={modButtons}
            />
        ) : (
          <WrappedComponent
            {...rest}
          />
        );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(connectedWrappedComponent);
};

export {
  nsReducer,
  withStardux
};

export default reducer;
