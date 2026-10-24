import { useState } from "react";
import {
  Panel,
  Widget,
  Gauge,
  ProgressRing,
  Countdown,
  Distribution,
  GoalRings,
} from "@holmesdev/widgets";
import TabBar from "./components/TabBar";
import CodeBlock from "./components/CodeBlock";
import PropsTable from "./components/PropsTable";
import PropsEditor from "./components/PropsEditor";
import { THEMES } from "./themes";

// Configuration for each widget tab, including editor fields, defaults and prop docs
const WIDGET_CONFIG = {
  gauge: {
    name: "Gauge",
    description: `Semicircular percentage gauge. Clamps value to 0–100.

    The Gauge widget displays a percentage value as a semicircular arc, providing a simple visual representation of progress towards a goal or target. 
    
    It can display an actual value label and a sales target beneath the gauge, making it useful for dashboards that track sales, performance or other measurable targets.`,
  
    propsExplanation: `The value property sets the percentage displayed by the gauge. It accepts a number between 0 and 100, where 0 represents no progress and 100 represents completion. 
    
    The actualLabel lets you display a custom label beneath the gauge, while the target property allows you to show a sales target or goal below the percentage value. The title and subtitle properties allow you to customise the widget headings.`, 

    codeExample: `import { Gauge } from "@holmesdev/widgets";
    export default function GaugeDashboard() {
      return (
      <Gauge
        title="Revenue"
        subtitle="This week"
        value={42}
        actualLabel="Actual: $17,640"
        target="$42,000"
      />
      );
    }`,

    fields: [
      { key: "value", label: "Value", type: "number", min: 0, max: 100 },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "actualLabel", label: "Actual Label", type: "text" },
      { key: "target", label: "Target", type: "text" },
    ],
    defaults: {
      value: 42,
      title: "Gauge",
      subtitle: "This week",
      actualLabel: "Actual: $17,640",
      target: "$42,000",
    },
    render: (values) => (
      <Widget title={values.title} subtitle={values.subtitle}>
        <Gauge
          value={values.value}
          actualLabel={values.actualLabel}
          target={values.target}
        />
      </Widget>
    ),
    table: [
      { prop: "value", type: "number", default: "0", description: "Percentage value (0–100)." },
      { prop: "title", type: "string", default: "undefined", description: "Widget title shown above the arc." },
      { prop: "subtitle", type: "string", default: "undefined", description: "Widget subtitle shown below the title." },
      { prop: "actualLabel", type: "string", default: "undefined", description: "Optional 'Actual: …' footer line." },
      { prop: "target", type: "string", default: "undefined", description: "Optional 'Sales target: …' footer line." },
    ],
  },
  progressring: {
    name: "Progress Ring",
    description: `Circular progress ring using SVG stroke-dasharray.
    
    The progress ring widget displays a percentage value as a circular ring, providing a simple visual representation of completion towards a goal or target.

    The ring fills according to the supplied percentage value, from 0 to 100, making it easy to see progress at a glance. The widget can be customised with a title and a subtitle and is suitable for dashboards tracking tasks, goals or performance metrics.`,

    propsExplanation: `The value property sets the progress percentage displayed by the circular ring. It accepts a number between 0 and 100, where 0 represents no progress and 100 represents completion. 
    
    The title and subtitle properties allow you to customise the widget headings. `,

    codeExample: `import { ProgressRing } from "@holmesdev/widgets";

    export default function ProgressDashboard() {
      return (
      <ProgressRing
        title="Progress"
        subtitle="This week"
        value={78}
      />
      );
    }`,

    fields: [
      { key: "value", label: "Value", type: "number", min: 0, max: 100 },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    defaults: {
      value: 78,
      title: "Progress",
      subtitle: "This week",
    },
    render: (values) => (
      <Widget title={values.title} subtitle={values.subtitle}>
        <ProgressRing value={values.value} />
      </Widget>
    ),
    table: [
      { prop: "value", type: "number", default: "0", description: "Percentage value (0–100)." },
      { prop: "title", type: "string", default: "undefined", description: "Widget title." },
      { prop: "subtitle", type: "string", default: "undefined", description: "Widget subtitle." },
    ],
  },
  countdown: {
    name: "Countdown",
    description: `The countdown widget displays the time remaining until a specified launch date in days, hours and minutes. 

    It can be customised with a title and subtitle to suit different events, product launches or deadlines. 
    The countdown updates every minute and stops at zero once the target date is reached.`,

    propsExplanation: `The launchDate property specifies the target date used to calculate the remaining time. The title and subtitle properties allow you to customise the widget headings. 
    `,

    codeExample: `import { Countdown } from "@holmesdev/widgets";

    export default function CountdownDashboard() {
      return (
      <Countdown
        title="Countdown"
        subtitle="Product launch"
        launchDate="2026-10-28"
      />
      );
    }`,

    fields: [
      { key: "launchDate", label: "Launch Date", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    defaults: {
      launchDate: "2026-10-28",
      title: "Countdown",
      subtitle: "Product Launch",
    },
    render: (values) => (
      <Widget title={values.title} subtitle={values.subtitle}>
        <Countdown launchDate={values.launchDate} />
      </Widget>
    ),
    table: [
      { prop: "launchDate", type: "string", default: "undefined", description: "Target ISO date string." },
      { prop: "title", type: "string", default: "undefined", description: "Widget title." },
      { prop: "subtitle", type: "string", default: "undefined", description: "Widget subtitle." },
    ],
  },
  distribution: {
    name: "Distribution",
    description: `Donut chart using a conic-gradient with a two-column legend.
    
    The distribution widget displays a breakdown of percentages represented as a circular chart with distinct segments. Each segment is colour-coded and labelled, providing a clear visual representation of the distribution of values, making it easy to compare proportions at a glance.
    
    The widget can be customised with a title and subtitle and is useful for displaying category breakdowns or dashboard statistics. `,

    propsExplanation: `The segments property accepts an array of objects, each containing a label and a pct value representing the percentage for that segment. The title and subtitle properties allow you to customise the widget headings.`,

    codeExample: `import { Distribution } from "@holmesdev/widgets";

    export default function DistributionDashboard() {
      return(
      <distribution
        title="Distribution"
        subtitle="This week"
        segments={[
          { label: "HTML", pct: 26 }
          { label: "CSS", pct: 34 },
          { label: "JavaScript", pct: 40 },
        ]}
      />
      );
    }`,

    fields: [
      { key: "segments", label: "Segments (JSON)", type: "textarea" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    defaults: {
      segments: '[{"label":"HTML","pct":26},{"label":"CSS","pct":34},{"label":"JavaScript","pct":40}]',
      title: "Distribution",
      subtitle: "This week",
    },
    render: (values) => {
      // Parse the JSON string safely so invalid input does not crash the preview
      let segments = [];
      try {
        segments = JSON.parse(values.segments);
      } catch {
        // Fall back to an empty array if the JSON is malformed
      }
      return (
        <Widget title={values.title} subtitle={values.subtitle}>
          <Distribution segments={segments} />
        </Widget>
      );
    },
    table: [
      { prop: "segments", type: "array", default: "[]", description: "Array of {label, pct} objects." },
      { prop: "title", type: "string", default: "undefined", description: "Widget title." },
      { prop: "subtitle", type: "string", default: "undefined", description: "Widget subtitle." },
    ],
  },
  goalrings: {
    name: "Goal Rings",
    description: `Concentric goal-progress rings with a detail list.
    
    The Goal Rings widget displays overall progress alongside individual goals. Each goal is represented by a coloured ring and a list entry showing its label, amount and percentage change.
    
    This widget can be used in dashboards to track sales targets, business goals or other measurable results. The overall percentage appears in the center of the rings, while individual goal percentages show progress towards each target.`,

    propsExplanation: `The overall property sets the progress percentage displayed in the center of the rings. 
    
    The items property accepts an array of goal objects. Each goal contains a label to identify it, an amount to display its value, and a pct value representing its progress percentage. An optional change property indicates whether performance has increased, decreased or remained unchanged.

    The widget displays visual progress rings for up to three goals, based on their pct values. The list displays the supplied goal items, including their labels, amounts and change values.`,

    codeExample: `import { GoalRings } from "@holmesdev/widgets";

    export function GoalsDashboard() {
    return (
    <GoalRings
      title="Goal Rings"
      subtitle="This week"
      overall={78}
      items={[
        { label: "Website", amount: "$12,579", change: 12, pct: 78 },
        { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 },
        { label: "Affiliates", amount: "$12,579", change: 0, pct: 55 }
      ]}
    />
    );
    }`,

    fields: [
      { key: "overall", label: "Overall", type: "number", min: 0, max: 100 },
      { key: "items", label: "Items (JSON)", type: "textarea" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    defaults: {
      overall: 78,
      items: '[{"label":"Website","amount":"$12,579","change":12,"pct":78},{"label":"Marketplace","amount":"$4,579","change":-12,"pct":42},{"label":"Affiliates","amount":"$12,579","change":0,"pct":55}]',
      title: "Goal Rings",
      subtitle: "This week",
    },
    render: (values) => {
      // Parse the JSON string safely so invalid input does not crash the preview
      let items = [];
      try {
        items = JSON.parse(values.items);
      } catch {
        // Fall back to an empty array if the JSON is malformed
      }
      return (
        <Widget size="full" title={values.title} subtitle={values.subtitle}>
          <GoalRings overall={values.overall} items={items} />
        </Widget>
      );
    },
    table: [
      { prop: "overall", type: "number", default: "0", description: "Overall percentage shown in the center." },
      { prop: "items", type: "array", default: "[]", description: "Array of {label, amount, change, pct}." },
      { prop: "title", type: "string", default: "undefined", description: "Widget title." },
      { prop: "subtitle", type: "string", default: "undefined", description: "Widget subtitle." },
    ],
    
  },
};

// Example code shown in the Getting Started section
const CODE_EXAMPLE = `import "@holmesdev/widgets";
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
}`;

// Section navigation tabs that scroll to each part of the page
const SECTION_LINKS = [
  { href: "#mock-dashboard", label: "Introduction" },
  { href: "#components", label: "Live Demo" },
  { href: "#getting-started", label: "Installation" },
];

export default function App() {
  // Tracks which section nav tab is currently active
  const [activeSection, setActiveSection] = useState("mock-dashboard");

  // Which colour theme is active for the mock dashboard and live previews
  const [theme, setTheme] = useState("dark");

  // Which widget tab is selected in the components section
  const [activeTab, setActiveTab] = useState("progressring");

  // Stores edited prop values per widget tab so each tab keeps its own state
  const [propValues, setPropValues] = useState({});

  // Look up the current widget configuration, falling back to Progress Ring
  const config = WIDGET_CONFIG[activeTab] || WIDGET_CONFIG.progressring;

  // Use stored edits if they exist, otherwise use the default values
  const values = propValues[activeTab] || config.defaults;

  // Pull the CSS variables for the currently selected theme
  const themeVars = THEMES[theme].vars;

  // Updates a single prop value for the active widget tab
  const handlePropChange = (key, value) => {
    setPropValues((previous) => ({
      ...previous,
      [activeTab]: {
        ...(previous[activeTab] || config.defaults),
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        {/* Hero section with the page title, tagline and action buttons */}
        <header className="max-w-3xl mx-auto px-4 pt-12 pb-8 text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Widgets
          </h1>
          <p className="text-gray-500 text-sm">
            Reusable React dashboard widgets and a panel layout.
          </p>
          <div className="flex justify-center gap-3">
            {/* Copies the install command to the clipboard when clicked */}
            <button
              onClick={() =>
                navigator.clipboard?.writeText("npm install @holmesdev/widgets")
              }
              className={`
                px-5 py-2 rounded-full text-xs font-medium
                bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer
              `}
            >
              npm install @holmesdev/widgets
            </button>
            <a
              href="https://github.com/fintastic5/widgets"
              target="_blank"
              rel="noreferrer"
              className={`
                px-5 py-2 rounded-full text-xs font-medium
                bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors
              `}
            >
              View on GitHub
            </a>
          </div>
        </header>

        {/* Section navigation bar for jumping between Introduction, Live Demo and Installation */}
        <nav className="max-w-3xl mx-auto px-4 pb-6 flex justify-center gap-2">
          {SECTION_LINKS.map((link) => {
            // Strip the hash to compare against the active section id
            const sectionId = link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(sectionId)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer
                  ${
                    activeSection === sectionId
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Introduction section: overview label, mock dashboard and theme switcher */}
        <section id="mock-dashboard" className="max-w-3xl mx-auto px-4 pb-12 space-y-4 scroll-mt-8">
          {/* Purple accent label for the overview area */}
          <a
            href="#mock-dashboard"
            className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors cursor-pointer"
          >
            Overview
          </a>

          {/* Panel with all five widgets, themed via inline CSS variables */}
          <div
            className="rounded-2xl border border-gray-200 p-4"
            style={themeVars}
          >
              <Panel>
                <Widget title="Progress" subtitle="This week">
                  <ProgressRing value={78} />
                </Widget>
                <Widget title="Gauge" subtitle="This week">
                  <Gauge
                    value={42}
                    actualLabel="Actual: $17,640"
                    target="$42,000"
                  />
                </Widget>
                <Widget title="Countdown" subtitle="Product Launch">
                  <Countdown launchDate="2026-10-28" />
                </Widget>
                <Widget title="Distribution" subtitle="This week">
                  <Distribution
                    segments={[
                      { label: "HTML", pct: 26 },
                      { label: "CSS", pct: 34 },
                      { label: "JavaScript", pct: 40 },
                    ]}
                  />
                </Widget>
                <Widget size="full" title="Goal Rings" subtitle="This week">
                  <GoalRings
                    overall={78}
                    items={[
                      { label: "Website", amount: "$12,579", change: 12, pct: 78 },
                      { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 },
                      { label: "Affiliates", amount: "$12,579", change: 0, pct: 55 },
                    ]}
                  />
                </Widget>
              </Panel>
          </div>

          {/* Theme switcher pill buttons, aligned to the right below the dashboard */}
          <div className="flex justify-end gap-2">
            {Object.entries(THEMES).map(([key, themeOption]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer
                  ${
                    theme === key
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
                {themeOption.label}
              </button>
            ))}
          </div>
        </section>

        {/* Live Demo section with the interactive widget explorer */}
        <section id="components" className="max-w-3xl mx-auto px-4 pb-12 space-y-4 scroll-mt-8">
          {/* Purple accent label marking the start of this section */}
          <a
            href="#components"
            className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors cursor-pointer"
          >
            Live Demo
          </a>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">Widgets</h2>
            <p className="text-gray-500 text-sm">
              Explore each widget below. Click a tab to view the component,
              description, props and live demo.
            </p>
          </div>

          {/* Rounded panel containing the tabs, editor, preview and props table */}
          <div className="rounded-2xl border border-gray-200 p-6 space-y-6">
            {/* Tab bar for switching between widget demos */}
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Two-column layout: editor on the left, live preview on the right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column with widget name, description and editable prop fields */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900">
                  {config.name}
                </h3>
                <p className="text-gray-500 text-sm whitespace-pre-line">{config.description}</p>
                <PropsEditor
                  fields={config.fields}
                  values={values}
                  onChange={handlePropChange}
                />
              </div>

              {/* Right column showing the live widget preview with the selected theme applied */}
              <div
                className={`
                  rounded-xl border border-gray-200 bg-gray-50 p-4
                  flex items-center justify-center min-h-[260px]
                `}
                style={themeVars}
              >
                {config.render(values)}
              </div>
            </div>

            {/* Documentation table listing each prop with type, default and description */}
            <PropsTable props={config.table} />
            {config.propsExplanation && (
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mt-3">{config.propsExplanation}</p>
            )}

            {config.codeExample && (
              <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900">Code Example</h4>
              <CodeBlock code={config.codeExample} language="jsx" />
              </div>
            )}


          </div>
        </section>

        {/* Getting Started section with install command and usage example, no panel wrapper */}
        <section id="getting-started" className="max-w-3xl mx-auto px-4 pb-12 space-y-4 scroll-mt-8">
          {/* Purple accent label marking the start of this section */}
          <a
            href="#getting-started"
            className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors cursor-pointer"
          >
            Getting Started
          </a>

          <h2 className="text-lg font-semibold text-gray-900">Installation</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Get started by installing the Widgets package in your React project. You can import individual widgets or bundle them inside the resizable Panel component. The widgets are designed to be lightweight and easy to integrate into your existing dashboard or application.
          </p>

          {/* Step 1: install via package manager */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              1. Install via Package Manager
            </p>
            <p className="text-xs text-gray-400">
              Compatible with React and npm
            </p>
            <CodeBlock
              code="npm install @holmesdev/widgets"
              language="bash"
            />
          </div>

          {/* Step 2: usage example showing how to import and render widgets */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              2. Code Implementation Example
            </p>
            <p className="text-xs text-gray-400">
              Import widgets individually or bundle them inside the resizable panel
            </p>
            <CodeBlock code={CODE_EXAMPLE} />
          </div>
        </section>
      </div>

      {/* Footer spanning the full page width at the bottom */}
      <footer className="border-t border-gray-100 mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">Widgets</span>
          <div className="flex gap-6">
            <a
              href="https://www.npmjs.com/package/@holmesdev/widgets"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              npm
            </a>
            <a
              href="https://github.com/fintastic5/widgets"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
