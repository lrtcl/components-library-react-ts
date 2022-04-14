import React, {useState} from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextInput from "./TextInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Form/Text Input",
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    id: {
      table: {
        category: "Generic props & attributes",
      },
    },
    type: {
      table: {
        category: "Generic props & attributes",
      },
    },
    inputMode: {
      table: {
        category: "Generic props & attributes",
      },
    },
    required: {
      table: {
        category: "Generic props & attributes",
      },
    },
    maxLength: {
      table: {
        category: "Generic props & attributes",
      },
    },
    invalid: {
      table: {
        category: "Generic props & attributes",
      },
    },
    value: {
      table: {
        category: "Generic props & attributes",
      },
    },
    label: {
      table: {
        category: "Label",
      },
    },
    requiredText: {
      table: {
        category: "Label",
      },
    },
    hideLabel: {
      table: {
        category: "Label",
      },
    },
    helperText: {
      table: {
        category: "Helper & error",
      },
    },
    errorMessage: {
      table: {
        category: "Helper & error",
      },
    },
    showCounter: {
      table: {
        category: "Character Counter",
      },
    },
    counterText: {
      table: {
        category: "Character Counter",
      },
    },
    counterVariant: {
      table: {
        category: "Character Counter",
      },
    },
    onChange: {
      control: false,
      table: {
        category: "Events",
      },
    },
  },
  parameters: {
    controls: {
      sort: "alpha",
    },
  },
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <TextInput
      {...args}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      value={value}
    />
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "Label",
};
