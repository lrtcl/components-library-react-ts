export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
    hideNoControlsWarning: true,
  },
  options: {
    storySort: {
      method: 'configure',
      includeName: true,
      order: ['Roadmap', 'Text input', ['Overview', 'Docs', 'Styles', 'Sandbox']]
    },
  },
}
