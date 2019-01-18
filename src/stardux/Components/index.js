import React from 'react';
import * as SUIR from '@stardust-ui/react';
import { withStardux } from '../withStardux';

class StarduxProvider extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme && this.props.onChange) {
      this.props.onChange(undefined, { value: this.props.theme });
    }
  }

  render() {
    const { theme, ...rest } = this.props;
    return (
      <SUIR.Provider theme={SUIR.themes[theme]} {...rest}>
        {this.props.children}
      </SUIR.Provider>
    );
  }
}

const Stardux = {
  Provider: withStardux(StarduxProvider),
  Accordion: withStardux(SUIR.Accordion),
  Animation: withStardux(SUIR.Animation),
  Avatar: withStardux(SUIR.Avatar),
  Button: withStardux(SUIR.Button),
  ButtonGroup: withStardux(SUIR.ButtonGroup),
  Chat: withStardux(SUIR.Chat),
  ChatItem: withStardux(SUIR.ChatItem),
  ChatMessage: withStardux(SUIR.ChatMessage),
  Divider: withStardux(SUIR.Divider),
  Dropdown: withStardux(SUIR.Dropdown),
  DropdownItem: withStardux(SUIR.DropdownItem),
  DropdownLabel: withStardux(SUIR.DropdownLabel),
  DropdownSearchInput: withStardux(SUIR.DropdownSearchInput),
  FocusZoneMode: withStardux(SUIR.FocusZoneMode),
  Form: withStardux(SUIR.Form),
  FormField: withStardux(SUIR.FormField),
  Grid: withStardux(SUIR.Grid),
  Header: withStardux(SUIR.Header),
  HeaderDescription: withStardux(SUIR.HeaderDescription),
  Icon: withStardux(SUIR.Icon),
  Image: withStardux(SUIR.Accordion),
  Input: withStardux(SUIR.Input),
  ItemLayout: withStardux(SUIR.ItemLayout),
  Label: withStardux(SUIR.Label),
  Layout: withStardux(SUIR.Layout),
  List: withStardux(SUIR.List),
  ListItem: withStardux(SUIR.ListItem),
  Menu: withStardux(SUIR.Menu),
  MenuItem: withStardux(SUIR.MenuItem),
  Popup: withStardux(SUIR.Popup),
  PopupContent: withStardux(SUIR.PopupContent),
  Portal: withStardux(SUIR.Portal),
  ProviderConsumer: withStardux(SUIR.ProviderConsumer),
  RadioGroup: withStardux(SUIR.RadioGroup),
  RadioGroupItem: withStardux(SUIR.RadioGroupItem),
  Ref: withStardux(SUIR.Ref),
  Segment: withStardux(SUIR.Segment),
  Status: withStardux(SUIR.Status),
  Text: withStardux(SUIR.Text),
  Tree: withStardux(SUIR.Tree)
};

export default Stardux;
