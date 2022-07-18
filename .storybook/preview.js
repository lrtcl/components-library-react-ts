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
      includeNames: true,
      order: [
        'Forms',
        'Roadmap',
      ],
    },
  },
}
