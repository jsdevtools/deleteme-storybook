import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import withPlaceHolder from '../withPlaceHolder';

const StyledFloatAbsolute = styled.div`
  z-index: ${props => props.zIndex};
  position: absolute;
  pointer-events: none;
`;

const StyledFloat = styled.div`
  z-index: ${props => props.zIndex};
  pointer-events: none;
`;

const TopFloat = styled(StyledFloatAbsolute)`
  width: 100%;
  text-align: center;
  top: ${props => props.top}; 
`;

const TopLeftFloat = styled(StyledFloatAbsolute)`
  top: ${props => props.top};
  left: ${props => props.left};
`;

const TopRightFloat = styled(StyledFloatAbsolute)`
  top: ${props => props.top};
  right: ${props => props.right};
`;

const Centered = styled.div`
  display: inline-block;
  pointer-events: none;
`;

class Float extends Component {
  render() {
    const toDisplay = this.props.children;
    const zIndex = this.props.zIndex === undefined ? 100 : this.props.zIndex;
    switch (this.props.placement) {
      case 'topRight':
        return (
          <TopRightFloat zIndex={zIndex} top={this.props.margin} right={this.props.margin}>
            <div style={{ pointerEvents: 'auto' }}>
              {toDisplay}
            </div>
          </TopRightFloat>
        );
      case 'topLeft':
        return (
          <TopLeftFloat zIndex={zIndex} top={this.props.margin} left={this.props.margin}>
            <div style={{ pointerEvents: 'auto' }}>
              {toDisplay}
            </div>
          </TopLeftFloat>
        );
      default:
        return (
          <TopFloat zIndex={zIndex} top={this.props.margin}>
            <Centered>
              <div style={{ pointerEvents: 'auto' }}>
                {toDisplay}
              </div>
            </Centered>
          </TopFloat>
        );
    }
  }
}

Float.propTypes = {
  placement: PropTypes.oneOf(['topRight', 'topLeft', 'top']).isRequired,
  zIndex: PropTypes.number.isRequired,
  margin: PropTypes.string.isRequired
};

Float.defaultProps = {
  placement: 'top',
  zIndex: 10,
  margin: '10px',
  hasError: false
};

export default withPlaceHolder(Float);
