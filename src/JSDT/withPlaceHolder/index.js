import React, { Fragment } from 'react';
import styled from 'styled-components';

const PlaceHolderMsg = styled.div`
  width: 200px;
  height: 300px;
  background: #BBBBBB;
  color: #222222;
  opacity: .85;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: none;
  padding: 8px;
`;

const PlaceHolderBorder = styled.div`
  border-color: #BBBBBB;
  border-radius: 2px;
  border-width: 2px;
  border-style: dashed;
  padding: 10px;
  justify-content: center;
  align-items: center;
  display:inline-block;
`;

const withPlaceHolder = WrappedComponent => (
  class PlaceHolder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        error: null,
        info: null
      };
    }

    componentDidCatch(error, info) {
      this.setState({ hasError: true, error, info });
    }

    render() {
      return <WrappedComponent {...this.props} hasError={this.state.hasError} error={this.state.error}/>;
    }
  }
);

class PHBC extends React.Component {
  render() {
    return <PlaceHolderBorder {...this.props}>{this.props.children}</PlaceHolderBorder>;
  }
}

const withBoundaryHandler = (WrappedComponent) => {
  class BoundaryHandler extends WrappedComponent {
    render() {
      const elementsTree = super.render();
      const childrenNotFound = 'Children Not Found';
      if (!this.props.hasError && this.props.children === undefined) {
        throw new Error(childrenNotFound);
      }
      const PHB = withBoundaryHandler(PHBC); // doesn't like styled component so wrapped in a class
      // eslint-disable-next-line no-nested-ternary
      const msg = this.props.hasError
        ? this.props.error.toString().includes(childrenNotFound)
          ? <Fragment>
              Warning: {childrenNotFound}<br/>
              <br/>
              Component is expected to contain children, displaying place holder instead.
            </Fragment>
          : this.props.error.toString()
        : '';
      const toDisplay = this.props.hasError
        ? <PHB><PlaceHolderMsg>{msg}</PlaceHolderMsg></PHB>
        : elementsTree.props.children;
      const newElementsTree = React.cloneElement(elementsTree, elementsTree.props, toDisplay);
      return newElementsTree;
    }
  }
  return withPlaceHolder(BoundaryHandler);
};

export default withBoundaryHandler;
