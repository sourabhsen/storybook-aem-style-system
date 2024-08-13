import React, { useEffect } from "react";
import { useAddonState, useChannel } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";
import { PanelContent } from "./components/PanelContent";
import { useParameter } from "@storybook/manager-api";

interface PanelProps {
  active: boolean;
}

// Function to recursively extract cq:styleClasses values from JSON
function extractStyleClasses(obj: any) {
  let result: any = [];

  function traverse(node: any, groupLabel: any = null) {
      if (node && typeof node === 'object') {
          if (node['cq:styleClasses'] && node['cq:styleLabel']) {
              result.push({
                  groupLabel: groupLabel,
                  value: node['cq:styleLabel'],
                  key: node['cq:styleClasses']
              });
          }
          for (let key in node) {
              if (node.hasOwnProperty(key)) {
                  // If the current node contains "cq:styleGroupLabel", pass it down as the groupLabel
                  const newGroupLabel = node['cq:styleGroupLabel'] || groupLabel;
                  traverse(node[key], newGroupLabel);
              }
          }
      }
  }

  traverse(obj);
  return result;
}


export const Panel: React.FC<PanelProps> = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    cssClass: []
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

  const paramData = useParameter<any>(PARAM_KEY, "");

  useEffect(() => {
    if (paramData) {
      // console.log('paramData--22', paramData);
      const val = extractStyleClasses(paramData.policy);
      emit(EVENTS.RESULT, {
        cssClass: val
      })
    }
  }, [paramData])

  return (
    <AddonPanel {...props}>
      <PanelContent
        results={results}
        fetchData={() => {
          emit(EVENTS.REQUEST);
        }}
        clearData={() => {
          emit(EVENTS.CLEAR);
        }}
      />
    </AddonPanel>
  );
};
