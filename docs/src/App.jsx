import { useState } from "react";
import {
  Panel,
  Widget,
  WidgetShell,
  Gauge,
  ProgressRing,
  Countdown,
  Distribution,
  GoalRings,
} from "@holmesdev/widgets";

import Hero from "./components/Hero";
import Header from "./components/Header";
import FeatureCard from "./components/FeatureCard";
import TabBar from "./components/TabBar";
import CodeBlock from "./components/CodeBlock";
import PropsTable from "./components/PropsTable";
import PropsEditor from "./components/PropsEditor";
import { THEMES } from "./themes";
import FooterComponent from "./components/Footer";
import { Button } from "flowbite-react";
import { BookOpen, Component, MonitorPlay, SquareTerminal, Palette, Save, Move, ShieldCheck } from "lucide-react";

const DEFAULT_LAUNCH_DATE = (() => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().slice(0, 10);
})();

// Configuration for each widget tab, including editor fields, defaults and prop docs
const WIDGET_CONFIG = {
  gauge: {
    name: "Gauge",
    description: `Semicircular percentage gauge. Clamps value to 0–100.

    The Gauge widget displays a percentage value as a semicircular arc, providing a simple visual representation of progress towards a goal or target.

    It can display an actual value label and a sales target beneath the gauge, making it useful for dashboards that track sales, performance or other measurable targets.`,

    propsExplanation: `The value property sets the percentage displayed by the gauge. It accepts a number between 0 and 100, where 0 represents no progress and 100 represents completion. The actual and target properties display optional values below the gauge. Use WidgetShell to add a title and subtitle.`,

    codeExample: `import { Widget, WidgetShell, Gauge } from "@holmesdev/widgets";
    export default function GaugeDashboard() {
      return (
        <Widget>
          <WidgetShell title="Revenue" subtitle="This week">
            <Gauge
              value={42}
              actual="$17,640"
              target="$42,000"
              color="#60A5FA"
            />
          </WidgetShell>
        </Widget>
      );
    }`,

    fields: [
      { key: "value", label: "Value", type: "number", min: 0, max: 100 },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "actual", label: "Actual", type: "text" },
      { key: "target", label: "Target", type: "text" },
      { key: "color", label: "Color (CSS)", type: "color" },
    ],
    defaults: {
      value: 42,
      title: "Gauge",
      subtitle: "This week",
      actual: "$17,640",
      target: "$42,000",
      color: "#60A5FA",
    },
    render: (values) => (
      <Widget>
        <WidgetShell title={values.title} subtitle={values.subtitle}>
          <Gauge
            value={values.value}
            actual={values.actual}
            target={values.target}
            color={values.color}
          />
        </WidgetShell>
      </Widget>
    ),
    table: [
      { prop: "value", type: "number", default: "undefined", description: "Percentage value, clamped to 0–100." },
      { prop: "actual", type: "string", default: "undefined", description: "Optional value displayed after 'Actual:'." },
      { prop: "actualLabel", type: "string", default: "undefined", description: "Fallback value shown after 'Actual:' when actual is not provided." },
      { prop: "target", type: "string", default: "undefined", description: "Optional value displayed after 'Sales target:'." },
      { prop: "color", type: "string", default: "theme primary", description: "CSS color for the active arc." },
    ],
  },
  progressring: {
    name: "Progress Ring",
    description: `Circular progress ring using SVG stroke-dasharray.

    The progress ring widget displays a percentage value as a circular ring, providing a simple visual representation of completion towards a goal or target.

    The ring fills according to the supplied percentage value, from 0 to 100, making it easy to see progress at a glance. The widget can be customised with a title and a subtitle and is suitable for dashboards tracking tasks, goals or performance metrics.`,

    propsExplanation: `Pass a value between 0 and 100. The ring's arc is clamped to that range, but the displayed value is not. Use WidgetShell to add a title and subtitle.`,

    codeExample: `import { Widget, WidgetShell, ProgressRing } from "@holmesdev/widgets";

    export default function ProgressDashboard() {
      return (
        <Widget>
          <WidgetShell title="Progress" subtitle="This week">
            <ProgressRing
              value={78}
              color="#60A5FA"
            />
          </WidgetShell>
        </Widget>
      );
    }`,

    fields: [
      { key: "value", label: "Value", type: "number", min: 0, max: 100 },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "color", label: "Color (CSS)", type: "color" },
    ],
    defaults: {
      value: 78,
      title: "Progress",
      subtitle: "This week",
      color: "#60A5FA"
    },
    render: (values) => (
      <Widget>
        <WidgetShell title={values.title} subtitle={values.subtitle}>
          <ProgressRing
            value={values.value}
            color={values.color} />
        </WidgetShell>
      </Widget>
    ),
    table: [
      { prop: "value", type: "number", default: "0", description: "Percentage value from 0 to 100." },
      { prop: "color", type: "string", default: "theme primary", description: "CSS color for the progress ring." },
    ],
  },
  countdown: {
    name: "Countdown",
    description: `The countdown widget displays the time remaining until a specified launch date in days, hours and minutes.

    It can be customised with a title and subtitle to suit different events, product launches or deadlines.
    It starts automatically, updates every minute, and stops at zero.`,

    propsExplanation: `The launchDate property specifies the target date used to calculate the remaining time. Use WidgetShell for the title and subtitle. The countdown starts on mount and updates automatically. Changing launchDate starts a new countdown.

    The optional onComplete callback is called once when the target is reached, including if the date has already passed on mount. The optional onNotify callback shows a Notify Me button and is called when it is clicked. Neither callback sends notifications by itself. The preview button displays a demo message. It does not subscribe you to notifications.
    `,

    codeExample: `import { Widget, WidgetShell, Countdown } from "@holmesdev/widgets";

    export default function CountdownDashboard() {
      return (
        <Widget>
          <WidgetShell title="Countdown" subtitle="Product launch">
            <Countdown
              launchDate="${DEFAULT_LAUNCH_DATE}"
              onComplete={() => console.log("Launch time reached!")}
              onNotify={() => console.log("Set up a notification")}
            />
          </WidgetShell>
        </Widget>
      );
    }`,

    fields: [
      { key: "launchDate", label: "Launch Date", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    defaults: {
      launchDate: DEFAULT_LAUNCH_DATE,
      title: "Countdown",
      subtitle: "Product Launch",
    },
    render: (values) => (
      <Widget>
        <WidgetShell title={values.title} subtitle={values.subtitle}>
          <Countdown
            launchDate={values.launchDate}
            onNotify={() => window.alert("Demo only: no notification has been scheduled.")}
          />
        </WidgetShell>
      </Widget>
    ),
    table: [
      { prop: "launchDate", type: "string", default: "undefined", description: "Target date string parseable by JavaScript's Date constructor." },
      { prop: "onComplete", type: "function", default: "undefined", description: "Called without arguments once when the target date is reached." },
      { prop: "onNotify", type: "function", default: "undefined", description: "Shows a Notify Me button and is called when clicked." },
    ],
  },
  distribution: {
    name: "Distribution",
    description: `Donut chart using a conic-gradient with a two-column legend.

    The distribution widget displays a breakdown of percentages represented as a circular chart with distinct segments. Each segment is colour-coded and labelled, providing a clear visual representation of the distribution of values, making it easy to compare proportions at a glance.

    Use WidgetShell to add a title and subtitle. The widget is useful for displaying category breakdowns or dashboard statistics. `,

    propsExplanation: `The segments property accepts an array of objects, each containing a unique label and numeric pct value. Values are used directly, not normalized, so use percentages totaling 100 for a complete chart. An optional color overrides the theme palette for that segment. Use WidgetShell for the title and subtitle.`,

    codeExample: `import { Widget, WidgetShell, Distribution } from "@holmesdev/widgets";

    export default function DistributionDashboard() {
      return(
        <Widget>
          <WidgetShell title="Distribution" subtitle="This week">
            <Distribution
              segments={[
                { label: "HTML", pct: 26, color: "#3B82F6" },
                { label: "CSS", pct: 34, color: "#A855F7" },
                { label: "JavaScript", pct: 40, color: "#22D3EE" },
              ]}
            />
          </WidgetShell>
        </Widget>
      );
    }`,

    fields: [
      { key: "segments", label: "Segments (JSON)", type: "textarea", colorCount: 4 },
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
    ],
    defaults: {
      segments: '[{"label":"HTML","pct":26, "color":"#3B82F6"},{"label":"CSS","pct":34, "color":"#A855F7"},{"label":"JavaScript","pct":40, "color":"#22D3EE"}]',
      title: "Distribution",
      subtitle: "This week",
    },
    render: (values) => {
      // Parse the JSON string safely so invalid input does not crash the preview
      let segments = [];
      try {
        const parsed = JSON.parse(values.segments);
        if (Array.isArray(parsed)) segments = parsed.filter((segment) => segment && typeof segment === "object");
      } catch {
        // Fall back to an empty array if the JSON is malformed
      }
      return (
        <Widget>
          <WidgetShell title={values.title} subtitle={values.subtitle}>
            <Distribution segments={segments} />
          </WidgetShell>
        </Widget>
      );
    },
    table: [
      { prop: "segments", type: "array", default: "[]", description: "Array of { label, pct, color? }. The CSS color overrides the theme palette." },
    ],
  },
  goalrings: {
    name: "Goal Rings",
    description: `Concentric goal-progress rings with a detail list.

    The Goal Rings widget displays overall progress alongside individual goals. Each goal is represented by a coloured ring and a list entry showing its label, amount and percentage change.

    This widget can be used in dashboards to track sales targets, business goals or other measurable results. The overall percentage appears in the center of the rings, while individual goal percentages show progress towards each target.`,

    propsExplanation: `The overall property sets the progress percentage displayed in the center of the rings.

    The items property accepts an array of goal objects. Each goal contains a unique label, amount and numeric pct. An optional numeric change indicates whether performance has increased, decreased or remained unchanged. An optional color overrides the theme palette for the ring and list marker.

    The widget displays visual progress rings for up to three goals, based on their pct values. The list displays the supplied goal items, including their labels, amounts and change values.`,

    codeExample: `import { Widget, WidgetShell, GoalRings } from "@holmesdev/widgets";

    export function GoalsDashboard() {
      return (
        <Widget size={2}>
          <WidgetShell title="Goal Rings" subtitle="This week">
            <GoalRings
              overall={78}
              items={[
                { label: "Website", amount: "$12,579", change: 12, pct: 78 },
                { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 },
                { label: "Affiliates", amount: "$12,579", change: 0, pct: 55 }
              ]}
            />
          </WidgetShell>
        </Widget>
      );
    }`,

    fields: [
      { key: "overall", label: "Overall", type: "number", min: 0, max: 100 },
      { key: "items", label: "Items (JSON)", type: "textarea", colorCount: 3 },
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
        const parsed = JSON.parse(values.items);
        if (Array.isArray(parsed)) items = parsed.filter((item) => item && typeof item === "object");
      } catch {
        // Fall back to an empty array if the JSON is malformed
      }
      return (
        <Widget size={2}>
          <WidgetShell title={values.title} subtitle={values.subtitle}>
            <GoalRings overall={values.overall} items={items} />
          </WidgetShell>
        </Widget>
      );
    },
    table: [
      { prop: "overall", type: "number", default: "0", description: "Overall percentage shown in the center." },
      { prop: "items", type: "array", default: "[]", description: "Array of { label, amount, pct, change?, color? }. The color overrides the theme palette." },
    ],

  },
};

// Example code shown in the Getting Started section
const CODE_EXAMPLE = `import "@holmesdev/widgets/style.css";
import { Panel, Widget, WidgetShell, Gauge, GoalRings } from "@holmesdev/widgets";

export function Dashboard() {
  return (
    <Panel>
      <Widget>
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
            ]}
          />
        </WidgetShell>
      </Widget>
    </Panel>
  );
}`;

function Components({ theme }) {
  // Which widget tab is selected in the components section
  const [activeTab, setActiveTab] = useState("progressring");

  // Stores edited prop values per widget tab so each tab keeps its own state
  const [propValues, setPropValues] = useState({});

  // Look up the current widget configuration, falling back to Progress Ring
  const config = WIDGET_CONFIG[activeTab] || WIDGET_CONFIG.progressring;

  // Use stored edits if they exist, otherwise use the default values
  const values = propValues[activeTab] || config.defaults;

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
    <>
        {/* Live Demo section with the interactive widget explorer */}
        <section id="components">
          <div className="sectionHeader">
            <h2 className="sectionTitle flex items-center text-xl font-semibold text-gray-900">
              <Component size={26} strokeWidth={2.5}className="text-blue-600" />
              <span>Components</span>
            </h2>
            <p className="sectionSubtitle">
              Explore each widget below. Click a tab to view the component,
              description, props and live demo.
            </p>
          </div>


          {/* widgets tabs, prop editor, live preview and props table */}
          <div
            className="w-full min-w-0 overflow-auto rounded-xl  bg-gray-100 p-7"
          >
            {/* TAB BAR for switching between widget demos */}
            <TabBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Accessible content panel for the selected widget */}
            <div
              id={`panel-${activeTab}`}
              className="space-y-5 p-5 sm:p-6 bg-white bg componentContainer"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              tabIndex={0}
            >
            <h3>
              {config.name}
            </h3>

            <p>
              {config.description}
            </p>

            {/* Editor and live preview */}
            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h4 className="text-sm font-semibold text-gray-900 pb-1">
                  Editor
                </h4>
              <div className="space-y-3">
                <PropsEditor
                  fields={config.fields}
                  values={values}
                  onChange={handlePropChange}
                  theme={theme}
                />
              </div>
            </div>

              <div
                className={`
                  flex min-h-[282px] h-full items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-5
                `}
                data-theme={theme}
              >
                <div
                  className="w-[250px] max-w-full shrink-0"
                  style={{
                    containerType: "inline-size",
                    containerName: "panel-content",
                    height: activeTab === "goalrings" ? "auto" : 250,
                  }}
                >
                  {config.render(values)}
                </div>
              </div>
            </div>

            {/* Props documentation */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900">
                Props
              </h4>
              <p className="text-sm text-gray-600">Title and subtitle in the editor are passed to WidgetShell, not to the widget.</p>
              <PropsTable props={config.table} />
            </div>

            {config.propsExplanation && (
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mt-3">
                {config.propsExplanation}
              </p>
            )}

            {config.codeExample && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  Usage
                </h4>
                <CodeBlock code={config.codeExample} language="jsx" />
              </div>
            )}
            </div>
          </div>
        </section>

    </>
  );
}

export default function App() {

  // Which colour theme is active for the mock dashboard and live previews
  const [theme, setTheme] = useState("dark");



  return (
    <>
      <Header />
      <main className="w-full max-w-5xl mx-auto">
        <Hero />
        {/* Introduction section: overview label, mock dashboard and theme switcher */}
        <section id="overview">
          <div className="sectionHeader">
            <h2 className="sectionTitle flex items-center text-xl font-semibold text-gray-900">
              <BookOpen size={26} strokeWidth={2.5}className="text-blue-600" />
              <span>Overview</span>
            </h2>
            <p className="sectionSubtitle">
            A customisable React widget library with five ready-to-use dashboard widgets and a flexible, responsive panel layout. Use widgets individually or mix and match to create a dashboard that works for you. Reorder widgets and resize the panel, with its layout automatically saved.
          </p>
          </div>
          {/* Key Feature Highlights */}
            <div className="featureGrid">
              <FeatureCard
                icon={<Move size={20} />}
                title="Responsive Panel"
                description="Responsive panel layout, designed for desktop and larger screens."
              />
              <FeatureCard
                icon={<Save size={20} />}
                title="Auto-Save State"
                description="Panel dimensions and widget ordering are automatically saved to localStorage."
              />
              <FeatureCard
                icon={<ShieldCheck size={20} />}
                title="WCAG 2.2 Level AA"
                description="Default colours meet WCAG 2.2 Level AA requirements across Light, Dark, and Midnight themes."
              />
              <FeatureCard
                icon={<Palette size={20} />}
                title="Customisable"
                description="Customise widget, chart, and graph colours to suit your preferences. "
              />
            </div>
        </section>

        <section id="live-demo">
          <div className="sectionHeader">
            <h2 className="sectionTitle flex items-center text-xl font-semibold text-gray-900">
              <MonitorPlay size={26} strokeWidth={2.5}className="text-blue-600" />
              <span>Live Demo</span>
            </h2>
            <p className="sectionSubtitle w-full">
              Interact with the panel to explore its features and capabilities. Resize it by dragging the borders and reorder widgets by dragging the cards.
            </p>
          </div>
          {/* Panel with all five widgets, themed via inline CSS variables */}
          <div
            className="liveDemoStage"
            data-theme={theme}
          >
            <div className="liveDemoPanel">
            <Panel>
              <Widget>
                <WidgetShell title="Progress" subtitle="This week">
                  <ProgressRing value={78} />
                </WidgetShell>
              </Widget>
              <Widget>
                <WidgetShell title="Gauge" subtitle="This week">
                  <Gauge
                    value={42}
                    actual="$17,640"
                    target="$42,000"
                  />
                </WidgetShell>
              </Widget>
              <Widget>
                <WidgetShell title="Countdown" subtitle="Product Launch">
                  <Countdown
                    launchDate={DEFAULT_LAUNCH_DATE}
                    onNotify={() => window.alert("Demo only: no notification has been scheduled.")}
                  />
                </WidgetShell>
              </Widget>
              <Widget>
                <WidgetShell title="Distribution" subtitle="This week">
                  <Distribution
                    segments={[
                      { label: "HTML", pct: 26 },
                      { label: "CSS", pct: 34 },
                      { label: "JavaScript", pct: 40 },
                    ]}
                  />
                </WidgetShell>
              </Widget>
              <Widget size={2}>
                <WidgetShell title="Goal Rings" subtitle="This week">
                  <GoalRings
                    overall={78}
                    items={[
                      { label: "Website", amount: "$12,579", change: 12, pct: 78 },
                      { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 },
                      { label: "Affiliates", amount: "$12,579", change: 0, pct: 55 },
                    ]}
                  />
                </WidgetShell>
              </Widget>
            </Panel>
            </div>
          </div>

          {/* Theme switcher */}
          <div
            className="themeContainer"
            aria-label="theme selector"
          >
            <div className="themeSelector">
               {Object.entries(THEMES).map(([key, themeOption]) => {
              const ThemeIcon = themeOption.icon;

                return (
                  <Button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`themeButton ${theme === key ? "active" : ""}`}
                    aria-pressed={theme === key}
                  >
                    <ThemeIcon size={14} aria-hidden="true" />
                    {themeOption.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        <Components theme={theme} />

        <section id="panel">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Panel System</h2>
            <p className="sectionSubtitle">
              Panel brings widgets together in a resizable, scrollable dashboard. Wrap each
              component in a Widget card and place the cards directly inside Panel. Use
              WidgetShell when you want a title and subtitle.
            </p>
          </div>
          <div className="space-y-4 text-gray-700">
            <h3>Building your dashboard</h3>
            <p>
              Add the widgets you need as direct children of Panel. Use <code>size</code> to
              make a card wider and <code>rows</code> to make it taller. Both default to 1.
              The layout adjusts to the available space, and wider cards stack into one
              column on a narrow panel. If the content does not fit, users can scroll to
              see the rest.
            </p>
            <CodeBlock code={`import { Panel, Widget, WidgetShell, Gauge, ProgressRing } from "@holmesdev/widgets";

export function Dashboard() {
  return (
    <Panel>
      <Widget key="revenue">
        <WidgetShell title="Revenue">
          <Gauge value={42} />
        </WidgetShell>
      </Widget>
      <Widget key="progress" size={2} rows={2}>
        <WidgetShell title="Progress">
          <ProgressRing value={78} />
        </WidgetShell>
      </Widget>
    </Panel>
  );
}`} language="jsx" />
            <p>
              Panel accepts <code>children</code>. Each direct child's <code>size</code> and
              <code> rows</code> props set its column and row spans inside the panel.
              Widget provides the card styling, while WidgetShell adds an optional title
              and subtitle. Import <code>@holmesdev/widgets/style.css</code> once in your app
              to load the styles.
            </p>
            <h3>Features</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Reorder widgets:</strong> Drag cards to arrange the dashboard to suit your needs.</li>
              <li><strong>Resize the panel:</strong> Drag an edge or corner. The panel snaps to fit complete cards when released.</li>
              <li><strong>Keyboard resizing:</strong> Focus a resize handle and use the arrow keys. Hold Shift for larger adjustments.</li>
              <li><strong>Saved layout:</strong> Panel size and widget order are saved in the browser and restored when the page reloads. Give direct children stable, unique React keys to preserve their order when the widget list changes.</li>
            </ul>
            <p>
              Panel instances on the same site share saved layout settings. Add or remove
              widgets through your React code. The panel does not add external widgets by
              drag and drop.
            </p>
          </div>
        </section>

        <section id="get-started">
          <div className="sectionHeader">
            <h2 className="sectionTitle flex items-center text-xl font-semibold text-gray-900">
              <SquareTerminal size={26} strokeWidth={2.5}className="text-blue-600" />
              <span>Get Started</span>
            </h2>
            <p className="sectionSubtitle">
              Get started by installing the Widgets package in your React app. You can import individual widgets or bundle them inside the resizable Panel component. The widgets are designed to be lightweight and easy to integrate into your existing dashboard or application.
            </p>
          </div>

          <div className="space-y-2">
            <h3>Installation</h3>
            <p>
              Server-side rendering (SSR) is not yet supported. Use this package in client-rendered React apps.
            </p>
            <p>
              Make sure you have {" "}
              <a
                href="https://nodejs.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Node.js
              </a>
              {" "}and a React app. Install the package and its peer dependencies{" "}
              <a
                href="https://www.npmjs.com/package/styled-components"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                styled-components
              </a>{" "}
              (React and React DOM are also peer dependencies).
            </p>
            <CodeBlock
              code="npm install @holmesdev/widgets react react-dom styled-components"
              language="npm"
            />
          </div>

          {/* Step 2: usage example showing how to import and render widgets */}
          <div className="space-y-2">
            <h3>Usage</h3>
            <p>Import the stylesheet once in your app, then use widgets individually or inside the resizable panel. Panel reads size and rows from its direct children. A widget with size={'{2}'} spans two columns when space permits.</p>
            <CodeBlock code={CODE_EXAMPLE} />
          </div>

          <div id="theming" className="space-y-2">
            <h3>Theming</h3>
            <p>
              Light is the default theme. Choose from <code>light</code>, <code>dark</code>, and <code>midnight</code> by
              setting <code>data-theme</code> on a wrapper around your widgets or Panel.
              All widgets inside the wrapper inherit its theme. Import
              {" "}<code>@holmesdev/widgets/style.css</code> once in your app to load the
              styles and theme colours.
            </p>
            <CodeBlock code={`<div data-theme="dark">
  <Widget>
    <WidgetShell title="Progress">
      <ProgressRing value={78} />
    </WidgetShell>
  </Widget>
</div>`} language="jsx" />
            <p>
              To switch themes dynamically, keep the theme name in React state and
              update it from a selector. The buttons below the Live Demo also change
              the theme of the component previews on this page.
            </p>
            <CodeBlock code={`import { useState } from "react";
import { Widget, WidgetShell, ProgressRing } from "@holmesdev/widgets";
import "@holmesdev/widgets/style.css";

export function ThemedWidget() {
  const [theme, setTheme] = useState("dark");

  return (
    <>
      <label>
        Theme
        <select value={theme} onChange={(event) => setTheme(event.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="midnight">Midnight</option>
        </select>
      </label>
      <div data-theme={theme}>
        <Widget>
          <WidgetShell title="Progress">
            <ProgressRing value={78} />
          </WidgetShell>
        </Widget>
      </div>
    </>
  );
}`} language="jsx" />
          </div>
        </section>
      </main>
      <FooterComponent />
    </>
  );
}
