// import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import { TextInput } from '../../../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Forms/Text input",
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    id: {
      table: {
        category: "Generic props & attributes",
      },
    },
    name: {
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
    maxLength: {
      table: {
        category: "Generic props & attributes",
      },
    },
    value: {
      table: {
        category: "Generic props & attributes",
      },
      control: false,
    },
    autoComplete: {
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
    required: {
      table: {
        category: "States",
      },
    },
    invalid: {
      table: {
        category: "States",
      },
    },
    onChange: {
      table: {
        category: "Events",
      },
      control: false,
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
  // const [{ value }, updateArgs] = useArgs();
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updateArgs({ value: event.target.value });
  // }
  const [value, setValue] = useState(args.value ?? "");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <TextInput
      {...args}
      onChange={handleChange}
      value={value}
    />
  );
};

export const Sandbox = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sandbox.args = {
  label: "Label",
};
Sandbox.parameters = {
  docs: {
    source: {
      state: "open"
    }
  }
};
