import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import React, { useEffect } from "react";


// Inside your HTML-based Storybook story
document.addEventListener('customPanel/classChange', (event:any) => {
  const selectedClass = event.detail.selectedClass;
  // Use the selected class in your story
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

export const yy = () => {
  return (<>test</>)
};

export const LoggedOut: Story = {};

