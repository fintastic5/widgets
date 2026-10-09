import "./theme.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // "todo" shows violations in the test UI, "error" fails CI on them
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for widgets",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["dark", "light", "midnight"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute("data-theme", context.globals.theme);
      return Story();
    },
  ],
};

export default preview;
