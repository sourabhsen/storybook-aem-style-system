import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import React, { useEffect } from "react";
import {EVENTS} from '../constants'

// Listen for changes in addon value
window.addEventListener('message', (detail:any) => {
  console.log('inside stories', detail);
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

