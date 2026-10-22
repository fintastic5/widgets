# @holmesdev/widgets

Reusable React dashboard widgets and a panel layout.

## Usage

```bash
npm install @holmesdev/widgets
```

```jsx
import "@holmesdev/widgets/style.css";
import { Panel, Widget, Gauge, GoalRings } from "@holmesdev/widgets";

export function Dashboard() {
  return (
    <Panel>
      <Widget title="Revenue" subtitle="This week">
        <Gauge value={42} actualLabel="$17,640" target="$42,000" />
      </Widget>

      <Widget size="full" title="Goals" subtitle="This week">
        <GoalRings
          overall={78}
          items={[
            { label: "Website", amount: "$12,579", change: 12, pct: 78 },
            { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 },
          ]}
        />
      </Widget>
    </Panel>
  );
}
```

Import `@holmesdev/widgets/style.css` once in your app entry point to load the widget styles and theme tokens.

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

To use the local widgets package in the docs site, build it from the repository root first:

```bash
npm run build
```

**Rebuild it after changing widget source.** Then run the documentation site:

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
