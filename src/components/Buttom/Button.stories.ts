import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    size: {
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      table: {
        defaultValue: { summary: "contained" },
      },
    },

    color: {
      control: "radio",
      options: ["primary", "success", "error", null],

      table: {
        type: { summary: '"primary" | "success" | "error" | null' },
        defaultValue: { summary: "primary" },
      },
    },

    disabled: {
      control: "boolean",
      table: {
        type: { summary: "true | false | null" },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: "boolean",
      table: {
        type: { summary: "true | false | null" },
        defaultValue: { summary: false },
      },
    },

    children: {
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  args: {
    size: "medium",
    variant: "contained",
    color: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const Primary: Story = {
//   args: {
//     children: "Button",
//   },
// };

// export const Secondary: Story = {
//   args: {
//     children: "Button",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     children: "Button",
//   },
// };

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
  },
};
