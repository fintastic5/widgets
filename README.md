# @holmesdev/widgets

[![npm version](https://img.shields.io/npm/v/%40holmesdev%2Fwidgets?color=cb3837)](https://www.npmjs.com/package/@holmesdev/widgets)
[![Documentation](https://img.shields.io/badge/docs-online-blue)](https://fintastic5.github.io/widgets/)
[![License: MIT](https://img.shields.io/badge/License-MIT-b87333.svg)](LICENCE)

Reusable React dashboard widgets with a flexible panel layout.

[Documentation & examples](https://fintastic5.github.io/widgets/) · [npm package](https://www.npmjs.com/package/@holmesdev/widgets)

## Installation

```bash
npm install @holmesdev/widgets react react-dom styled-components
```

## Usage

```jsx
import "@holmesdev/widgets/style.css";
import { WidgetShell, Panel, Widget, Gauge, GoalRings } from "@holmesdev/widgets";

export function Dashboard() {
  return (
      <Panel>
        <Widget size={1}>
          <WidgetShell title="Revenue" subtitle="This week">
            <Gauge value={42} actual="$17,640" target="$42,000" />
          </WidgetShell>
        </Widget>

        <Widget size={2}>
          <WidgetShell title="Goals" subtitle="This week">
            <GoalRings
              overall={78}
              items={[
                { label: "Website", amount: "$12,579", change: 12, pct: 78 },
                { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 },
                { label: "Affiliates", amount: "$8,240", change: 6, pct: 64 },
              ]}
            />
          </WidgetShell>
        </Widget>
      </Panel>
  );
}
```

React, React DOM, and styled-components are peer dependencies. See `package.json` for supported versions. Import `@holmesdev/widgets/style.css` once in your app entry point to load the widget styles and theme tokens.

## Available widgets

- **ProgressRing** — circular progress indicator.
- **Countdown** — time remaining until a date.
- **Gauge** — semicircular percentage gauge.
- **Distribution** — donut chart with a legend.
- **GoalRings** — concentric goal-progress rings with a detail list.

## Development

Install dependencies and start Storybook:

```bash
npm install
npm run storybook
```

Build the package and Storybook preview:

```bash
npm run build
npm run build-storybook
```

## Documentation

Visit the [documentation](https://fintastic5.github.io/widgets/) for setup instructions, interactive examples, and component reference.

### Run the docs locally

The docs site uses the local widget source directly. From the repository root:

```bash
cd docs
npm install
npm run dev
```

From `docs/`, build and preview the production site with:

```bash
npm run build
npm run preview
```

## License

This project is licensed under the [MIT License](LICENCE).
