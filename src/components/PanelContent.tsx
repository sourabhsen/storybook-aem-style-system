import React, { useState } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button, Div } from "@storybook/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "../constants";
import { addons } from '@storybook/addons';
import { useParameter } from "@storybook/manager-api";
import { List } from "./List";

export const Container = styled.div`
  padding: 10px;
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 10px;
`;


type Results = {
  cssClass: any[];
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

  window.addEventListener('message', (detail: any) => {
    // console.log('inside panel',detail);
  });

  const DropdownComponent = ({ styles }: any) => {

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: any) => {
      const selectedStyle = event.target.value;
      console.log('selectedStyle', selectedStyle);
      setSelectedValue(event.target.value);
  
      // Emit an event to notify that the selected style has changed
      addons.getChannel().emit(EVENTS.CHANGE, { selectedStyle });
    };

    // Group styles by their groupLabel
    const groupedStyles = styles.reduce((acc: any, style: any) => {
      const { groupLabel, key, value } = style;
      if (!acc[groupLabel]) {
        acc[groupLabel] = [];
      }
      acc[groupLabel].push({ key, value });
      return acc;
    }, {});

    return (
      <select value={selectedValue} onChange={handleChange}>
        {Object.keys(groupedStyles).map((groupLabel) => (
          <optgroup key={groupLabel} label={groupLabel}>
            {groupedStyles[groupLabel].map((style: any) => (
              <option key={style.key} value={style.key}>
               {style.value}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  };

  return (
    <>
      <Container>
      <DropdownComponent styles={results.cssClass} />
      </Container>
    </>

  );
}
