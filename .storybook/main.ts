import type { StorybookConfig } from '@storybook/core-common';
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-a11y"],
  typescript: {
    check: false
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        lazyCompilation: true,
        fsCache: true
      }
    }
  },
  features: {
    postcss: false,
  }
};
module.exports = config;
