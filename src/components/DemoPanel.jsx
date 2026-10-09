import { Panel, Widget } from "./Panel";
import { WidgetShell } from "./WidgetShell";
import { ProgressRing } from "./widgets/ProgressRing";
import { Countdown } from "./widgets/Countdown";
import { Gauge } from "./widgets/Gauge";
import { Distribution } from "./widgets/Distribution";
import { GoalRings } from "./widgets/GoalRings";

// Two column grid, four widgets at size 1 (half width), Goal Rings
// at size 2 (full width) since it needs the room for the ring plus list.
export function DemoPanel() {
  return (
    <Panel>
      <Widget size={1}>
        <WidgetShell title="Progress" subtitle="This week">
          <ProgressRing value={78} />
        </WidgetShell>
      </Widget>

      <Widget size={1}>
        <WidgetShell title="Countdown" subtitle="Product Launch">
          <Countdown launchDate="2026-10-28" />
        </WidgetShell>
      </Widget>

      <Widget size={1}>
        <WidgetShell title="Gauge" subtitle="This week">
          <Gauge value={42} actual="$17,640" target="$42,000" />
        </WidgetShell>
      </Widget>

      <Widget size={1}>
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
              { label: "Website", amount: "$12,579", change: 12 },
              { label: "Marketplace", amount: "$4,579", change: -12 },
              { label: "Affiliates", amount: "$12,579", change: 0 },
            ]}
          />
        </WidgetShell>
      </Widget>
    </Panel>
  );
}
