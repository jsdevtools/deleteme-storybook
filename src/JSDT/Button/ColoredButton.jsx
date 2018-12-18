import styled from 'styled-components';

const ColoredButton = styled.div`
    color:${props => props.styling.color};
    border:1px solid #CCC;
    background:${props => props.styling.background};
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    cursor:pointer;
    vertical-align:middle;
    max-width: 100px;
    padding: ${props => props.styling.padding};
    text-align: center;
    display: table-cell;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
  :active {
    color:red;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.6);
  }
`;

export default ColoredButton;
