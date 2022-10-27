import type { StoryObj, Meta } from "@storybook/react";
import React, { useState } from "react";
import TextInput, { TextInputProps } from "../../../components/forms/TextInput/TextInput";

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
} as Meta<typeof TextInput>;

const TextfieldWithHooks = (args:TextInputProps) => {
  const [value, setValue] = useState(args.value ?? '');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }
  return <TextInput {...args} onChange={handleChange} value={value} />
};

export const Sandbox: StoryObj<typeof TextInput> = {
  render: (args) => <TextfieldWithHooks {...args} />,
  args: {
    label: "Label",
  },
  parameters: {
    docs: {
      source: {
        state: "open"
      }
    }
  }
};
