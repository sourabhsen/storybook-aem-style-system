import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import React, { useEffect } from "react";
import {EVENTS} from '../constants'

const jsonData = {
  "jcr:primaryType": "nt:unstructured",
  "policy_1714599413458": {
      "jcr:primaryType": "nt:unstructured",
      "jcr:title": "Button policy",
      "jcr:lastModifiedBy": "admin",
      "jcr:lastModified": "Wed May 01 2024 17:39:11 GMT-0400",
      "sling:resourceType": "wcm/core/components/policy/policy",
      "jcr:content": {
          "jcr:primaryType": "nt:unstructured"
      },
      "cq:styleGroups": {
          "jcr:primaryType": "nt:unstructured",
          "item0": {
              "jcr:primaryType": "nt:unstructured",
              "cq:styleGroupLabel": "Styles",
              "cq:styles": {
                  "jcr:primaryType": "nt:unstructured",
                  "item0": {
                      "jcr:primaryType": "nt:unstructured",
                      "cq:styleId": "1714599454887",
                      "cq:styleLabel": "Default"
                  },
                  "item1": {
                      "jcr:primaryType": "nt:unstructured",
                      "cq:styleClasses": "cmp-button--primary",
                      "cq:styleId": "1714599462703",
                      "cq:styleLabel": "Primary"
                  },
                  "item2": {
                      "jcr:primaryType": "nt:unstructured",
                      "cq:styleClasses": "cmp-button--secondary",
                      "cq:styleId": "1714599471688",
                      "cq:styleLabel": "Secondary"
                  }
              }
          },
          "item1": {
              "jcr:primaryType": "nt:unstructured",
              "cq:styleGroupLabel": "Variation",
              "cq:styles": {
                  "jcr:primaryType": "nt:unstructured",
                  "item0": {
                      "jcr:primaryType": "nt:unstructured",
                      "cq:styleClasses": "cmp-button--icononly",
                      "cq:styleId": "1714599522911",
                      "cq:styleLabel": "icon only"
                  }
              }
          }
      }
  }
}
// Listen for changes in addon value
window.addEventListener('message', (detail:any) => {
  const detailsObj = detail?.data || {};
  const eventType = JSON.parse(detailsObj).event?.type; // Get the new value from the event
  const val = JSON.parse(detailsObj).event;
  if(eventType === EVENTS.CHANGE) {
    console.log('sourabh--', val.args[0].selectedStyle);
  }
});


const meta: Meta<typeof Header> = {
  title: "Example/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    ['myAddonParameter']: {
      policy: jsonData
    }
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};


export const LoggedOut: Story = {};

