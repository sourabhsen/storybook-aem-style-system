import React, { useState } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button, Div } from "@storybook/components";
import { ADDON_ID, EVENTS } from "../constants";
import { addons } from '@storybook/addons';

export const Container = styled.div`
  padding: 10px;
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 10px;
`;


type Results = {
  danger: any[];
  warning: any[];
};

interface PanelContentProps {
  results: Results;
  fetchData: () => void;
  clearData: () => void;
}

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent: React.FC<PanelContentProps> = ({
  results,
  fetchData,
  clearData,
}) => {

  const [selectedStyle, setSelectedStyle] = useState('');

  const handleChange = (event: any) => {
    const selectedStyle = event.target.value;
    console.log('selectedStyle', selectedStyle);
    setSelectedStyle(selectedStyle);

    // Emit an event to notify that the selected style has changed
    addons.getChannel().emit(EVENTS.CHANGE, { selectedStyle });

    // const classChangeEvent = new CustomEvent('customPanel/classChange', { detail: { selectedStyle } });
    // window.parent.dispatchEvent(classChangeEvent);

    // const iframe:any = document.getElementById('storybook-preview-iframe');
    // const dataToSend = { message: selectedStyle };
    // iframe.contentWindow.postMessage(dataToSend, '*'); // Specify the target origin
  };

  window.addEventListener('message', (detail:any) => {
    console.log('inside panel',detail);
  });
  

  return (
    <Container>
      <Select value={selectedStyle} onChange={handleChange}>
        <option value="">Select a style</option>
        <option value="btn-primary">Primary Button</option>
        <option value="btn-secondary">Secondary Button</option>
        <option value="btn-tertiary">Tertiary Button</option>
      </Select>
    </Container>
  );
}
